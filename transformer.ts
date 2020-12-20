import * as ts from "typescript";
import handleModifier from "./core/handlers/modifier";
import handleImportDeclaration from "./core/handlers/importDeclaration";
import handleModuleDeclaration from "./core/handlers/moduleDeclaration";
import handleExportDeclaration from "./core/handlers/exportDeclaration";
import handleExportAssignment from "./core/handlers/exportAssignment";
import {
    handleSourceFile,
    handleSourceFileLastStatement,
    isSourceFileLastStatement
} from "./core/handlers/sourceFile";

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
    return (context: ts.TransformationContext) => (file: ts.SourceFile) => visitNodeAndChildren(file, context)
}

function visitNodeAndChildren(node: ts.SourceFile, context: ts.TransformationContext): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node | ts.VisitResult<ts.Node> | undefined;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node | ts.VisitResult<ts.Node> | undefined  {
    return ts.visitEachChild(<ts.Node>visitNode(node), childNode => visitNodeAndChildren(childNode, context), context);
}

function visitNode(node: ts.SourceFile): ts.SourceFile;
function visitNode(node: ts.Node): ts.Node | ts.VisitResult<ts.Node> | undefined;
function visitNode(node: ts.Node): ts.Node | ts.VisitResult<ts.Node> | undefined {
    if (ts.isSourceFile(node))
        handleSourceFile(node);
    else if (ts.isModuleDeclaration(node))
        handleModuleDeclaration(node);
    else if (ts.isModifier(node))
        handleModifier(node);
    else if (ts.isExportDeclaration(node))
        handleExportDeclaration(node);
    else if (ts.isExportAssignment(node))
        handleExportAssignment(node)

    if (ts.isImportDeclaration(node))
        return handleImportDeclaration(node);
    else if (isSourceFileLastStatement(node))
        return handleSourceFileLastStatement(node);
    else
        return node;
}

