"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDeviceModelOptions = void 0;
const f2_db_sql_1 = require("f2-db-sql");
function getUserDeviceModelOptions(overrideOptions) {
    const options = {
        name: 'userDevice',
        defaultValues: {
            enabled: true
        },
        columns: {
            enabled: {
                type: f2_db_sql_1.DT.BOOLEAN,
                allowNull: false
            },
            uuid: {
                type: f2_db_sql_1.DT.STRING,
                allowNull: false
            },
            token: {
                type: f2_db_sql_1.DT.STRING,
                allowNull: false
            },
            hardwareModel: {
                type: f2_db_sql_1.DT.STRING,
                allowNull: true
            },
            mac: {
                type: f2_db_sql_1.DT.STRING,
                allowNull: true
            },
            platform: {
                type: f2_db_sql_1.DT.INTEGER,
                allowNull: false
            },
            release: {
                type: f2_db_sql_1.DT.STRING,
                allowNull: true
            },
            version: {
                type: f2_db_sql_1.DT.STRING(20),
                allowNull: true
            },
            app: {
                type: f2_db_sql_1.DT.STRING,
                allowNull: true
            },
            appVersion: {
                type: f2_db_sql_1.DT.STRING(20),
                allowNull: true
            },
            agent: {
                type: f2_db_sql_1.DT.STRING,
                allowNull: true
            },
            agentVersion: {
                type: f2_db_sql_1.DT.STRING(20),
                allowNull: true
            }
        }
    };
    f2_db_sql_1.addPrimaryKey(options);
    f2_db_sql_1.extendOptions(options, overrideOptions);
    return options;
}
exports.getUserDeviceModelOptions = getUserDeviceModelOptions;
