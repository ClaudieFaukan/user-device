import {UserDeviceCreateValidationSchema} from '../src/user-device.validation';
import {UserDeviceCreateData} from '../src/user-device.entity';
import {expect} from 'chai';
import { ValidationError } from 'f2-joi';


describe ( "schemaTest", ( () => {


    it ( "Device Ok", () => { 

        const device:UserDeviceCreateData = {

            agent:"Petrel",
            agentVersion:"1.0.0",
            app:"FakeR2T",
            appVersion:"2.0.1",
            hardwareModel:"intel CP7",
            mac:"5E:FF:56:A2:AF:15",
            platform:"linux",
            release: null,
            uuid: "c83914da-21b5-4ddc-be99-2fc277d530d8",
            version:"dev"
        } 

        const value = UserDeviceCreateValidationSchema.validate(device);
        const valueStringify = JSON.stringify(value);

        expect(valueStringify).to.eq(`{"value":{"agent":"Petrel","agentVersion":"1.0.0","app":"FakeR2T","appVersion":"2.0.1","hardwareModel":"intel CP7","mac":"5E:FF:56:A2:AF:15","platform":"linux","release":null,"uuid":"c83914da-21b5-4ddc-be99-2fc277d530d8","version":"dev"}}`);

    });
    
    it ( " if agent name too long ", () => { 

        const device:UserDeviceCreateData = {

            agent:"Petrelllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll",
            agentVersion:"1.0.0",
            app:"FakeR2T",
            appVersion:"2.0.1",
            hardwareModel:"intel CP7",
            mac:"5E:FF:56:A2:AF:15",
            platform:"linux",
            release: null,
            uuid: "c83914da-21b5-4ddc-be99-2fc277d530d8",
            version:"dev"
        } 
        
        const result = UserDeviceCreateValidationSchema.validate(device);
        
        const error = result.error as ValidationError;

        expect(error).to.instanceOf(ValidationError);

        const detail = error.details[0];

        expect(detail.type).to.eq('string.max');
        expect(detail.path[0]).to.eq('agent');
        expect(result.error).to.instanceOf(ValidationError);
        expect((result.error as ValidationError).message).to.eql(`"agent" length must be less than or equal to 255 characters long`);

    });

    it ( "Device created with only plateform & uuid (not null) default other keys equal to null", () => { 

        const device: Partial<UserDeviceCreateData> = {

            platform:"linux",
            uuid:"c83914da-21b5-4ddc-be99-2fc277d530d8"
        } 

        const value = UserDeviceCreateValidationSchema.validate(device);
        const valueStringify = JSON.stringify(value);


        expect(valueStringify).to.eq(`{"value":{"platform":"linux","uuid":"c83914da-21b5-4ddc-be99-2fc277d530d8","release":null,"version":null,"app":null,"appVersion":null,"agent":null,"agentVersion":null,"mac":null,"hardwareModel":null}}`);

    });

    it ( "Device created empty", () => { 

        const device:Partial<UserDeviceCreateData>= {
            //empty
        } 

        const result = UserDeviceCreateValidationSchema.validate(device);
    
        const error = result.error as ValidationError;

        expect(error).to.instanceOf(ValidationError);

        const detail = error.details[0];

        expect(detail.message).to.eq('"platform" is required');         
    });

    it ( "Device with only 1/2 required", () => { 

        const device:Partial<UserDeviceCreateData>= {

            platform:"android"
        } 

        const result = UserDeviceCreateValidationSchema.validate(device);
    
        const error = result.error as ValidationError;

        expect(error).to.instanceOf(ValidationError);

        const detail = error.details[0];

        expect(detail.message).to.eq('"uuid" is required');         
    });

}));