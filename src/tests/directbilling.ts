import {DirectBilling} from '../payments/directbilling';
import {AmountType} from '../models/amount.type';

const run = async () => {
    const db = new DirectBilling('0b4dca15', '3eea38f407073ff0abff956b57d71783');
    
    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-listy-uslug
    console.log( await db.getServices() );
    console.log( await db.getServicesPaginated(1, 100) );

    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-informacji-o-usludze
    console.log( await db.getService(158) );

    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-kalkulacja-prowizji
    console.log( await db.calculateCommission(158, 10.00) );

    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-listy-transakcji
    const transactionsList = await db.getTransactions(158);

    console.log( transactionsList );

    console.log( await db.getTransactionsPaginated(158, 1, 100) );

    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-pobieranie-informacji-o-transakcji
    console.log( await db.getTransaction(158, transactionsList?.[ 0 ].id) );

    // https://docs.simpay.pl/pl/typescript/?typescript#directbilling-generowanie-transakcji
    console.log( await db.createTransaction(158, 'key', {
        amount: 10.00,
        amountType: AmountType.GROSS,
        control: 'test'
    }));

    console.log( await db.checkNotification('key', {}));
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
void run();