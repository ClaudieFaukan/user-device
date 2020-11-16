export enum OSPlatform {
    Linux = 1,
    Windows = 2,
    Mac = 3,
    Android = 4,
    Ios = 5
}

export type OSPlatformName = 'linux' | 'windows' | 'mac' | 'android' | 'ios';

export const OSPlatformNames: OSPlatformName[] = ['linux', 'windows', 'mac', 'android', 'ios'];

export interface UserDeviceData {
    platform: OSPlatformName;
    release: string | null;
    version: string | null;
    app: string | null;
    appVersion: string | null;
    agent: string | null;
    agentVersion: string | null;
    mac: string | null;
}

export interface UserDeviceCreateData extends UserDeviceData {
    uuid: string;
    hardwareModel: string | null;
}

export interface UserDeviceUpdateData extends UserDeviceData {}

export interface SerializedUserDevice {
    id: number;
    uuid: string;
    platform: OSPlatform;
    release: string | null;
    version: string | null;
    hardwareModel: string | null;
    mac: string | null;
    app: string | null;
    appVersion: string | null;
    agent: string | null;
    agentVersion: string | null;
    userId: number;
}

export interface UserDevice {
    id: number;
    enabled: boolean;
    token: string;
    uuid: string;
    hardwareModel: string | null;
    mac: string | null;
    platform: OSPlatform;
    release: string | null;
    version: string | null;
    app: string | null;
    appVersion: string | null;
    agent: string | null;
    agentVersion: string | null;
    userId: number;
}

export type UserDeviceAttributes = Partial<UserDevice>;