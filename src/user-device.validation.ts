import joi from 'f2-joi';

import { UserDeviceUpdateData } from './user-device.entity';
import { OSPlatformNames } from './user-device.entity';


export const UserDeviceValidationSchema = joi.object().keys({
    platform: joi.string().valid(...OSPlatformNames).insensitive().required(),
    release: joi.string().max(255).allow('', null).default(null),
    version: joi.string().max(20).allow('', null).default(null),
    app: joi.string().max(255).allow('', null).default(null),
    appVersion: joi.string().max(20).allow('', null).default(null),
    agent: joi.string().max(255).allow('', null).default(null),
    agentVersion: joi.string().max(20).allow('', null).default(null),
    mac: joi.string().max(255).allow('', null).default(null)
} as {[P in keyof UserDeviceUpdateData]: joi.AnySchema});

export const UserDeviceCreateValidationSchema = UserDeviceValidationSchema.keys({
    uuid: joi.string().uuid().required(),
    hardwareModel: joi.string().max(255).allow('', null).default(null),
});