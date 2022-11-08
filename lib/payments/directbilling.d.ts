import { PaginatedResponse } from '../models/response/paginated.response';
import { DbService } from '../models/directbilling/service/db.service';
import { PartialDbService } from '../models/directbilling/service/partial.db.service';
import { DbCalculation } from '../models/directbilling/service/db.calculation';
import { PartialDbTransaction } from '../models/directbilling/transaction/partial.db.transaction';
import { DbTransaction } from '../models/directbilling/transaction/db.transaction';
import { DbGenerationResponse } from '../models/directbilling/transaction/db.generation.response';
import { DbTransactionRequest } from '../models/directbilling/transaction/db.transaction.request';
import { DbNotificationRequest } from '../models/directbilling/transaction/db.notifications.request';
export declare class DirectBilling {
    private readonly key;
    private readonly password;
    private readonly client;
    constructor(key: string, password: string);
    getServices(): Promise<PartialDbService[]>;
    getServicesPaginated(page?: number, pageSize?: number): Promise<PaginatedResponse<PartialDbService>>;
    getService(id: number): Promise<DbService | undefined>;
    calculateCommission(serviceId: number, amount: number): Promise<DbCalculation | undefined>;
    getTransactions(serviceId: number): Promise<PartialDbTransaction[]>;
    getTransactionsPaginated(serviceId: number, page?: number, pageSize?: number): Promise<PaginatedResponse<PartialDbTransaction>>;
    getTransaction(serviceId: number, transactionId: string): Promise<DbTransaction | undefined>;
    createTransaction(serviceId: number, key: string, request: DbTransactionRequest): Promise<DbGenerationResponse | undefined>;
    checkNotification(key: string, body: any): DbNotificationRequest | undefined;
    generateSignature(key: string, request: DbTransactionRequest): string;
    generateSignatureNotification(key: string, request: DbNotificationRequest): string;
}
