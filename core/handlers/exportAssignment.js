"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = __importDefault(require("../store"));
function handleExportAssignment(exportAssignment) {
    var currentSourceFile = store_1.default.instance.getCurrentSourceFile();
    if (currentSourceFile) {
        currentSourceFile.isExportAssignmentFound = true;
    }
}
exports.default = handleExportAssignment;
