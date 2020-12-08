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
function createExpressionStatement(leftHandSideExpression, propertyEscapedString, rightHandSideExpression) {
    var factory = ts.factory;
    return factory.createExpressionStatement(factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier(constants_1.ObjectString), factory.createIdentifier(constants_1.DefinePropertyString)), undefined, [
        leftHandSideExpression,
        factory.createStringLiteral(propertyEscapedString),
        factory.createObjectLiteralExpression([
            factory.createPropertyAssignment(factory.createIdentifier(constants_1.ValueString), rightHandSideExpression)
        ], true)
    ]));
}
function handleExpressionStatement(expressionStatement) {
    if (ts.isBinaryExpression(expressionStatement.expression)) {
        var binaryExpression = expressionStatement.expression; // ts.BinaryExpression
        if (ts.isPropertyAccessExpression(binaryExpression.left) && binaryExpression.operatorToken.kind == ts.SyntaxKind.EqualsToken) {
            var propertyAccessExpression = binaryExpression.left; // ts.PropertyAccessExpression
            var assignedValueExpression = binaryExpression.right; // ts.Expression (GenericExpression could be an Keyword, StringLiterals, ObjectLiterals, Function, etc.)
            if (ts.isPropertyAccessExpression(propertyAccessExpression.expression)) {
                var protoTypePropertyAccessExpression = propertyAccessExpression.expression; // ts.PropertyAccessExpression
                var identifier = protoTypePropertyAccessExpression.expression;
                if (store_1.isInterfaceAndPropertyExist(identifier.getText(), propertyAccessExpression.name.getText())) {
                    return createExpressionStatement(protoTypePropertyAccessExpression, propertyAccessExpression.name.escapedText.toString(), assignedValueExpression);
                }
            }
            else {
                var identifier = propertyAccessExpression.expression;
                if (store_1.isInterfaceAndPropertyExist(identifier.getText(), propertyAccessExpression.name.getText())) {
                    return createExpressionStatement(identifier, propertyAccessExpression.name.escapedText.toString(), assignedValueExpression);
                }
            }
        }
    }
    return expressionStatement;
}
exports.default = handleExpressionStatement;
