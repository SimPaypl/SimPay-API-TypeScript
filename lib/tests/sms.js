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
const sms_1 = require("../payments/sms");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const sms = new sms_1.Sms('0b4dca15', '3eea38f407073ff0abff956b57d71783');
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-listy-uslug
    yield sms.getServices();
    yield sms.getServicesPaginated(1, 100);
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-informacji-o-usludze
    yield sms.getService(100);
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-listy-transakcji
    yield sms.getTransactions(100);
    yield sms.getTransactionsPaginated(100, 1, 100);
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-informacji-o-transakcji
    yield sms.getTransaction(100, 1000);
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-dostepnych-numerow-dla-uslugi
    yield sms.getServiceNumbers(100);
    yield sms.getServiceNumbersPaginated(100, 1, 100);
    // https://docs-new.simpay.pl/typescript/?typescript#sms-informacji-o-pojedynczym-numerze-uslugi
    yield sms.getServiceNumber(100, 7055);
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-wszystkich-dostepnych-numerow
    yield sms.getNumbers();
    yield sms.getNumbersPaginated(1, 100);
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-pojedynczego-numeru-sms
    yield sms.getNumber(7055);
    // https://docs-new.simpay.pl/typescript/?typescript#sms-weryfikacja-poprawnosci-kodu
    yield sms.verifySmsCode(100, 'XXXXXX', 7055);
    yield sms.verifySmsCode(100, 'XXXXXX');
});
// eslint-disable-next-line @typescript-eslint/no-empty-function
void run();
