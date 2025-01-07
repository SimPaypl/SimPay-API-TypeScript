enum TransactionStatus {
    NEW = 'transaction_new',
    CONFIRMED = 'transaction_confirmed',
    GENERATED = 'transaction_generated',
    PAID = 'transaction_paid',
    FAILED = 'transaction_failed',
    EXPIRED = 'transaction_expired',
    CANCELED = 'transaction_canceled',
    REFUNDED = 'transaction_refunded',
}

export type { TransactionStatus };
