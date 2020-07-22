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
const hashing_1 = require("../utils/hashing");
const http_service_1 = require("../utils/http.service");
class DirectBilling extends http_service_1.HttpService {
    constructor(apiKey, secret, debugMode = false, serviceId = '') {
        super();
        this.apiKey = apiKey;
        this.secret = secret;
        this.debugMode = debugMode;
        this.serviceId = serviceId;
    }
    // https://docs.simpay.pl/#generowanie-transakcji
    generateTransaction(request) {
        const _super = Object.create(null, {
            sendFormPost: { get: () => super.sendFormPost }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let key = this.apiKey;
            if (!request.serviceId)
                request.serviceId = this.serviceId;
            if (request.apiKey) {
                key = request.apiKey;
                request.apiKey = undefined;
            }
            let amount = '';
            if (request.amount)
                amount = request.amount;
            if (request.amount_gross)
                amount = request.amount_gross;
            if (request.amount_required)
                amount = request.amount_required;
            request.sign = hashing_1.Hashing.sha256(this.serviceId + "" + +amount + "" + request.control + "" + key).toLowerCase();
            return _super.sendFormPost.call(this, DirectBilling.API_URL, request);
        });
    }
    // https://docs.simpay.pl/#pobieranie-danych-o-transakcji
    getTransaction(request) {
        const _super = Object.create(null, {
            sendJsonPost: { get: () => super.sendJsonPost }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.key)
                request.key = this.apiKey;
            if (!request.secret)
                request.secret = this.secret;
            return _super.sendJsonPost.call(this, DirectBilling.TRANSACTION_STATUS_URL, { params: request });
        });
    }
    // https://docs.simpay.pl/#pobieranie-listy-uslug-dcb
    getServices(request) {
        const _super = Object.create(null, {
            sendJsonPost: { get: () => super.sendJsonPost }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.key)
                request.key = this.apiKey;
            if (!request.secret)
                request.secret = this.secret;
            return _super.sendJsonPost.call(this, DirectBilling.SERVICES_LIST_URL, { params: request });
        });
    }
    // https://docs.simpay.pl/#pobieranie-maksymalnych-kwot-transakcji
    getTransactionLimits(request) {
        const _super = Object.create(null, {
            sendJsonPost: { get: () => super.sendJsonPost }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.key)
                request.key = this.apiKey;
            if (!request.secret)
                request.secret = this.secret;
            if (!request.service_id)
                request.service_id = this.serviceId;
            return _super.sendJsonPost.call(this, DirectBilling.TRANSACTION_LIMITS_URL, { params: request });
        });
    }
    // https://docs.simpay.pl/#pobieranie-prowizji-dla-uslugi
    getServiceCommission(request) {
        const _super = Object.create(null, {
            sendJsonPost: { get: () => super.sendJsonPost }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.key)
                request.key = this.apiKey;
            if (!request.secret)
                request.secret = this.secret;
            if (!request.service_id)
                request.service_id = this.serviceId;
            return _super.sendJsonPost.call(this, DirectBilling.SERVICE_COMMISSION_URL, { params: request });
        });
    }
    // https://docs.simpay.pl/#odbieranie-transakcji
    sign(id, status, valuenet, valuepartner, control) {
        return hashing_1.Hashing.sha256(id + status + valuenet + valuepartner + control + this.apiKey).toLowerCase();
    }
}
exports.DirectBilling = DirectBilling;
DirectBilling.API_URL = 'https://simpay.pl/db/api';
DirectBilling.TRANSACTION_STATUS_URL = 'https://simpay.pl/api/db_status';
DirectBilling.SERVICES_LIST_URL = 'https://simpay.pl/api/get_services_db';
DirectBilling.TRANSACTION_LIMITS_URL = 'https://simpay.pl/api/db_hosts';
DirectBilling.SERVICE_COMMISSION_URL = 'https://simpay.pl/api/db_hosts_commission';
//# sourceMappingURL=direct.billing.js.map