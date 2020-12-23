import * as ts from "typescript";
import Store from "../store";
import SourceFile from "../model";
import handleModifier from "./modifier";
import handleExportDeclaration from "./exportDeclaration";
import handleExportAssignment from "./exportAssignment";
import {createSignatureStatement, variableIdentifierText} from "./signatureStatement";

export function handleSourceFile(sourceFile: ts.SourceFile) {
    if (Store.instance.getCurrentSourceFile() == undefined) {
        const newSourceFile = new SourceFile();
        newSourceFile.fileName = sourceFile.fileName;
        newSourceFile.lastStatementId = getLastStatementId(sourceFile);
        Store.instance.setCurrentSourceFile(newSourceFile)
    }
}

function getLastStatementId(file: ts.SourceFile): string {
    const lastStatement = file.statements[file.statements.length - 1];
    return `${lastStatement.pos}${lastStatement.getFullWidth()}${lastStatement.end}`;
}

export function isSourceFileLastStatement(node: ts.Node): boolean {
    const currentSourceFile = Store.instance.getCurrentSourceFile();
    if (currentSourceFile && node.pos != -1) {
        return currentSourceFile.lastStatementId == `${node.pos}${node.getFullWidth()}${node.end}`;
    }
    return false;
}

export function handleSourceFileLastStatement(lastStatement: ts.Node): ts.Node | ts.Node[] {
    checkLastStatement(lastStatement);
    const currentSourceFile = Store.instance.getCurrentSourceFile();
    if (currentSourceFile) {
        if ((!currentSourceFile.isGlobalInterfaceExtended) || (currentSourceFile.isGlobalInterfaceExtended && currentSourceFile.isDefaultExportFound)) {
            Store.instance.resetCurrentSourceFile();
        } else if (currentSourceFile.isGlobalInterfaceExtended && (currentSourceFile.isExportDeclarationClauseEmpty == undefined || currentSourceFile.isExportDeclarationClauseEmpty) && !currentSourceFile.isExportModifierFound && !currentSourceFile.isDefaultExportFound) {
            const signatureStatement = createSignatureStatement();
            currentSourceFile.exportedIdentifierText = variableIdentifierText;
            currentSourceFile.lastStatementId = '';
            return [lastStatement, signatureStatement];
        }
    }
    return lastStatement;
}

function checkLastStatement(lastStatement: ts.Node) {
    if (ts.isExportDeclaration(lastStatement)) {
        handleExportDeclaration(lastStatement)
    } else if (ts.isExportAssignment(lastStatement)) {
        handleExportAssignment(lastStatement)
    } else if (lastStatement.modifiers && lastStatement.modifiers.length) {
        handleModifier(lastStatement.modifiers[0]);
    }
}