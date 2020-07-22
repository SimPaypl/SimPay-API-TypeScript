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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const got_1 = __importDefault(require("got"));
class HttpService {
    sendJsonPost(url, body) {
        return got_1.default.post(url, {
            json: body
        }).json();
    }
    sendFormPost(url, body) {
        return got_1.default.post(url, {
            form: body
        }).json();
    }
    sendGet(url) {
        return got_1.default.get(url).json();
    }
    // https://docs.simpay.pl/#lista-ip-serwerow-simpay
    getServersIp() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.sendGet(HttpService.GET_IP_URL)).respond.ips;
        });
    }
}
exports.HttpService = HttpService;
HttpService.GET_IP_URL = 'https://simpay.pl/api/get_ip';
//# sourceMappingURL=http.service.js.map