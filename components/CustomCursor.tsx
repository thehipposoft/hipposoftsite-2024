'use client'
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const size = 75;
    const circle = useRef(null);
    const mouse = useRef({
        x: 0,
        y: 0,
    })
    const delayedMouse = useRef({
        x: 0,
        y: 0,
    })
    const [isEnabled, setIsEnabled] = useState(false);

    const manageMouseMove = (e:MouseEvent) => {
        const { clientX, clientY } = e;
    
        mouse.current = {
            x: clientX,
            y: clientY
        }
    }

    const lerp = (x:number, y:number, a:number) => x * (1 - a) + y * a;

    const moveCircle = (x:number, y:number) => {
        gsap.set(circle.current, {x, y, xPercent: -50, yPercent: -50})
    }

    const animate = () => {
        const { x, y } = delayedMouse.current;
    
        delayedMouse.current = {
            x: lerp(x, mouse.current.x, 0.065),
            y: lerp(y, mouse.current.y, 0.065)
        }
    
        moveCircle(delayedMouse.current.x, delayedMouse.current.y);
        window.requestAnimationFrame(animate);
    }

    const scaleUp = () => {
        gsap.to(circle.current, { scale: 1.6, duration: .8, ease: "power3.out" });
    };

    const scaleDown = () => {
        gsap.to(circle.current, { scale: 1, duration: .8, ease: "power3.out" });
    };

    // Util para hacer attach/detach de los eventos hover
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
        const handleResize = () => {
            setIsEnabled(window.innerWidth >= 1200);
        };

        handleResize(); // Set initial value
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    useEffect(() => {
        if (!isEnabled) return;

        animate();
        window.addEventListener("mousemove", manageMouseMove);
        bindHoverEvents();

        const observer = new MutationObserver(() => {
            bindHoverEvents();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        const targets = document.querySelectorAll("a, button, [data-cursor='hover']");

        targets.forEach((el) => {
            el.addEventListener("mouseenter", scaleUp);
            el.addEventListener("mouseleave", scaleDown);
        });

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            gsap.set(circle.current, { scale: 1 });
            observer.disconnect();
        };
    }, [isEnabled]);

    if (!isEnabled) return null;

    return(
        <div 
            style={{
                width: size,
                height: size,
            }}
            ref={circle}
            className="fixed top-0 left-0 border-purple-400 border rounded-full mix-blend-difference pointer-events-none custom-cursor z-50"
        >
        </div>
    )
}