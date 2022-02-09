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
const directbilling_1 = require("../payments/directbilling");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = new directbilling_1.DirectBilling('0b4dca15', '3eea38f407073ff0abff956b57d71783');
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-pobieranie-listy-uslug
    yield db.getServices();
    yield db.getServicesPaginated(1, 100);
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-pobieranie-informacji-o-usludze
    yield db.getService(100);
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-kalkulacja-prowizji
    yield db.calculateCommission(100, 10.00);
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-pobieranie-listy-transakcji
    yield db.getTransactions(100);
    yield db.getTransactionsPaginated(100, 1, 100);
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-pobieranie-informacji-o-transakcji
    yield db.getTransactions(100);
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-generowanie-transakcji
    yield db.createTransaction(100, 'KEY', {
        amount: 10.00,
        control: ''
    });
    yield db.checkNotification('key', {});
});
// eslint-disable-next-line @typescript-eslint/no-empty-function
void run();
