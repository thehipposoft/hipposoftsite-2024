'use client'
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const size = 75;
    const circle = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const delayedMouse = useRef({ x: 0, y: 0 });
    const rafId = useRef<number | null>(null);          // ← para cancelar el RAF
    const [isEnabled, setIsEnabled] = useState(false);

    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

    const moveCircle = (x: number, y: number) => {
        if (!circle.current) return;                    // ← guard
        gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
    };

    const animate = () => {
        const { x, y } = delayedMouse.current;
        delayedMouse.current = {
            x: lerp(x, mouse.current.x, 0.065),
            y: lerp(y, mouse.current.y, 0.065),
        };
        moveCircle(delayedMouse.current.x, delayedMouse.current.y);
        rafId.current = window.requestAnimationFrame(animate);
    };

    const scaleUp = () => {
        if (!circle.current) return;
        gsap.to(circle.current, { scale: 1.6, duration: 0.8, ease: "power3.out" });
    };

    const scaleDown = () => {
        if (!circle.current) return;
        gsap.to(circle.current, { scale: 1, duration: 0.8, ease: "power3.out" });
    };

    const bindHoverEvents = () => {
        const targets = document.querySelectorAll("a, button, [data-cursor='hover']");
        targets.forEach((el) => {
            el.removeEventListener("mouseenter", scaleUp);
            el.removeEventListener("mouseleave", scaleDown);
            el.addEventListener("mouseenter", scaleUp);
            el.addEventListener("mouseleave", scaleDown);
        });
    };

    useEffect(() => {
        const handleResize = () => setIsEnabled(window.innerWidth >= 1200);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isEnabled) return;
        if (!circle.current) return;                    // ← guard: esperar al DOM

        const manageMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        animate();
        window.addEventListener("mousemove", manageMouseMove);
        bindHoverEvents();

        const observer = new MutationObserver(bindHoverEvents);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            if (rafId.current) cancelAnimationFrame(rafId.current); // ← cancelar RAF
            observer.disconnect();
        };
    }, [isEnabled]);                                    // circle.current no es dep reactiva

    if (!isEnabled) return null;

    return (
        <div
            ref={circle}
            style={{ width: size, height: size }}
            className="fixed top-0 left-0 border-purple-400 border rounded-full mix-blend-difference pointer-events-none custom-cursor z-50"
        />
    );
}
