import { SmsService } from '../models/sms/service/sms.service';
import { SmsTransaction } from '../models/sms/transaction/sms.transaction';
import { SmsNumber } from '../models/sms/service/sms.number';
import { PaginatedResponse } from '../models/response/paginated.response';
import { VerificationResponse } from '../models/sms/verification.response';
export declare class Sms {
    private readonly key;
    private readonly password;
    private readonly client;
    constructor(key: string, password: string);
    getServices(): Promise<SmsService[]>;
    getServicesPaginated(page?: number, pageSize?: number): Promise<PaginatedResponse<SmsService>>;
    getService(id: number): Promise<SmsService | undefined>;
    getTransactions(serviceId: number): Promise<SmsTransaction[]>;
    getTransactionsPaginated(serviceId: number, page?: number, pageSize?: number): Promise<PaginatedResponse<SmsTransaction>>;
    getTransaction(serviceId: number, transactionId: number): Promise<SmsTransaction | undefined>;
    getServiceNumbers(serviceId: number): Promise<SmsNumber[]>;
    getServiceNumbersPaginated(serviceId: number, page?: number, pageSize?: number): Promise<PaginatedResponse<SmsNumber>>;
    getServiceNumber(serviceId: number, number: number): Promise<SmsNumber>;
    getNumbers(): Promise<SmsNumber[]>;
    getNumbersPaginated(page?: number, pageSize?: number): Promise<PaginatedResponse<SmsNumber>>;
    getNumber(number: number): Promise<SmsNumber | undefined>;
    verifySmsCode(serviceId: number, code: string, number?: number): Promise<VerificationResponse | undefined>;
}
