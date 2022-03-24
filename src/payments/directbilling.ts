import axios, {AxiosInstance} from 'axios';
import {PaginatedResponse} from '../models/response/paginated.response';
import {DbService} from '../models/directbilling/service/db.service';
import {PartialDbService} from '../models/directbilling/service/partial.db.service';
import {DbCalculation} from '../models/directbilling/service/db.calculation';
import {PartialDbTransaction} from '../models/directbilling/transaction/partial.db.transaction';
import {DbTransaction} from '../models/directbilling/transaction/db.transaction';
import {DbGenerationResponse} from '../models/directbilling/transaction/db.generation.response';
import {DbTransactionRequest} from '../models/directbilling/transaction/db.transaction.request';
import {DbNotificationRequest} from '../models/directbilling/transaction/db.notifications.request';
import {Hashing} from '../lib/hashing';

export class DirectBilling {
    private readonly key: string;
    private readonly password: string;
    private readonly client: AxiosInstance;

    constructor(key: string, password: string) {
        this.key = key;
        this.password = password;

        this.client = axios.create({
            baseURL: 'https://api.simpay.pl/directbilling',
            headers: {
                'X-SIM-KEY': this.key,
                'X-SIM-PASSWORD': this.password,
            }
        });
    }

    /*
        https://docs.simpay.pl/typescript/?typescript#directbilling-pobieranie-listy-uslug
     */
    async getServices(): Promise<PartialDbService[]> {
        const result = [];

        let response = await this.client.get('/');

        result.push(...response.data.data);

        while(response.data.pagination.links.next_page !== null) {
            response = await this.client.get(`/?page=${+response.data.pagination.current_page + 1}`);

            result.push(...response.data.data);
        }

        return result.map(e => {
            e.created_at = new Date(e.created_at.replace(' ', 'T'));

            return e;
        });
    }

    async getServicesPaginated(page?: number, pageSize?: number): Promise<PaginatedResponse<PartialDbService>> {
        const query: any = {};

        if (page) query.page = `${page}`;
        if (pageSize) query.limit = `${pageSize}`;

        const url = `/?${new URLSearchParams(query).toString()}`;

        const response = (await this.client.get(url)).data;

        response.data = response.data.map((e: any) => {
            e.created_at = new Date(e.created_at.replace(' ', 'T'));

            return e;
        });

        return response;
    }

    /*
        https://docs.simpay.pl/typescript/?typescript#directbilling-pobieranie-informacji-o-usludze
     */
    async getService(id: number): Promise<DbService | undefined> {
        try {
            const service = (await this.client.get(`/${id}`)).data.data;

            service.created_at = new Date(service.created_at.replace(' ', 'T'));
    
            return service;
        } catch(e) {
            return undefined;
        }
    }

    /*
        https://docs.simpay.pl/typescript/?typescript#directbilling-kalkulacja-prowizji
     */
    async calculateCommission(serviceId: number, amount: number): Promise<DbCalculation | undefined> {
        return (await this.client.get(`/${serviceId}/calculate?amount=${amount}`)).data.data;
    }

    /*
        https://docs.simpay.pl/typescript/?typescript#directbilling-pobieranie-listy-transakcji
     */
    async getTransactions(serviceId: number): Promise<PartialDbTransaction[]> {
        const result = [];

        let response = await this.client.get(`/${serviceId}/transactions`);

        result.push(...response.data.data);

        while(response.data.pagination.links.next_page !== null) {
            response = await this.client.get(`/${serviceId}/transactions?page=${(<number> response.data.pagination.current_page) + 1}`);

            result.push(...response.data.data);
        }

        return result.map(e => {
            e.created_at = new Date(e.created_at.replace(' ', 'T'));
            e.updated_at = new Date(e.updated_at.replace(' ', 'T'));

            return e;
        });
    }

    async getTransactionsPaginated(serviceId: number, page?: number, pageSize?: number): Promise<PaginatedResponse<PartialDbTransaction>> {
        const query: any = {};

        if (page) query.page = `${page}`;
        if (pageSize) query.limit = `${pageSize}`;

        const url = `/${serviceId}/transactions?${new URLSearchParams(query).toString()}`;

        const response = (await this.client.get(url)).data;

        response.data = response.data.map((e: any) => {
            e.created_at = new Date(e.created_at.replace(' ', 'T'));
            e.updated_at = new Date(e.updated_at.replace(' ', 'T'));

            return e;
        });

        return response;
    }

    /*
        https://docs.simpay.pl/typescript/?typescript#directbilling-pobieranie-informacji-o-transakcji
     */
    async getTransaction(serviceId: number, transactionId: string): Promise<DbTransaction | undefined> {
        const transaction = (await this.client.get(`/${serviceId}/transactions/${transactionId}`)).data.data;

        transaction.created_at = new Date(transaction.created_at.replace(' ', 'T'));
        transaction.updated_at = new Date(transaction.updated_at.replace(' ', 'T'));

        return transaction;
    }

    /*
        https://docs.simpay.pl/typescript/?typescript#directbilling-generowanie-transakcji
     */
    async createTransaction(serviceId: number, key: string, request: DbTransactionRequest): Promise<DbGenerationResponse | undefined> {
        request.signature = this.generateSignature(key, request);

        return (await this.client.post(`/${serviceId}/transactions`, request)).data;
    }

    /*
        https://docs.simpay.pl/shell/?shell#directbilling-generowanie-transakcji
     */
    checkNotification(key: string, body: any) {
        const signature = this.generateSignatureNotification(key, body);

        if (body.signature !== signature) return undefined;

        return <DbNotificationRequest> body;
    }

    /*
        https://docs.simpay.pl/shell/?shell#directbilling-generowanie-transakcji
     */
    generateSignature(key: string, request: DbTransactionRequest): string {
        const elements = [
            request.amount,
            request.amountType,
            request.description,
            request.control,
            request.returns?.success,
            request.returns?.failure,
            request.phoneNumber,
            key
        ].filter(e => e !== undefined && e !== null);

        return Hashing.sha256(elements.join('|'));
    }

    generateSignatureNotification(key: string, request: DbNotificationRequest): string {
        const elements = [
            request.id,
            request.service_id,
            request.status,
            request.values?.net,
            request.values?.gross,
            request.values?.partner,
            request.returns?.success,
            request.returns?.failure,
            request.control,
            request.number_from,
            request.provider,
            key
        ].filter(e => e !== undefined && e !== null);

        return Hashing.sha256(elements.join('|'));
    }
}