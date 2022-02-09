import {AmountType} from '../../amount.type';
import {DbServiceNotify} from '../service/db.service';

export interface DbTransactionRequest {
    amount: number;
    amountType?: AmountType;
    description?: string;
    control?: string;
    returns?: DbServiceNotify;
    phoneNumber?: string;
    signature?: string;
}