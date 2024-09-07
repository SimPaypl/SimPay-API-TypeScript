import axios, { type AxiosInstance } from 'axios';
import type { PaginatedResponse } from '../models/response/paginated.response.js';
import type { SmsNumber } from '../models/sms/service/sms.number.js';
import type { SmsService } from '../models/sms/service/sms.service.js';
import type { SmsTransaction } from '../models/sms/transaction/sms.transaction.js';
import type { VerificationResponse } from '../models/sms/verification.response.js';

export class Sms {
    private readonly key: string;
    private readonly password: string;
    private readonly client: AxiosInstance;

    constructor(key: string, password: string) {
        this.key = key;
        this.password = password;

        this.client = axios.create({
            baseURL: 'https://api.simpay.pl/sms',
            headers: {
                'X-SIM-KEY': this.key,
                'X-SIM-PASSWORD': this.password,
                'X-SIM-VERSION': '2.2.2',
                'X-SIM-PLATFORM': 'TYPESCRIPT',
            },
        });
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-listy-uslug
     */
    async getServices(): Promise<SmsService[]> {
        const result = [];

        let response = await this.client.get('/');

        result.push(...response.data.data);

        while (response.data.pagination.links.next_page !== null) {
            response = await this.client.get(
                `/?page=${<number>response.data.pagination.current_page + 1}`,
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
    ): Promise<PaginatedResponse<SmsService>> {
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
        https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-informacji-o-usludze
     */
    async getService(id: string): Promise<SmsService | undefined> {
        const service = (await this.client.get(`/${id}`)).data.data;

        service.created_at = new Date(service.created_at.replace(' ', 'T'));

        return service;
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-listy-transakcji
     */
    async getTransactions(serviceId: string): Promise<SmsTransaction[]> {
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
            e.send_at = new Date(e.send_at.replace(' ', 'T'));

            return e;
        });
    }

    async getTransactionsPaginated(
        serviceId: string,
        page?: number,
        pageSize?: number,
    ): Promise<PaginatedResponse<SmsTransaction>> {
        const query: any = {};

        if (page) query.page = `${page}`;
        if (pageSize) query.limit = `${pageSize}`;

        const url = `/${serviceId}/transactions?${new URLSearchParams(query).toString()}`;

        const response = (await this.client.get(url)).data;

        response.data = response.data.map((e: any) => {
            e.send_at = new Date(e.send_at.replace(' ', 'T'));

            return e;
        });

        return response;
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-informacji-o-transakcji
     */
    async getTransaction(
        serviceId: string,
        transactionId: number,
    ): Promise<SmsTransaction | undefined> {
        const transaction = (await this.client.get(`/${serviceId}/transactions/${transactionId}`))
            .data.data;

        transaction.send_at = new Date(transaction.send_at.replace(' ', 'T'));

        return transaction;
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-dostepnych-numerow-dla-uslugi
     */
    async getServiceNumbers(serviceId: string): Promise<SmsNumber[]> {
        const result = [];

        let response = await this.client.get(`/${serviceId}/numbers`);

        result.push(...response.data.data);

        while (response.data.pagination.links.next_page !== null) {
            response = await this.client.get(
                `/${serviceId}/numbers?page=${<number>response.data.pagination.current_page + 1}`,
            );

            result.push(...response.data.data);
        }

        return result;
    }

    async getServiceNumbersPaginated(
        serviceId: string,
        page?: number,
        pageSize?: number,
    ): Promise<PaginatedResponse<SmsNumber>> {
        const query: any = {};

        if (page) query.page = `${page}`;
        if (pageSize) query.limit = `${pageSize}`;

        const url = `/${serviceId}/numbers?${new URLSearchParams(query).toString()}`;

        return (await this.client.get(url)).data;
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#sms-informacji-o-pojedynczym-numerze-uslugi
     */
    async getServiceNumber(serviceId: string, number: number): Promise<SmsNumber> {
        return (await this.client.get(`/${serviceId}/numbers/${number}`)).data.data;
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-wszystkich-dostepnych-numerow
     */
    async getNumbers(): Promise<SmsNumber[]> {
        const result = [];

        let response = await this.client.get('/numbers');

        result.push(...response.data.data);

        while (response.data.pagination.links.next_page !== null) {
            response = await this.client.get(
                `/numbers?page=${<number>response.data.pagination.current_page + 1}`,
            );

            result.push(...response.data.data);
        }

        return result;
    }

    async getNumbersPaginated(
        page?: number,
        pageSize?: number,
    ): Promise<PaginatedResponse<SmsNumber>> {
        const query: any = {};

        if (page) query.page = `${page}`;
        if (pageSize) query.limit = `${pageSize}`;

        const url = `/numbers?${new URLSearchParams(query).toString()}`;

        return (await this.client.get(url)).data;
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-pojedynczego-numeru-sms
     */
    async getNumber(number: number): Promise<SmsNumber | undefined> {
        return (await this.client.get(`/numbers/${number}`)).data.data;
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#sms-weryfikacja-poprawnosci-kodu
     */
    async verifySmsCode(
        serviceId: string,
        code: string,
        number?: number,
    ): Promise<VerificationResponse | undefined> {
        const response = (await this.client.post(`/${serviceId}`, { code, number })).data.data;

        if (response.used_at) {
            response.used_at = new Date(response.used_at.replace(' ', 'T'));
        }

        return response;
    }
}
