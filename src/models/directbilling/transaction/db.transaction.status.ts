export enum DbTransactionStatus {
    TRANSACTION_DB_NEW = 'transaction_db_new',
    TRANSACTION_DB_CONFIRMED = 'transaction_db_confirmed',
    TRANSACTION_DB_REJECTED = 'transaction_db_rejected',
    TRANSACTION_DB_CANCELED = 'transaction_db_canceled',
    TRANSACTION_DB_PAYED = 'transaction_db_payed',
    TRANSACTION_DB_GENERATE_ERROR = 'transaction_db_generate_error'
}