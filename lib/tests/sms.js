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
    console.log(yield sms.getServices());
    console.log(yield sms.getServicesPaginated(1, 100));
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-informacji-o-usludze
    console.log(yield sms.getService(3549));
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-listy-transakcji
    console.log(yield sms.getTransactions(3549));
    console.log(yield sms.getTransactionsPaginated(3549, 1, 100));
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-informacji-o-transakcji
    console.log(yield sms.getTransaction(3549, 2216609));
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-dostepnych-numerow-dla-uslugi
    console.log(yield sms.getServiceNumbers(3549));
    console.log(yield sms.getServiceNumbersPaginated(3549, 1, 100));
    // https://docs-new.simpay.pl/typescript/?typescript#sms-informacji-o-pojedynczym-numerze-uslugi
    console.log(yield sms.getServiceNumber(3549, 7055));
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-wszystkich-dostepnych-numerow
    console.log(yield sms.getNumbers());
    console.log(yield sms.getNumbersPaginated(1, 100));
    // https://docs-new.simpay.pl/typescript/?typescript#sms-pobieranie-pojedynczego-numeru-sms
    console.log(yield sms.getNumber(7055));
    // https://docs-new.simpay.pl/typescript/?typescript#sms-weryfikacja-poprawnosci-kodu
    console.log(yield sms.verifySmsCode(3549, '81FFC5', 7055));
    console.log(yield sms.verifySmsCode(3549, '81FFC5'));
});
// eslint-disable-next-line @typescript-eslint/no-empty-function
void run();
