import * as ts from "typescript";
import Store from "../store";

export default function handleModifier(modifier: ts.Modifier) {
    if (modifier.kind == ts.SyntaxKind.ExportKeyword) {
        const currentSourceFile = Store.instance.getCurrentSourceFile();
        if (currentSourceFile && currentSourceFile.isExportDeclarationClauseEmpty && !currentSourceFile.exportedIdentifierText) {
            const parentNodeText = modifier.parent.getText();
            const regExp = new RegExp(/export\s*(default\s)*[a-z]+\s*[\w_$]+/gm);
            const matchedArray = parentNodeText.match(regExp);
            if (matchedArray) {
                const firstMatchedElement = matchedArray[0];
                const splittedArray = firstMatchedElement.split(" ");
                if (splittedArray[1] == "default") {
                    currentSourceFile.isDefaultExportFound = true
                } else {
                    currentSourceFile.exportedIdentifierText = splittedArray[splittedArray.length - 1];
                    currentSourceFile.isExportModifierFound = true;
                }
            }
        }
    }
}