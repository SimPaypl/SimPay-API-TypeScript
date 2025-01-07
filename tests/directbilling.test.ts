import { describe, test, expect } from 'vitest';
import { DirectBilling } from '../src/payments/directbilling.js';
import { AmountType } from '../src/models/amount.type.js';
import { DbTransactionStatus } from '../src/models/directbilling/transaction/db.transaction.status.js';

describe('DirectBilling Tests', () => {
    const db = new DirectBilling('0b4dca15', '3eea38f407073ff0abff956b57d71783');

    test('Get services', async () => {
        const services = await db.getServices();
        expect(services).toBeDefined();
        expect(Array.isArray(services)).toBe(true);
        console.log('Services:', services);
    });

    test('Get services paginated', async () => {
        const servicesPaginated = await db.getServicesPaginated(1, 100);
        expect(servicesPaginated).toBeDefined();
        expect(servicesPaginated.data).toBeDefined();
        console.log('Paginated Services:', servicesPaginated);
    });

    test('Get service information', async () => {
        const service = await db.getService('19f3b33c');
        expect(service).toBeDefined();
        console.log('Service Information:', service);
    });

    test('Calculate commission', async () => {
        const commission = await db.calculateCommission('19f3b33c', 10.0);
        expect(commission).toBeDefined();
        console.log('Commission:', commission);
    });

    test('Get transactions list', async () => {
        const transactions = await db.getTransactions('19f3b33c');
        expect(transactions).toBeDefined();
        expect(Array.isArray(transactions)).toBe(true);
        console.log('Transactions:', transactions);
    });

    test('Get transactions paginated', async () => {
        const transactionsPaginated = await db.getTransactionsPaginated('19f3b33c', 1, 100);
        expect(transactionsPaginated).toBeDefined();
        expect(transactionsPaginated.data).toBeDefined();
        console.log('Paginated Transactions:', transactionsPaginated);
    });

    test('Get transaction information', async () => {
        const transactions = await db.getTransactions('19f3b33c');
        const transactionId = transactions?.[0]?.id;

        if (!transactionId) {
            throw new Error('No transactions found');
        }

        const transaction = await db.getTransaction('19f3b33c', transactionId);
        expect(transaction).toBeDefined();
        console.log('Transaction Information:', transaction);
    });

    test('Create transaction', async () => {
        const transaction = await db.createTransaction('19f3b33c', 'key', {
            amount: 10.0,
            amountType: AmountType.GROSS,
            control: 'test',
        });
        expect(transaction).toBeDefined();
        console.log('Created Transaction:', transaction);
    });

    test('Check notification', () => {
        const notification = db.checkNotification('key', {
            id: '1',
            service_id: '1',
            status: DbTransactionStatus.TRANSACTION_DB_CONFIRMED,
            values: {
                net: 10.0,
                gross: 10.0,
                partner: 10.0,
            },
            returns: {
                success: 'success',
                complete: 'complete',
                failure: 'failure',
            },
            control: 'test',
            number_from: '1',
            provider: 1,
        });
        expect(notification).toBeUndefined(); // Assuming no notification is valid with empty input
        console.log('Notification Check:', notification);
    });
});
