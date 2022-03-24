import { DbProvider } from '../db.provider';
import { DbTransactionStatus } from './db.transaction.status';
export interface PartialDbTransaction {
    id: string;
    status: DbTransactionStatus;
    value: number;
    value_netto: number;
    operator: DbProvider;
    created_at: Date;
    updated_at: Date;
}
