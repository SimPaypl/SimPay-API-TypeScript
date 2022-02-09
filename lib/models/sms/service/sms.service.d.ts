import { SmsServiceType } from './sms.service.type';
import { ServiceStatus } from '../../service.status';
export interface SmsService {
    id: number;
    type: SmsServiceType;
    status: ServiceStatus;
    name: string;
    prefix: string;
    suffix: string;
    adult: boolean;
    numbers?: string[];
    created_at: Date;
}
