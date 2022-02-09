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
const directbilling_1 = require("./payments/directbilling");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = new directbilling_1.DirectBilling('0b4dca15', '3eea38f407073ff0abff956b57d71783');
    /*
        const transaction = await db.createTransaction(3549, 'iVjvIqZuw967Ntda', {
            amount: 100
        }); */
    console.log(yield db.getService(158));
});
// eslint-disable-next-line @typescript-eslint/no-empty-function
void run();
