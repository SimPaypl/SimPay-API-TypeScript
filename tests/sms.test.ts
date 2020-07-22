import {Sms} from "../src/payments/sms";

const sms = new Sms("XXXXXXXX", "XXXXXXXXXXXXXXXXX", "XXXX");

const testVerifyCode = async () => {
    const request = {
        number: "7055",
        code: "4C5ZFE",
        service_id: "3487"
    };

    const res = await sms.verifyCode(request);
    console.log(res);
}

const testGetServiceList = async () => {
    const res = await sms.getServiceList({});
    console.log(res);
}

const testGetServersIp = async () => {
    const res = await sms.getServersIp();
    console.log(res);
}

const run = async () => {
    console.log("testVerifyCode");
    await testVerifyCode();

    console.log("testGetServiceList");
    await testGetServiceList();

    console.log("testGetServersIp");
    await testGetServersIp();
}

run();
