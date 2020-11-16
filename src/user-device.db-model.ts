import { SqlModelOptions, addPrimaryKey, DT, SqlModelOptionsAttributes, extendOptions, SqlModel, 
    SequelizeModel} from 'f2-db-sql';
    
import { UserDeviceAttributes, UserDevice } from './user-device.entity';


export interface UserDeviceModelReference {
    user: SequelizeModel;
}

export type UserDeviceModel = SqlModel<UserDevice, UserDeviceModelReference>;

export function getUserDeviceModelOptions<TDevice extends UserDeviceAttributes>(overrideOptions?: SqlModelOptionsAttributes<TDevice>): SqlModelOptions<TDevice> {

    const options: SqlModelOptions<TDevice | UserDeviceAttributes> = {
        name: 'userDevice',
        defaultValues: {
            enabled: true
        },
        columns: {
            enabled: {
                type: DT.BOOLEAN,
                allowNull: false
            },
            uuid: {
                type: DT.STRING,
                allowNull: false
            },
            token: {
                type: DT.STRING,
                allowNull: false
            },
            hardwareModel: {
                type: DT.STRING,
                allowNull: true
            },
            mac: {
                type: DT.STRING,
                allowNull: true
            },
            platform: {
                type: DT.INTEGER,
                allowNull: false
            },
            release: {
                type: DT.STRING,
                allowNull: true
            },
            version: {
                type: DT.STRING(20),
                allowNull: true
            },
            app: {
                type: DT.STRING,
                allowNull: true
            },
            appVersion: {
                type: DT.STRING(20),
                allowNull: true
            },
            agent: {
                type: DT.STRING,
                allowNull: true
            },
            agentVersion: {
                type: DT.STRING(20),
                allowNull: true
            }
        }
    };

    addPrimaryKey(options);
    extendOptions(options, overrideOptions);

    return options as SqlModelOptions<TDevice>;
}
