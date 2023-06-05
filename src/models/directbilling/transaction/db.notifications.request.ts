import {DbServiceNotify} from '../service/db.service';
import {DbTransactionStatus} from '../transaction/db.transaction.status';
import {DbProviderID} from '../db.provider';

export interface DbNotificationRequest {
    id: string,
    service_id: string,
    status: DbTransactionStatus,
    values?: {
        net?: number,
        gross?: number,
        partner?: number,
    }
    returns?: DbServiceNotify;
    control?: string;
    number_from?: string;
    provider: DbProviderID;
    signature?: string;
}