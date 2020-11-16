"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeviceCreateValidationSchema = exports.UserDeviceValidationSchema = void 0;
const f2_joi_1 = __importDefault(require("f2-joi"));
const user_device_entity_1 = require("./user-device.entity");
exports.UserDeviceValidationSchema = f2_joi_1.default.object().keys({
    platform: f2_joi_1.default.string().valid(...user_device_entity_1.OSPlatformNames).insensitive().required(),
    release: f2_joi_1.default.string().max(255).allow('', null).default(null),
    version: f2_joi_1.default.string().max(20).allow('', null).default(null),
    app: f2_joi_1.default.string().max(255).allow('', null).default(null),
    appVersion: f2_joi_1.default.string().max(20).allow('', null).default(null),
    agent: f2_joi_1.default.string().max(255).allow('', null).default(null),
    agentVersion: f2_joi_1.default.string().max(20).allow('', null).default(null),
    mac: f2_joi_1.default.string().max(255).allow('', null).default(null)
});
exports.UserDeviceCreateValidationSchema = exports.UserDeviceValidationSchema.keys({
    uuid: f2_joi_1.default.string().uuid().required(),
    hardwareModel: f2_joi_1.default.string().max(255).allow('', null).default(null),
});
