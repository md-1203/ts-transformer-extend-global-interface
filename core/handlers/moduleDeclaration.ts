import * as ts from "typescript";
import Store from "../store";

function handleModuleDeclaration(moduleDeclaration: ts.ModuleDeclaration) {
    if (isGlobalModuleDeclaration(moduleDeclaration)) {
        handleGlobalModuleDeclaration(moduleDeclaration);
    }
}

function isGlobalModuleDeclaration(moduleDeclaration: ts.ModuleDeclaration): boolean {
    const moduleName = moduleDeclaration.name;
    return ts.isIdentifier(moduleName) && moduleName.originalKeywordKind == ts.SyntaxKind.GlobalKeyword;
}

function handleGlobalModuleDeclaration(moduleDeclaration: ts.ModuleDeclaration) {
    if (moduleDeclaration.body && ts.isModuleBlock(moduleDeclaration.body)) {
        const moduleBlock = moduleDeclaration.body;
        moduleBlock.statements.forEach(handleModuleBlockStatement);
    }
}

function handleModuleBlockStatement(statement: ts.Statement) {
    if (ts.isInterfaceDeclaration(statement)) {
        handleInterfaceDeclaration(statement);
    }
}

function handleInterfaceDeclaration(interfaceDeclaration: ts.InterfaceDeclaration) {
    if (interfaceDeclaration.members.length) {
        const currentSourceFile = Store.instance.getCurrentSourceFile();
        if (currentSourceFile) {
            currentSourceFile.isGlobalInterfaceExtended = true;
        }
    }
}

export default handleModuleDeclaration;