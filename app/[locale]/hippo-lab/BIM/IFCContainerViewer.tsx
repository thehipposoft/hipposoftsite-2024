import React, { forwardRef, Fragment } from "react";
import * as OBC from "@thatopen/components";

interface IfcRecord {
  [key: string]: string;
}

interface IfcContainerProps {
  components?: OBC.Components;
  world?: OBC.World;
}

export const IfcContainer = forwardRef<HTMLDivElement, IfcContainerProps>(
    function IfcContainerFunc(props, ref) {
        const [popoverOpen, setPopoverOpen] = React.useState(false);
        const [curIfcRecords, setIfcRecords] = React.useState<IfcRecord>();

        const { components, world } = props;

        const handleClose = () => {
            setPopoverOpen(false);
        };

        const ifcOnDoubleClick = async () => {
            if (components && world) {
                try {
                    // ThatOpen Components approach for element selection
                    const fragments = components.get(OBC.FragmentsManager);

                    // This is a simplified version - you might need to implement
                    // proper raycasting and element picking based on ThatOpen docs
                    console.log("Double click detected - implement element selection");

                    // Placeholder for element properties display
                    const ifcRecords: IfcRecord = {
                        "Entity Type": "Placeholder",
                        "GlobalId": "Click on an element",
                        "Name": "Element selection needs implementation",
                    };
                    setIfcRecords(ifcRecords);
                    setPopoverOpen(true);
                } catch (error) {
                    console.error("Error in element selection:", error);
                }
            }
        };

        const ifcOnRightClick = async (e: React.MouseEvent) => {
            e.preventDefault();
            if (components && world) {
                try {
                    const clipper = await components.get(OBC.Clipper);
                    // Use the correct ThatOpen API methods - simplified for now
                    console.log("Right click detected - implement clipping");
                } catch (error) {
                    console.error("Error in clipping plane creation:", error);
                }
            }
        };

        return (
            <>
                <div
                    className={"ifcContainerViewer"}
                    ref={ref}
                    onDoubleClick={ifcOnDoubleClick}
                    onContextMenu={ifcOnRightClick}
                    style={{
                        position: "relative",
                        width: "100vw",
                        height: "100vh",
                        overflow: "hidden",
                    }}
                />
                {popoverOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-end pt-4 pr-4">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black bg-opacity-25"
                            onClick={handleClose}
                        />

                        {/* Popover content */}
                        <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                            <dl className="space-y-2">
                                {curIfcRecords &&
                                    Object.keys(curIfcRecords).map(
                                    (key) =>
                                        curIfcRecords[key] && (
                                        <Fragment key={key}>
                                            <dt className="text-sm font-medium text-gray-700">
                                                {key}
                                            </dt>
                                            <dd className="text-sm text-gray-900 pb-2">
                                                {curIfcRecords[key]}
                                            </dd>
                                        </Fragment>
                                        )
                                    )}
                            </dl>
                        </div>
                    </div>
                )}
            </>
        );
    }
);
