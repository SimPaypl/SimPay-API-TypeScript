import type { DbProvider } from '../db.provider.js';
import type { DbTransactionStatus } from './db.transaction.status.js';

export interface PartialDbTransaction {
    id: string;
    status: DbTransactionStatus;

    value: number;
    value_netto: number;

    operator: DbProvider;

    created_at: Date;
    updated_at: Date;
}
