import {DbTransactionStatus} from './db.transaction.status';
import {DbProvider} from '../db.provider';

export interface DbTransaction {
    id: string;
    status: DbTransactionStatus;

    phoneNumber?: string;
    control: string;

    value: number;
    value_netto: number;

    operator: DbProvider;

    notify: DbTransactionNotify,

    created_at: Date;
    updated_at: Date;
}

interface DbTransactionNotify {
    is_send: boolean;
    last_send_at: string;
    count: number;
}