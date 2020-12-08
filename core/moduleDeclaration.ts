import * as ts from "typescript";
import {GlobalString} from "./constants";
import {Store, ExtendedInterfaceProperties} from "./store";

function handleModuleDeclaration(moduleDeclaration: ts.ModuleDeclaration): ts.ModuleDeclaration {
    if (isGlobalModule(moduleDeclaration.name) && typeof moduleDeclaration.body != "undefined" && ts.isModuleBlock(moduleDeclaration.body)) {
        const moduleBlock = moduleDeclaration.body;
        moduleBlock.statements.forEach(handleModuleBlockStatement);
    }
    return moduleDeclaration;
}

function isGlobalModule(moduleName: ts.ModuleName): boolean {
    return (ts.isIdentifier(moduleName) && moduleName.getText() == GlobalString);
}

function handleModuleBlockStatement(statement: ts.Statement) {
    if (ts.isInterfaceDeclaration(statement)) {
        const interfaceDeclaration = statement; // ts.InterfaceDeclaration
        const extendedInterfaceProperties = new ExtendedInterfaceProperties();
        interfaceDeclaration.members.forEach((member) => handleInterfaceDeclarationMember(member, extendedInterfaceProperties));
        Store.instance.addInterface(interfaceDeclaration.name.getText(), extendedInterfaceProperties);
    }
}

function handleInterfaceDeclarationMember(member: ts.TypeElement, extendedInterfaceProperties: ExtendedInterfaceProperties) {
    if (ts.isPropertySignature(member)) {
        extendedInterfaceProperties.addProperty(member.name.getText());
    }
}

export default handleModuleDeclaration;