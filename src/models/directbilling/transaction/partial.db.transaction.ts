import {DbProvider} from '../service/db.provider';
import {DbTransactionStatus} from './db.transaction.status';

export interface PartialDbTransaction {
    id: number;
    status: DbTransactionStatus;

    value: number;
    value_netto: number;

    operator: DbProvider;

    created_at: Date;
    updated_at: Date;
}