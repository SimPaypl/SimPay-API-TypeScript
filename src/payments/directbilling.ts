import axios, { type AxiosInstance } from 'axios';
import { sha256 } from '../lib/hashing.js';
import type { DbCalculation } from '../models/directbilling/service/db.calculation.js';
import type { DbService } from '../models/directbilling/service/db.service.js';
import type { PartialDbService } from '../models/directbilling/service/partial.db.service.js';
import type { DirectBillingServicePaginatedResponse } from '../models/directbilling/service/service-paginated.response.js';
import type { DbGenerationResponse } from '../models/directbilling/transaction/db.generation.response.js';
import type { DbNotificationRequest } from '../models/directbilling/transaction/db.notifications.request.js';
import type { DbTransaction } from '../models/directbilling/transaction/db.transaction.js';
import type { DbTransactionRequest } from '../models/directbilling/transaction/db.transaction.request.js';
import type { PartialDbTransaction } from '../models/directbilling/transaction/partial.db.transaction.js';
import type { PaginatedResponse } from '../models/response/paginated.response.js';

export class DirectBilling {
    private readonly client: AxiosInstance;

    constructor(
        private readonly key: string,
        private readonly password: string,
    ) {
        this.key = key;
        this.password = password;

        this.client = axios.create({
            baseURL: 'https://api.simpay.pl/directbilling',
            headers: {
                'X-SIM-KEY': this.key,
                'X-SIM-PASSWORD': this.password,
                'X-SIM-VERSION': '3.1.0',
                'X-SIM-PLATFORM': 'TYPESCRIPT',
            },
        });
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-listy-uslug
     */
    async getServices(): Promise<PartialDbService[]> {
        const result = [];

        let response = await this.client.get('/');

        result.push(...response.data.data);

        while (response.data.pagination.links.next_page !== null) {
            response = await this.client.get(
                `/?page=${+response.data.pagination.current_page + 1}`,
            );

            result.push(...response.data.data);
        }

        return result.map((e) => {
            e.created_at = new Date(e.created_at.replace(' ', 'T'));

            return e;
        });
    }

    async getServicesPaginated(
        page?: number,
        pageSize?: number,
    ): Promise<PaginatedResponse<PartialDbService>> {
        const query: Record<string, string> = {};

        if (page) query.page = `${page}`;
        if (pageSize) query.limit = `${pageSize}`;

        const url = `/?${new URLSearchParams(query).toString()}`;

        const response = (await this.client.get<DirectBillingServicePaginatedResponse>(url)).data;

        response.data = response.data.map((e) => {
            e.created_at = new Date(e.created_at.toString().replace(' ', 'T'));

            return e;
        });

        return response;
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-informacji-o-usludze
     */
    async getService(id: string): Promise<DbService | undefined> {
        try {
            const service = (await this.client.get(`/${id}`)).data.data;

            service.created_at = new Date(service.created_at.replace(' ', 'T'));

            return service;
        } catch (e) {
            return undefined;
        }
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-kalkulacja-prowizji
     */
    async calculateCommission(
        serviceId: string,
        amount: number,
    ): Promise<DbCalculation | undefined> {
        return (await this.client.get(`/${serviceId}/calculate?amount=${amount}`)).data.data;
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-listy-transakcji
     */
    async getTransactions(serviceId: string): Promise<PartialDbTransaction[]> {
        const result = [];

        let response = await this.client.get(`/${serviceId}/transactions`);

        result.push(...response.data.data);

        while (response.data.pagination.links.next_page !== null) {
            response = await this.client.get(
                `/${serviceId}/transactions?page=${<number>response.data.pagination.current_page + 1}`,
            );

            result.push(...response.data.data);
        }

        return result.map((e) => {
            e.created_at = new Date(e.created_at.replace(' ', 'T'));
            e.updated_at = new Date(e.updated_at.replace(' ', 'T'));

            return e;
        });
    }

    async getTransactionsPaginated(
        serviceId: string,
        page?: number,
        pageSize?: number,
    ): Promise<PaginatedResponse<PartialDbTransaction>> {
        const query: Record<string, string> = {};

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
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-informacji-o-transakcji
     */
    async getTransaction(
        serviceId: string,
        transactionId: string,
    ): Promise<DbTransaction | undefined> {
        const transaction = (await this.client.get(`/${serviceId}/transactions/${transactionId}`))
            .data.data;

        transaction.created_at = new Date(transaction.created_at.replace(' ', 'T'));
        transaction.updated_at = new Date(transaction.updated_at.replace(' ', 'T'));

        return transaction;
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-generowanie-transakcji
     */
    async createTransaction(
        serviceId: string,
        key: string,
        request: DbTransactionRequest,
    ): Promise<DbGenerationResponse | undefined> {
        request.signature = this.generateSignature(key, request);

        return (await this.client.post(`/${serviceId}/transactions`, request)).data;
    }

    /*
        https://docs.simpay.pl/shell/?shell#directbilling-generowanie-transakcji
     */
    checkNotification(key: string, body: DbNotificationRequest) {
        const signature = this.generateSignatureNotification(key, body);

        if (body.signature !== signature) return undefined;

        return body as DbNotificationRequest;
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
            request.steamid,
            key,
        ].filter((e) => e !== undefined && e !== null);

        return sha256(elements.join('|'));
    }

    generateSignatureNotification(key: string, request: DbNotificationRequest): string {
        const elements = [
            request.id,
            request.service_id,
            request.status,
            request.values?.net,
            request.values?.gross,
            request.values?.partner,
            request.returns?.complete,
            request.returns?.failure,
            request.control,
            request.number_from,
            request.provider,
            key,
        ].filter((e) => e !== undefined && e !== null);

        return sha256(elements.join('|'));
    }
}
