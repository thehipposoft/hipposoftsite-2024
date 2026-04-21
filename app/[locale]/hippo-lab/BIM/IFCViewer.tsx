'use client';
import React from "react";
import IFCViewerNew from "./IFCViewer-new";

const IfcIndex: React.FC = () => {
    return <IFCViewerNew ifcUrl='/models/granny-flat.ifc' />;
};

export default IfcIndex;
