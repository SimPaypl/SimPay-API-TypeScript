import axios, { type AxiosInstance } from 'axios';
import { sha256 } from '../lib/hashing.js';
import type { TransactionNotification } from '../models/payment/transaction/transaction-notification.js';
import type { TransactionRequest } from '../models/payment/transaction/transaction-request.js';

export { Payment };

class Payment {
    private readonly client: AxiosInstance;

    constructor(
        private readonly key: string,
        private readonly password: string,
    ) {
        this.client = axios.create({
            baseURL: 'https://api.simpay.pl/payment',
            headers: {
                Authorization: `Bearer ${this.key}`,
            },
        });
    }

    // Generating transaction
    // https://docs.simpay.pl/#tag/Payment/operation/paymentTransactionCreate
    public async createTransaction(serviceId: string, request: TransactionRequest): Promise<any> {
        try {
            const response = await this.client.post(`/${serviceId}/transactions`, request);
            return response.data;
        } catch (error) {
            console.error('Error creating transaction:', error);
            throw error;
        }
    }

    // Receive transaction details (Webhook)
    // https://docs.simpay.pl/#tag/Payment/operation/paymentTransactionNotification
    public verifyNotification(key: string, body: TransactionNotification): boolean {
        const generatedSignature = this.generateSignatureNotification(key, body);
        return body.signature === generatedSignature;
    }

    // Generate signature for webhook
    private generateSignatureNotification(key: string, request: TransactionNotification): string {
        const joinedElements = [
            request.id,
            request.service_id,
            request.status,
            request.amount.value,
            request.amount.currency,
            request.amount.commission,
            request.control,
            request.channel,
            request.environment,
            request.originalAmount.value,
            request.originalAmount.currency,
            request.originalAmount.rate,
            key,
        ]
            .filter((e) => e !== undefined && e !== null)
            .join('|');

        return sha256(joinedElements);
    }

    // Get transaction details
    // https://docs.simpay.pl/#tag/Payment/operation/paymentGetTransaction
    public getTransactionDetails(serviceId: string, transactionId: string): Promise<any> {
        return this.client.get(`/${serviceId}/transactions/${transactionId}`);
    }
}
