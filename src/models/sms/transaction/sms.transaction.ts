export interface SmsTransaction {
    id: number;

    from: number;
    code: string;

    used: boolean;
    send_number?: number;

    value?: number;

    send_at: Date;
}