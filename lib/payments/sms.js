"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sms = void 0;
const axios_1 = require("axios");
class Sms {
    constructor(key, password) {
        this.key = key;
        this.password = password;
        this.client = axios_1.default.create({
            baseURL: 'https://api.simpay.pl/sms',
            headers: {
                'X-SIM-KEY': this.key,
                'X-SIM-PASSWORD': this.password,
            }
        });
    }
    /*
        https://docs.simpay.pl/typescript/?typescript#sms-pobieranie-listy-uslug
     */
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            let response = yield this.client.get('/');
            result.push(...response.data.data);
            while (response.data.pagination.links.next_page !== null) {
                response = yield this.client.get(`/?page=${response.data.pagination.current_page + 1}`);
                result.push(...response.data.data);
            }
            return result.map(e => {
                e.created_at = new Date(e.created_at.replace(' ', 'T'));
                return e;
            });
        });
    }
    getServicesPaginated(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (page)
                query.page = `${page}`;
            if (pageSize)
                query.limit = `${pageSize}`;
            const url = `/?${new URLSearchParams(query).toString()}`;
            const response = (yield this.client.get(url)).data;
            response.data = response.data.map((e) => {
                e.created_at = new Date(e.created_at.replace(' ', 'T'));
                return e;
            });
            return response;
        });
    }
    /*
        https://docs.simpay.pl/typescript/?typescript#sms-pobieranie-informacji-o-usludze
     */
    getService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = (yield this.client.get(`/${id}`)).data.data;
            service.created_at = new Date(service.created_at.replace(' ', 'T'));
            return service;
        });
    }
    /*
        https://docs.simpay.pl/typescript/?typescript#sms-pobieranie-listy-transakcji
     */
    getTransactions(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            let response = yield this.client.get(`/${serviceId}/transactions`);
            result.push(...response.data.data);
            while (response.data.pagination.links.next_page !== null) {
                response = yield this.client.get(`/${serviceId}/transactions?page=${response.data.pagination.current_page + 1}`);
                result.push(...response.data.data);
            }
            return result.map(e => {
                e.send_at = new Date(e.send_at.replace(' ', 'T'));
                return e;
            });
        });
    }
    getTransactionsPaginated(serviceId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (page)
                query.page = `${page}`;
            if (pageSize)
                query.limit = `${pageSize}`;
            const url = `/${serviceId}/transactions?${new URLSearchParams(query).toString()}`;
            const response = (yield this.client.get(url)).data;
            response.data = response.data.map((e) => {
                e.send_at = new Date(e.send_at.replace(' ', 'T'));
                return e;
            });
            return response;
        });
    }
    /*
        https://docs.simpay.pl/typescript/?typescript#sms-pobieranie-informacji-o-transakcji
     */
    getTransaction(serviceId, transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = (yield this.client.get(`/${serviceId}/transactions/${transactionId}`)).data.data;
            transaction.send_at = new Date(transaction.send_at.replace(' ', 'T'));
            return transaction;
        });
    }
    /*
        https://docs.simpay.pl/typescript/?typescript#sms-pobieranie-dostepnych-numerow-dla-uslugi
     */
    getServiceNumbers(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            let response = yield this.client.get(`/${serviceId}/numbers`);
            result.push(...response.data.data);
            while (response.data.pagination.links.next_page !== null) {
                response = yield this.client.get(`/${serviceId}/numbers?page=${response.data.pagination.current_page + 1}`);
                result.push(...response.data.data);
            }
            return result;
        });
    }
    getServiceNumbersPaginated(serviceId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (page)
                query.page = `${page}`;
            if (pageSize)
                query.limit = `${pageSize}`;
            const url = `/${serviceId}/numbers?${new URLSearchParams(query).toString()}`;
            return (yield this.client.get(url)).data;
        });
    }
    /*
        https://docs.simpay.pl/typescript/?typescript#sms-informacji-o-pojedynczym-numerze-uslugi
     */
    getServiceNumber(serviceId, number) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.client.get(`/${serviceId}/numbers/${number}`)).data.data;
        });
    }
    /*
        https://docs.simpay.pl/typescript/?typescript#sms-pobieranie-wszystkich-dostepnych-numerow
     */
    getNumbers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            let response = yield this.client.get('/numbers');
            result.push(...response.data.data);
            while (response.data.pagination.links.next_page !== null) {
                response = yield this.client.get(`/numbers?page=${response.data.pagination.current_page + 1}`);
                result.push(...response.data.data);
            }
            return result;
        });
    }
    getNumbersPaginated(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (page)
                query.page = `${page}`;
            if (pageSize)
                query.limit = `${pageSize}`;
            const url = `/numbers?${new URLSearchParams(query).toString()}`;
            return (yield this.client.get(url)).data;
        });
    }
    /*
        https://docs.simpay.pl/typescript/?typescript#sms-pobieranie-pojedynczego-numeru-sms
     */
    getNumber(number) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.client.get(`/numbers/${number}`)).data.data;
        });
    }
    /*
        https://docs.simpay.pl/typescript/?typescript#sms-weryfikacja-poprawnosci-kodu
     */
    verifySmsCode(serviceId, code, number) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield this.client.post(`/${serviceId}`, { code, number })).data.data;
            response.used_at = new Date(response.used_at.replace(' ', 'T'));
            return response;
        });
    }
}
exports.Sms = Sms;
