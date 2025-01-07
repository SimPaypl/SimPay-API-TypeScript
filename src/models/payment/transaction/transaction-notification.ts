interface TransactionNotification {
    id: string;
    service_id: string;
    status: string;
    amount: {
        value: number;
        currency: string;
        commission: number;
    };
    control: string;
    channel: string;
    environment: string;
    originalAmount: {
        value: number;
        currency: string;
        rate: number;
    };
    signature: string;
}

export type { TransactionNotification };
