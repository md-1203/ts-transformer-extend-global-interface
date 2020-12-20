import * as ts from "typescript";
import Store from "../store";

export default function handleExportAssignment(exportAssignment: ts.ExportAssignment) {
    const currentSourceFile = Store.instance.getCurrentSourceFile();
    if (currentSourceFile) {
        currentSourceFile.isExportAssignmentFound = true;
    }
}