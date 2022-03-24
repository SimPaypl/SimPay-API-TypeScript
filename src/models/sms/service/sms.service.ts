import {SmsServiceType} from './sms.service.type';
import {SMSServiceStatus} from './sms.service.status';

export interface SmsService {
    id: number;

    type: SmsServiceType;

    status: SMSServiceStatus;
    name: string;

    prefix: string;
    suffix: string;

    adult: boolean;

    numbers?: string[];

    created_at: Date;
}