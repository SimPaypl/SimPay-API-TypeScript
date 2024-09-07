import type { DbProvider } from '../db.provider.js';
import type { DbTransactionStatus } from './db.transaction.status.js';

export interface DbTransaction {
    id: string;
    status: DbTransactionStatus;

    phoneNumber?: string;
    control: string;

    value: number;
    value_netto: number;

    operator: DbProvider;

    notify: DbTransactionNotify;

    created_at: Date;
    updated_at: Date;
}

interface DbTransactionNotify {
    is_send: boolean;
    last_send_at: string;
    count: number;
}
