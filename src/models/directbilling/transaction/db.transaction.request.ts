import type { AmountType } from '../../amount.type.js';
import type { DbServiceNotify } from '../service/db.service.js';

export interface DbTransactionRequest {
    amount: number;
    amountType?: AmountType;
    description?: string;
    control?: string;
    returns?: DbServiceNotify;
    phoneNumber?: string;
    signature?: string;
    steamid?: string;
}
