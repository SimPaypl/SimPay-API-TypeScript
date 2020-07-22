import {DirectBilling} from "../src/payments/direct.billing";
import {DbGenerateRequest} from "../src/model/db/requests/db.generate.request";

const db = new DirectBilling("XXXXXXX", "XXXXXXX", true, "XXXX");

const testGetServices = async () => {
    const res = await db.getServices({});
    console.log(res);
}

const testGetTransactionLimits = async () => {
    const res = await db.getTransactionLimits({});
    console.log(res);
}

const testGetServiceCommission = async () => {
    const res = await db.getServiceCommission({});
    console.log(res);
}

const testGetServersIp = async () => {
    const res = await db.getServersIp();
    console.log(res);
}

const testGenerateTransaction = async () => {
    const req: Partial<DbGenerateRequest> = {
        control: "XXXXX",
        amount: "12.50",
        apiKey: "XXXXXXXXX"
    };

    const res = await db.generateTransaction(req);

    console.log(res);
}

const testGetTransaction = async () => {
    const req = {
        id: "XXXXXXXXXXXXXXX"
    };

    const res = await db.getTransaction(req);

    console.log(res);
}

const run = async () => {
    /*
    console.log("testGetServices");
    await testGetServices();

    console.log("testGetTransactionLimits");
    await testGetTransactionLimits();

    console.log("testGetServiceCommission");
    await testGetServiceCommission();

    console.log("testGetServersIp");
    await testGetServersIp();

     */
    console.log("testGenerateTransaction");
    await testGenerateTransaction();

    console.log("testGetTransaction");
    await testGetTransaction();
}

run();
