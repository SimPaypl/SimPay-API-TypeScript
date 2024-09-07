import { DirectBilling } from '../src/payments/directbilling.js';
import { AmountType } from '../src/models/amount.type.js';

async function directBillingTests() {
    const db = new DirectBilling('0b4dca15', '3eea38f407073ff0abff956b57d71783');

    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-listy-uslug
    console.log(await db.getServices());
    console.log(await db.getServicesPaginated(1, 100));

    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-informacji-o-usludze
    console.log(await db.getService('19f3b33c'));

    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-kalkulacja-prowizji
    console.log(await db.calculateCommission('19f3b33c', 10.0));

    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-listy-transakcji
    const transactionsList = await db.getTransactions('19f3b33c');

    console.log(transactionsList);

    console.log(await db.getTransactionsPaginated('19f3b33c', 1, 100));

    const transactionId = transactionsList?.[0]?.id;

    if(!transactionId) {
        throw new Error('No transactions found');
    }
    else {

    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-informacji-o-transakcji
    console.log(await db.getTransaction('19f3b33c', transactionId));
    }

    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-generowanie-transakcji
    console.log(
        await db.createTransaction('19f3b33c', 'key', {
            amount: 10.0,
            amountType: AmountType.GROSS,
            control: 'test',
        }),
    );

    console.log(db.checkNotification('key', {}));
};

export { directBillingTests };
