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
exports.DirectBilling = void 0;
const axios_1 = require("axios");
const hashing_1 = require("../lib/hashing");
class DirectBilling {
    constructor(key, password) {
        this.key = key;
        this.password = password;
        this.client = axios_1.default.create({
            baseURL: 'https://api.simpay.pl/directbilling',
            headers: {
                'X-SIM-KEY': this.key,
                'X-SIM-PASSWORD': this.password,
                'X-SIM-VERSION': '2.2.2',
                'X-SIM-PLATFORM': 'TYPESCRIPT',
            }
        });
    }
    /*
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-listy-uslug
     */
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            let response = yield this.client.get('/');
            result.push(...response.data.data);
            while (response.data.pagination.links.next_page !== null) {
                response = yield this.client.get(`/?page=${+response.data.pagination.current_page + 1}`);
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
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-informacji-o-usludze
     */
    getService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = (yield this.client.get(`/${id}`)).data.data;
                service.created_at = new Date(service.created_at.replace(' ', 'T'));
                return service;
            }
            catch (e) {
                return undefined;
            }
        });
    }
    /*
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-kalkulacja-prowizji
     */
    calculateCommission(serviceId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.client.get(`/${serviceId}/calculate?amount=${amount}`)).data.data;
        });
    }
    /*
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-listy-transakcji
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
                e.created_at = new Date(e.created_at.replace(' ', 'T'));
                e.updated_at = new Date(e.updated_at.replace(' ', 'T'));
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
                e.created_at = new Date(e.created_at.replace(' ', 'T'));
                e.updated_at = new Date(e.updated_at.replace(' ', 'T'));
                return e;
            });
            return response;
        });
    }
    /*
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-informacji-o-transakcji
     */
    getTransaction(serviceId, transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = (yield this.client.get(`/${serviceId}/transactions/${transactionId}`)).data.data;
            transaction.created_at = new Date(transaction.created_at.replace(' ', 'T'));
            transaction.updated_at = new Date(transaction.updated_at.replace(' ', 'T'));
            return transaction;
        });
    }
    /*
        https://docs.simpay.pl/pl/typescript/?typescript#directbilling-generowanie-transakcji
     */
    createTransaction(serviceId, key, request) {
        return __awaiter(this, void 0, void 0, function* () {
            request.signature = this.generateSignature(key, request);
            return (yield this.client.post(`/${serviceId}/transactions`, request)).data;
        });
    }
    /*
        https://docs.simpay.pl/shell/?shell#directbilling-generowanie-transakcji
     */
    checkNotification(key, body) {
        const signature = this.generateSignatureNotification(key, body);
        if (body.signature !== signature)
            return undefined;
        return body;
    }
    /*
        https://docs.simpay.pl/shell/?shell#directbilling-generowanie-transakcji
     */
    generateSignature(key, request) {
        var _a, _b;
        const elements = [
            request.amount,
            request.amountType,
            request.description,
            request.control,
            (_a = request.returns) === null || _a === void 0 ? void 0 : _a.success,
            (_b = request.returns) === null || _b === void 0 ? void 0 : _b.failure,
            request.phoneNumber,
            key
        ].filter(e => e !== undefined && e !== null);
        return hashing_1.Hashing.sha256(elements.join('|'));
    }
    generateSignatureNotification(key, request) {
        var _a, _b, _c, _d, _e;
        const elements = [
            request.id,
            request.service_id,
            request.status,
            (_a = request.values) === null || _a === void 0 ? void 0 : _a.net,
            (_b = request.values) === null || _b === void 0 ? void 0 : _b.gross,
            (_c = request.values) === null || _c === void 0 ? void 0 : _c.partner,
            (_d = request.returns) === null || _d === void 0 ? void 0 : _d.success,
            (_e = request.returns) === null || _e === void 0 ? void 0 : _e.failure,
            request.control,
            request.number_from,
            request.provider,
            key
        ].filter(e => e !== undefined && e !== null);
        return hashing_1.Hashing.sha256(elements.join('|'));
    }
}
exports.DirectBilling = DirectBilling;
