'use client';

import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

function SimpleIFCViewer({ifcUrl}: {ifcUrl: string}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initBasicViewer = async () => {
            try {
                if (!containerRef.current) return;

                // Create basic Three.js scene
                const scene = new THREE.Scene();
                scene.background = new THREE.Color(0xf6f7f9);

                // Create camera
                const camera = new THREE.PerspectiveCamera(
                    75,
                    containerRef.current.clientWidth / containerRef.current.clientHeight,
                    0.1,
                    1000
                );
                camera.position.set(10, 10, 10);

                // Create renderer
                const renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.setSize(
                    containerRef.current.clientWidth,
                    containerRef.current.clientHeight
                );
                containerRef.current.appendChild(renderer.domElement);

                // Add basic lighting
                const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
                scene.add(ambientLight);

                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                directionalLight.position.set(10, 10, 5);
                scene.add(directionalLight);

                // Add a placeholder cube while we work on IFC loading
                const geometry = new THREE.BoxGeometry();
                const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                const cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                // Basic controls (you can add OrbitControls later)
                const controls = {
                    mouseX: 0,
                    mouseY: 0,
                    isMouseDown: false
                };

                const onMouseMove = (event: MouseEvent) => {
                    if (controls.isMouseDown) {
                        const deltaX = event.clientX - controls.mouseX;
                        const deltaY = event.clientY - controls.mouseY;

                        camera.position.x += deltaX * 0.01;
                        camera.position.y -= deltaY * 0.01;
                        camera.lookAt(0, 0, 0);
                    }
                    controls.mouseX = event.clientX;
                    controls.mouseY = event.clientY;
                };

                const onMouseDown = () => {
                    controls.isMouseDown = true;
                };

                const onMouseUp = () => {
                    controls.isMouseDown = false;
                };

                containerRef.current.addEventListener('mousemove', onMouseMove);
                containerRef.current.addEventListener('mousedown', onMouseDown);
                containerRef.current.addEventListener('mouseup', onMouseUp);

                // Animation loop
                const animate = () => {
                    requestAnimationFrame(animate);

                    // Rotate the cube
                    cube.rotation.x += 0.01;
                    cube.rotation.y += 0.01;

                    renderer.render(scene, camera);
                };
                animate();

                // Handle window resize
                const handleResize = () => {
                    if (!containerRef.current) return;

                    camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(
                        containerRef.current.clientWidth,
                        containerRef.current.clientHeight
                    );
                };

                window.addEventListener('resize', handleResize);

                setLoading(false);

                // Cleanup function
                return () => {
                    window.removeEventListener('resize', handleResize);
                    if (containerRef.current) {
                        containerRef.current.removeEventListener('mousemove', onMouseMove);
                        containerRef.current.removeEventListener('mousedown', onMouseDown);
                        containerRef.current.removeEventListener('mouseup', onMouseUp);
                        containerRef.current.removeChild(renderer.domElement);
                    }
                    renderer.dispose();
                };

            } catch (err) {
                console.error("Simple viewer initialization error:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
                setLoading(false);
            }
        };

        const cleanup = initBasicViewer();

        return () => {
            cleanup.then(cleanupFn => {
                if (cleanupFn) cleanupFn();
            });
        };
    }, [ifcUrl]);

    if (loading) {
        return (
            <div style={{ width: "100%", height: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div>Loading 3D Viewer...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ width: "100%", height: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div>Error: {error}</div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: "600px" }}
        />
    );
}

export default SimpleIFCViewer;
