'use client';
import React, { createRef, useEffect, useState } from "react";
import { IfcContainer } from "./IFCContainerViewer";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Color } from "three";

const IfcIndex: React.FC = () => {
    const ifcContainerRef = createRef<HTMLDivElement>();
    const [ifcViewer, setIfcViewer] = useState<IfcViewerAPI>();

    useEffect(() => {
        if (ifcContainerRef.current) {
            const container = ifcContainerRef.current;
            const ifcViewer = new IfcViewerAPI({
                container,
                backgroundColor: new Color(0xffffff),
            });

            ifcViewer.axes.setAxes();
            ifcViewer.grid.setGrid();
            ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
                COORDINATE_TO_ORIGIN: true,
                USE_FAST_BOOLS: false,
            });
            ifcViewer.IFC.setWasmPath('/wasm/');
            ifcViewer.IFC.loadIfcUrl('/models/granny-flat.ifc');
            setIfcViewer(ifcViewer);
        }
    }, []);

    return (
        <IfcContainer ref={ifcContainerRef} viewer={ifcViewer} />
    );
};

export default IfcIndex;
