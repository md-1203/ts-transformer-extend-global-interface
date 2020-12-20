import * as ts from "typescript";
import Store from "../store";

export default function handleExportDeclaration(exportDeclaration: ts.ExportDeclaration) {
    if (exportDeclaration.exportClause){
        if (ts.isNamedExports(exportDeclaration.exportClause)) {
            const namedImports = exportDeclaration.exportClause;
            const currentSourceFile = Store.instance.getCurrentSourceFile();
            if (currentSourceFile) {
                if (namedImports.elements.length) {
                    const firstExportSpecifier = namedImports.elements[0];
                    currentSourceFile.exportedIdentifierText = firstExportSpecifier.name.escapedText.toString();
                    currentSourceFile.isExportDeclarationClauseEmpty = false;
                } else {
                    currentSourceFile.isExportDeclarationClauseEmpty = true;
                }
            }
        }
    } else if (exportDeclaration.moduleSpecifier) {
        if (ts.isStringLiteral(exportDeclaration.moduleSpecifier)) {
            const stringLiteral = exportDeclaration.moduleSpecifier;
            const currentSourceFile = Store.instance.getCurrentSourceFile();
            if (currentSourceFile && currentSourceFile.isGlobalInterfaceExtended) {
                if (currentSourceFile.fileName.match(stringLiteral.text)) {
                    currentSourceFile.fileName = exportDeclaration.getSourceFile().fileName;
                }
            }
        }
    }
}