
export class AlreadyExistUserDeviceError extends Error {

    constructor(readonly uuid: string) {

        super(`L'appareil ${uuid} existe déjà`);
    }
}