"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInterfaceAndPropertyExist = exports.ExtendedInterfaceProperties = exports.Store = void 0;
var Store = /** @class */ (function () {
    function Store() {
        this.state = {};
        this.state = {};
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
    Store.prototype.addInterface = function (name, properties) {
        Store._instance.state[name] = properties;
    };
    Store.prototype.getInterface = function (name) {
        return Store._instance.state[name];
    };
    Store.prototype.getState = function () {
        return Store._instance.state;
    };
    Store.prototype.removeInterface = function (name) {
        var removedInterface = Store._instance.state[name];
        delete Store._instance.state[name];
        return removedInterface;
    };
    return Store;
}());
exports.Store = Store;
var ExtendedInterfaceProperties = /** @class */ (function () {
    function ExtendedInterfaceProperties() {
        this.properties = {};
    }
    ExtendedInterfaceProperties.prototype.addProperty = function (name) {
        this.properties[name] = true;
    };
    ExtendedInterfaceProperties.prototype.getProperty = function (name) {
        return this.properties[name];
    };
    ExtendedInterfaceProperties.prototype.isEmpty = function () {
        return Object.keys(this.properties).length == 0;
    };
    ExtendedInterfaceProperties.prototype.removeProperty = function (name) {
        var removedProperty = this.properties[name];
        delete this.properties[name];
        return removedProperty;
    };
    return ExtendedInterfaceProperties;
}());
exports.ExtendedInterfaceProperties = ExtendedInterfaceProperties;
function isInterfaceAndPropertyExist(interfaceName, propertyName) {
    var _interface = Store.instance.getInterface(interfaceName);
    if (typeof _interface == 'undefined')
        return false;
    else
        return typeof _interface.getProperty(propertyName) != "undefined";
}
exports.isInterfaceAndPropertyExist = isInterfaceAndPropertyExist;
