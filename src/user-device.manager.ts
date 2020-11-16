import { Op } from 'sequelize';
import { generate } from 'f2-string';
import { AlreadyExistUserDeviceError } from './user-device.error';
import { SerializedUserDevice, UserDeviceUpdateData, UserDeviceData , UserDeviceCreateData } from './user-device.entity';
import { UserDeviceModel } from './user-device.db-model';
import { UserDevice, UserDeviceAttributes, OSPlatformName, OSPlatform } from './user-device.entity';


export class UserDeviceManager {

    constructor(private deviceModel: UserDeviceModel) {}
    

    public async findOneEnabledUserByUuid(uuid: string): Promise<UserDevice | null> {

        return this.deviceModel.findOneOrNull({
            enabled: true,
            uuid: {
                [Op.like]: uuid
            }
        });
    }

    public async createUserDevice(data: UserDeviceCreateData): Promise<UserDevice> {

        const uuid = data.uuid;

        if(uuid) {

            const alreadyExistDevice = await this.findOneEnabledUserByUuid(uuid);
        
            if(alreadyExistDevice) {
                throw new AlreadyExistUserDeviceError(uuid);
            }
        }

        const platform = this.platformNameToId(data.platform);

        if(!platform) {
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

    public async findOneEnabledUserDeviceById(id: number): Promise<UserDevice | null> {

        return this.deviceModel.findOneOrNull({
            id: id,
            enabled: true
        });
    }

    public async findOneEnabledUserDeviceByToken(token: string): Promise<UserDevice | null> {

        return this.deviceModel.findOneOrNull({
            enabled: true,
            token: {
                [Op.like]: token
            }
        });
    }


    public platformNameToId(platform: OSPlatformName): OSPlatform | null {

        switch(platform) {

            case 'linux':
                return OSPlatform.Linux;

            case 'windows':
                return OSPlatform.Windows;

            case 'mac':
                return OSPlatform.Mac;

            case 'android':
                return OSPlatform.Android;

            case 'ios':
                return OSPlatform.Ios;

            default:
                return null;
        }
    }

    private deviceDataToAttrs(data: UserDeviceData, to?: UserDeviceAttributes): UserDeviceAttributes {

        const platform = this.platformNameToId(data.platform);

        if(!platform) {
            throw new Error(`La plateforme ${data.platform} n'existe pas`);
        }

        if(!to) {
            to = {};
        }

        Object.assign<UserDeviceAttributes, UserDeviceAttributes>(to, {
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

    private async _updateUserDevice(device: UserDevice, updates: UserDeviceAttributes): Promise<void> {

        await this.renewToken(updates);

        await this.deviceModel.updateEntity(device, updates);
    }

    public async updateUserDevice(device: UserDevice, data: UserDeviceUpdateData): Promise<void> {

        const updates = this.deviceDataToAttrs(data);

        await this._updateUserDevice(device, updates);
    }

    private async renewToken(attrs: UserDeviceAttributes): Promise<void> {

        attrs.token = await generate();
    }

    public serializedUserDevice(device: UserDevice): SerializedUserDevice {

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