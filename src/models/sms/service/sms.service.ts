import type { SMSServiceStatus } from './sms.service.status.js';
import type { SmsServiceType } from './sms.service.type.js';

export interface SmsService {
    id: string;

    type: SmsServiceType;

    status: SMSServiceStatus;
    name: string;

    prefix: string;
    suffix: string;

    adult: boolean;

    numbers?: string[];

    created_at: Date;
}
