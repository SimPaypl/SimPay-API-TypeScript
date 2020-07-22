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
const http_service_1 = require("../utils/http.service");
class Sms extends http_service_1.HttpService {
    constructor(apiKey, secret, serviceId = '') {
        super();
        this.apiKey = apiKey;
        this.secret = secret;
        this.serviceId = serviceId;
    }
    // https://docs.simpay.pl/#weryfikacja-kodu
    verifyCode(request) {
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
            return _super.sendJsonPost.call(this, Sms.VERIFY_CODE_URL, { params: request });
        });
    }
    // https://docs.simpay.pl/#pobieranie-listy-uslug
    getServiceList(request) {
        const _super = Object.create(null, {
            sendJsonPost: { get: () => super.sendJsonPost }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.key)
                request.key = this.apiKey;
            if (!request.secret)
                request.secret = this.secret;
            return _super.sendJsonPost.call(this, Sms.SERVICE_LIST_URL, { params: request });
        });
    }
}
exports.Sms = Sms;
Sms.VERIFY_CODE_URL = 'https://simpay.pl/api/status';
Sms.SERVICE_LIST_URL = 'https://simpay.pl/api/get_services';
//# sourceMappingURL=sms.js.map