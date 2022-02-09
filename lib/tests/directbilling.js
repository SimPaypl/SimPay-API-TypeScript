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
const amount_type_1 = require("../models/amount.type");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = new directbilling_1.DirectBilling('0b4dca15', '3eea38f407073ff0abff956b57d71783');
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-pobieranie-listy-uslug
    console.log(yield db.getServices());
    console.log(yield db.getServicesPaginated(1, 100));
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-pobieranie-informacji-o-usludze
    console.log(yield db.getService(158));
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-kalkulacja-prowizji
    console.log(yield db.calculateCommission(158, 10.00));
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-pobieranie-listy-transakcji
    console.log(yield db.getTransactions(158));
    console.log(yield db.getTransactionsPaginated(158, 1, 100));
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-pobieranie-informacji-o-transakcji
    console.log(yield db.getTransaction(158, 559911));
    // https://docs-new.simpay.pl/typescript/?typescript#directbilling-generowanie-transakcji
    console.log(yield db.createTransaction(158, 'key', {
        amount: 10.00,
        amountType: amount_type_1.AmountType.GROSS,
        control: 'test'
    }));
    console.log(yield db.checkNotification('key', {}));
});
// eslint-disable-next-line @typescript-eslint/no-empty-function
void run();
