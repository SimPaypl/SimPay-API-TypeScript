import { directBillingTests } from './directbilling.js';
import { smsTests } from './sms.js';

async function run() {
    await directBillingTests();
    await smsTests();
}

run();