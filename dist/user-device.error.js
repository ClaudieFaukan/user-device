"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExistUserDeviceError = void 0;
class AlreadyExistUserDeviceError extends Error {
    constructor(uuid) {
        super(`L'appareil ${uuid} existe déjà`);
        this.uuid = uuid;
    }
}
exports.AlreadyExistUserDeviceError = AlreadyExistUserDeviceError;
