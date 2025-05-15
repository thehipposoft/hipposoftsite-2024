'use client'
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const size = 45;
    const circle = useRef(null);
    const mouse = useRef({
        x: 0,
        y: 0,
    })
    const delayedMouse = useRef({
        x: 0,
        y: 0,
    })

    const manageMouseMove = (e:any) => {
        const { clientX, clientY } = e;
    
        mouse.current = {
            x: clientX,
            y: clientY
        }
    }

    const lerp = (x:number, y:number, a:any) => x * (1 - a) + y * a;

    const moveCircle = (x:number, y:number) => {
        gsap.set(circle.current, {x, y, xPercent: -50, yPercent: -50})
    }

    const animate = () => {
        const { x, y } = delayedMouse.current;
    
        delayedMouse.current = {
            x: lerp(x, mouse.current.x, 0.060),
            y: lerp(y, mouse.current.y, 0.060)
        }
    
        moveCircle(delayedMouse.current.x, delayedMouse.current.y);
        window.requestAnimationFrame(animate);
    }
    
    useEffect(() => {
        animate();
        window.addEventListener("mousemove", manageMouseMove)
        return () => window.removeEventListener("mousemove", manageMouseMove)
    }, [])

    return(
        <div 
            ref={circle}
            className="fixed top-0 left-0 border-purple-400 border-2 rounded-full mix-blend-difference pointer-events-none"
            style={{
                width: size,
                height: size,
            }}
        >

        </div>
    )
}