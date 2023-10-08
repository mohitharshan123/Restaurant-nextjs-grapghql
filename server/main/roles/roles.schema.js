"use strict";
// @ts-ignore
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = exports.Role = exports.PermissionModel = exports.Permission = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var type_graphql_1 = require("type-graphql");
var Permission = function () {
    var _classDecorators = [(0, type_graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _key_decorators;
    var _key_initializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var Permission = _classThis = /** @class */ (function () {
        function Permission_1() {
            this.key = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _key_initializers, void 0));
            this.description = __runInitializers(this, _description_initializers, void 0);
        }
        return Permission_1;
    }());
    __setFunctionName(_classThis, "Permission");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _key_decorators = [(0, type_graphql_1.Field)(function () { return String; }), (0, typegoose_1.prop)({ required: true })];
        _description_decorators = [(0, type_graphql_1.Field)(function () { return String; }), (0, typegoose_1.prop)({ required: true })];
        __esDecorate(null, null, _key_decorators, { kind: "field", name: "key", static: false, private: false, access: { has: function (obj) { return "key" in obj; }, get: function (obj) { return obj.key; }, set: function (obj, value) { obj.key = value; } }, metadata: _metadata }, _key_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Permission = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Permission = _classThis;
}();
exports.Permission = Permission;
exports.PermissionModel = typegoose_1.mongoose.models.Permission || (0, typegoose_1.getModelForClass)(Permission);
var Role = function () {
    var _classDecorators = [(0, type_graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _permissions_decorators;
    var _permissions_initializers = [];
    var Role = _classThis = /** @class */ (function () {
        function Role_1() {
            this.name = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.permissions = __runInitializers(this, _permissions_initializers, void 0);
        }
        return Role_1;
    }());
    __setFunctionName(_classThis, "Role");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, type_graphql_1.Field)(function () { return String; }), (0, typegoose_1.prop)({ required: true })];
        _permissions_decorators = [(0, type_graphql_1.Field)(function () { return [Permission]; }), (0, typegoose_1.prop)({ required: true })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _permissions_decorators, { kind: "field", name: "permissions", static: false, private: false, access: { has: function (obj) { return "permissions" in obj; }, get: function (obj) { return obj.permissions; }, set: function (obj, value) { obj.permissions = value; } }, metadata: _metadata }, _permissions_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Role = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Role = _classThis;
}();
exports.Role = Role;
exports.RoleModel = typegoose_1.mongoose.models.Role || (0, typegoose_1.getModelForClass)(Role);
