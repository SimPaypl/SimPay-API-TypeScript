import { Sms } from '../src/payments/sms.js';

async function smsTests() {
    const sms = new Sms('0b4dca15', '3eea38f407073ff0abff956b57d71783');

    // https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-listy-uslug
    console.log(await sms.getServices());
    console.log(await sms.getServicesPaginated(1, 100));

    // https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-informacji-o-usludze
    console.log(await sms.getService('d151e4f9'));

    // https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-listy-transakcji
    console.log(await sms.getTransactions('d151e4f9'));
    console.log(await sms.getTransactionsPaginated('d151e4f9', 1, 100));

    // https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-informacji-o-transakcji
    console.log(await sms.getTransaction('d151e4f9', 2216609));

    // https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-dostepnych-numerow-dla-uslugi
    console.log(await sms.getServiceNumbers('d151e4f9'));
    console.log(await sms.getServiceNumbersPaginated('d151e4f9', 1, 100));

    // https://docs.simpay.pl/pl/typescript/?typescript#sms-informacji-o-pojedynczym-numerze-uslugi
    console.log(await sms.getServiceNumber('d151e4f9', 7055));

    // https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-wszystkich-dostepnych-numerow
    console.log(await sms.getNumbers());
    console.log(await sms.getNumbersPaginated(1, 100));

    // https://docs.simpay.pl/pl/typescript/?typescript#sms-pobieranie-pojedynczego-numeru-sms
    console.log(await sms.getNumber(7055));

    // https://docs.simpay.pl/pl/typescript/?typescript#sms-weryfikacja-poprawnosci-kodu
    console.log(await sms.verifySmsCode('d151e4f9', '81FFC5', 7055));
    console.log(await sms.verifySmsCode('d151e4f9', '81FFC5'));
};

export { smsTests };