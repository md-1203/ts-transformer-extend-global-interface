"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = __importStar(require("typescript"));
var constants_1 = require("./constants");
var store_1 = require("./store");
function handleModuleDeclaration(moduleDeclaration) {
    if (isGlobalModule(moduleDeclaration.name) && typeof moduleDeclaration.body != "undefined" && ts.isModuleBlock(moduleDeclaration.body)) {
        var moduleBlock = moduleDeclaration.body;
        moduleBlock.statements.forEach(handleModuleBlockStatement);
    }
    return moduleDeclaration;
}
function isGlobalModule(moduleName) {
    return (ts.isIdentifier(moduleName) && moduleName.getText() == constants_1.GlobalString);
}
function handleModuleBlockStatement(statement) {
    if (ts.isInterfaceDeclaration(statement)) {
        var interfaceDeclaration = statement; // ts.InterfaceDeclaration
        var extendedInterfaceProperties_1 = new store_1.ExtendedInterfaceProperties();
        interfaceDeclaration.members.forEach(function (member) { return handleInterfaceDeclarationMember(member, extendedInterfaceProperties_1); });
        store_1.Store.instance.addInterface(interfaceDeclaration.name.getText(), extendedInterfaceProperties_1);
    }
}
function handleInterfaceDeclarationMember(member, extendedInterfaceProperties) {
    if (ts.isPropertySignature(member)) {
        extendedInterfaceProperties.addProperty(member.name.getText());
    }
}
exports.default = handleModuleDeclaration;
