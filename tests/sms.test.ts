import { describe, test, expect } from 'vitest';
import { Sms } from '../src/payments/sms.js';

describe('SMS Tests', () => {
    const sms = new Sms('0b4dca15', '3eea38f407073ff0abff956b57d71783');

    test('Get services', async () => {
        const services = await sms.getServices();
        expect(services).toBeDefined();
        expect(Array.isArray(services)).toBe(true);
        console.log('Services:', services);
    });

    test('Get services paginated', async () => {
        const paginatedServices = await sms.getServicesPaginated(1, 100);
        expect(paginatedServices).toBeDefined();
        expect(paginatedServices.data).toBeDefined();
        console.log('Paginated Services:', paginatedServices);
    });

    test('Get service information', async () => {
        const service = await sms.getService('d151e4f9');
        expect(service).toBeDefined();
        console.log('Service Information:', service);
    });

    test('Get transactions list', async () => {
        const transactions = await sms.getTransactions('d151e4f9');
        expect(transactions).toBeDefined();
        expect(Array.isArray(transactions)).toBe(true);
        console.log('Transactions:', transactions);
    });

    test('Get transactions paginated', async () => {
        const paginatedTransactions = await sms.getTransactionsPaginated('d151e4f9', 1, 100);
        expect(paginatedTransactions).toBeDefined();
        expect(paginatedTransactions.data).toBeDefined();
        console.log('Paginated Transactions:', paginatedTransactions);
    });

    test('Get transaction information', async () => {
        const transaction = await sms.getTransaction('d151e4f9', 2216609);
        expect(transaction).toBeDefined();
        console.log('Transaction Information:', transaction);
    });

    test('Get service numbers', async () => {
        const serviceNumbers = await sms.getServiceNumbers('d151e4f9');
        expect(serviceNumbers).toBeDefined();
        expect(Array.isArray(serviceNumbers)).toBe(true);
        console.log('Service Numbers:', serviceNumbers);
    });

    test('Get service numbers paginated', async () => {
        const paginatedServiceNumbers = await sms.getServiceNumbersPaginated('d151e4f9', 1, 100);
        expect(paginatedServiceNumbers).toBeDefined();
        expect(paginatedServiceNumbers.data).toBeDefined();
        console.log('Paginated Service Numbers:', paginatedServiceNumbers);
    });

    test('Get single service number', async () => {
        const serviceNumber = await sms.getServiceNumber('d151e4f9', 7055);
        expect(serviceNumber).toBeDefined();
        console.log('Single Service Number:', serviceNumber);
    });

    test('Get all available numbers', async () => {
        const numbers = await sms.getNumbers();
        expect(numbers).toBeDefined();
        expect(Array.isArray(numbers)).toBe(true);
        console.log('All Available Numbers:', numbers);
    });

    test('Get all available numbers paginated', async () => {
        const paginatedNumbers = await sms.getNumbersPaginated(1, 100);
        expect(paginatedNumbers).toBeDefined();
        expect(paginatedNumbers.data).toBeDefined();
        console.log('Paginated Numbers:', paginatedNumbers);
    });

    test('Get single number details', async () => {
        const number = await sms.getNumber(7055);
        expect(number).toBeDefined();
        console.log('Single Number Details:', number);
    });

    test('Verify SMS code with service number', async () => {
        const verification = await sms.verifySmsCode('d151e4f9', '81FFC5', 7055);
        expect(verification).toBeDefined();
        console.log('SMS Code Verification with Number:', verification);
    });

    test('Verify SMS code without service number', async () => {
        const verification = await sms.verifySmsCode('d151e4f9', '81FFC5');
        expect(verification).toBeDefined();
        console.log('SMS Code Verification without Number:', verification);
    });
});
