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
    getService(id: string): Promise<SmsService | undefined>;
    getTransactions(serviceId: string): Promise<SmsTransaction[]>;
    getTransactionsPaginated(serviceId: string, page?: number, pageSize?: number): Promise<PaginatedResponse<SmsTransaction>>;
    getTransaction(serviceId: string, transactionId: number): Promise<SmsTransaction | undefined>;
    getServiceNumbers(serviceId: string): Promise<SmsNumber[]>;
    getServiceNumbersPaginated(serviceId: string, page?: number, pageSize?: number): Promise<PaginatedResponse<SmsNumber>>;
    getServiceNumber(serviceId: string, number: number): Promise<SmsNumber>;
    getNumbers(): Promise<SmsNumber[]>;
    getNumbersPaginated(page?: number, pageSize?: number): Promise<PaginatedResponse<SmsNumber>>;
    getNumber(number: number): Promise<SmsNumber | undefined>;
    verifySmsCode(serviceId: string, code: string, number?: number): Promise<VerificationResponse | undefined>;
}
