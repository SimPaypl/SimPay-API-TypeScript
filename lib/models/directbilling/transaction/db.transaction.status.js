"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbTransactionStatus = void 0;
var DbTransactionStatus;
(function (DbTransactionStatus) {
    DbTransactionStatus["TRANSACTION_DB_NEW"] = "transaction_db_new";
    DbTransactionStatus["TRANSACTION_DB_CONFIRMED"] = "transaction_db_confirmed";
    DbTransactionStatus["TRANSACTION_DB_REJECTED"] = "transaction_db_rejected";
    DbTransactionStatus["TRANSACTION_DB_CANCELED"] = "transaction_db_canceled";
    DbTransactionStatus["TRANSACTION_DB_PAYED"] = "transaction_db_payed";
    DbTransactionStatus["TRANSACTION_DB_GENERATE_ERROR"] = "transaction_db_generate_error";
})(DbTransactionStatus = exports.DbTransactionStatus || (exports.DbTransactionStatus = {}));
