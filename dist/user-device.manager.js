"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeviceManager = void 0;
const sequelize_1 = require("sequelize");
const f2_string_1 = require("f2-string");
const user_device_error_1 = require("./user-device.error");
const user_device_entity_1 = require("./user-device.entity");
class UserDeviceManager {
    constructor(deviceModel) {
        this.deviceModel = deviceModel;
    }
    async findOneEnabledUserByUuid(uuid) {
        return this.deviceModel.findOneOrNull({
            enabled: true,
            uuid: {
                [sequelize_1.Op.like]: uuid
            }
        });
    }
    async createUserDevice(data) {
        const uuid = data.uuid;
        if (uuid) {
            const alreadyExistDevice = await this.findOneEnabledUserByUuid(uuid);
            if (alreadyExistDevice) {
                throw new user_device_error_1.AlreadyExistUserDeviceError(uuid);
            }
        }
        const platform = this.platformNameToId(data.platform);
        if (!platform) {
            throw new Error(`La plateforme ${data.platform} n'existe pas`);
        }
        const createData = this.deviceDataToAttrs(data, {
            hardwareModel: data.hardwareModel,
            mac: data.mac,
            uuid: data.uuid,
        });
        await this.renewToken(createData);
        return this.deviceModel.insertOne(createData);
    }
    async findOneEnabledUserDeviceById(id) {
        return this.deviceModel.findOneOrNull({
            id: id,
            enabled: true
        });
    }
    async findOneEnabledUserDeviceByToken(token) {
        return this.deviceModel.findOneOrNull({
            enabled: true,
            token: {
                [sequelize_1.Op.like]: token
            }
        });
    }
    platformNameToId(platform) {
        switch (platform) {
            case 'linux':
                return user_device_entity_1.OSPlatform.Linux;
            case 'windows':
                return user_device_entity_1.OSPlatform.Windows;
            case 'mac':
                return user_device_entity_1.OSPlatform.Mac;
            case 'android':
                return user_device_entity_1.OSPlatform.Android;
            case 'ios':
                return user_device_entity_1.OSPlatform.Ios;
            default:
                return null;
        }
    }
    deviceDataToAttrs(data, to) {
        const platform = this.platformNameToId(data.platform);
        if (!platform) {
            throw new Error(`La plateforme ${data.platform} n'existe pas`);
        }
        if (!to) {
            to = {};
        }
        Object.assign(to, {
            platform: platform,
            release: data.release,
            version: data.version,
            app: data.app,
            appVersion: data.appVersion,
            agent: data.agent,
            agentVersion: data.agentVersion
        });
        return to;
    }
    async _updateUserDevice(device, updates) {
        await this.renewToken(updates);
        await this.deviceModel.updateEntity(device, updates);
    }
    async updateUserDevice(device, data) {
        const updates = this.deviceDataToAttrs(data);
        await this._updateUserDevice(device, updates);
    }
    async renewToken(attrs) {
        attrs.token = await f2_string_1.generate();
    }
    serializedUserDevice(device) {
        return {
            id: +device.id,
            hardwareModel: device.hardwareModel,
            mac: device.mac,
            uuid: device.uuid,
            platform: device.platform,
            release: device.release,
            version: device.version,
            app: device.version,
            appVersion: device.appVersion,
            agent: device.agent,
            agentVersion: device.agentVersion,
            userId: +device.userId
        };
    }
}
exports.UserDeviceManager = UserDeviceManager;
