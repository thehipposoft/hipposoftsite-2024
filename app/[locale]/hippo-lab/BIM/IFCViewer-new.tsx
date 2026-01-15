'use client';

import React, { useEffect, useRef } from "react";
import * as OBC from "@thatopen/components";
import * as THREE from 'three';

function IFCViewer({ifcUrl}: {ifcUrl: string}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const initModelLoading = async () => {
            const components = new OBC.Components();
            const worlds = components.get(OBC.Worlds);

            const world = worlds.create<
                OBC.SimpleScene,
                OBC.SimpleCamera,
                OBC.SimpleRenderer
            >();

            world.scene = new OBC.SimpleScene(components);
            world.renderer = new OBC.SimpleRenderer(components, containerRef.current!);
            world.camera = new OBC.SimpleCamera(components);

            // Attempting to set up the camera and scene
            components.init();
            world.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);

            world.camera.controls.minPolarAngle = 0;               // don’t allow looking from below horizon
            world.camera.controls.maxPolarAngle = Math.PI / 2;
            world.scene.setup();
            world.scene.three.background = new THREE.Color(0xf6f7f9);
            //const grids = components.get(OBC.Grids);
            //grids.create(world);

            const fragments = components.get(OBC.FragmentsManager);
            const fragmentIfcLoader = await components.get(OBC.IfcLoader);
            await fragmentIfcLoader.setup({
                autoSetWasm: false,
                wasm: {
                    path: "/wasm/",
                    absolute: true,
                },
            });

            const workerUrl = '/worker.mjs';
            fragments.init(workerUrl);

            world.camera.controls.addEventListener("rest", () => {

                fragments.core.update();
                //const pos = world.camera.controls.getPosition();
                //const tgt = world.camera.controls.getTarget();

                //console.log("Camera Position:", pos.x, pos.y, pos.z);
                //console.log("Camera Target:", tgt.x, tgt.y, tgt.z);
            }
            );

            fragments.list.onItemSet.add(({ value: model }) => {
                model.useCamera(world.camera.three);
                world.scene.three.add(model.object);
                fragments.core.update(true);

                // 👇 Custom camera positioning after model loads
                setTimeout(() => {
                    // Position camera like in your example
                    world.camera.three.position.set(0, 10, 40);

                    // Ensure it looks at the model center
                    world.camera.three.lookAt(new THREE.Vector3(0, 0, 50));

                    // Sync with OrbitControls
                    world.camera.controls.setLookAt(
                        -14.932953878543646 , 3.9172822989963167, 39.98790554193692,   // camera position
                        -5.6126231611163115, 3.7992060582434033, 1.5608709226067827,     // target
                        true         // smooth transition
                    );
                }, 100);
            });

            const file = await fetch(ifcUrl);
            const data = await file.arrayBuffer();
            const buffer = new Uint8Array(data);

            await fragmentIfcLoader.load(buffer, true, 'example', {
                processData: {
                    progressCallback: (progress) => console.log(">>>>", progress),
                },
            });
        };

        initModelLoading();
    }, []);

    const ifcOnDoubleClick = async () => {
        // Placeholder for double-click interaction logic
        console.log(">>IFC model double-clicked");
    };

    return (
        <div
            ref={containerRef} style={{ width: "100%", height: "600px" }}
            onDoubleClick={ifcOnDoubleClick}
        />
     );
}

export default IFCViewer;
