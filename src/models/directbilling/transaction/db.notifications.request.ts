import type { DbProviderID } from '../db.provider.js';
import type { DbServiceNotify } from '../service/db.service.js';
import type { DbTransactionStatus } from '../transaction/db.transaction.status.js';

export interface DbNotificationRequest {
    id: string;
    service_id: string;
    status: DbTransactionStatus;
    values?: {
        net?: number;
        gross?: number;
        partner?: number;
    };
    returns?: DbServiceNotify;
    control?: string;
    number_from?: string;
    provider: DbProviderID;
    signature?: string;
}
