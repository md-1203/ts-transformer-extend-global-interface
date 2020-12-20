"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store = /** @class */ (function () {
    function Store() {
    }
    ;
    Object.defineProperty(Store, "instance", {
        get: function () {
            if (!Store._instance) {
                Store._instance = new Store();
                return Store._instance;
            }
            return Store._instance;
        },
        enumerable: false,
        configurable: true
    });
    Store.prototype.setCurrentSourceFile = function (sourceFile) {
        Store._instance.currentSourceFile = sourceFile;
    };
    Store.prototype.getCurrentSourceFile = function () {
        return Store._instance.currentSourceFile;
    };
    Store.prototype.resetCurrentSourceFile = function () {
        Store._instance.currentSourceFile = undefined;
    };
    return Store;
}());
exports.default = Store;
