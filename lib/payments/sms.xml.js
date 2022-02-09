"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsXml = void 0;
const hashing_1 = require("../lib/hashing");
class SmsXml {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    /*
        https://docs-new.simpay.pl/typescript/?typescript#smsxml-odbieranie-informacji-o-sms
     */
    checkParameters(map) {
        for (const param of SmsXml.params) {
            if (!map[param])
                return false;
        }
        return map.sign === this.sign(map);
    }
    /*
        https://docs-new.simpay.pl/typescript/?typescript#smsxml-odbieranie-informacji-o-sms
     */
    generateCode() {
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += SmsXml.charset.charAt(this.random(0, SmsXml.charset.length));
        }
        return result;
    }
    /*
        https://docs-new.simpay.pl/typescript/?typescript#smsxml-odbieranie-informacji-o-sms
     */
    getSmsValue(phone) {
        return SmsXml.codes[phone];
    }
    /*
        https://docs-new.simpay.pl/typescript/?typescript#smsxml-odbieranie-informacji-o-sms
     */
    generateXml(text) {
        return `<?xml version="1.0" encoding="UTF-8"?><sms-response>${text.normalize('NFKD')}<sms-text></sms-text></sms-response>`;
    }
    sign(map) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return hashing_1.Hashing.sha256(`${map.sms_id}${map.sms_text}${map.sms_from}${map.send_number}${map.send_time}${this.apiKey}`);
    }
    random(min, max) {
        return Math.random() * (max - min) + min;
    }
}
exports.SmsXml = SmsXml;
SmsXml.charset = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
SmsXml.params = ['send_number', 'sms_text', 'sms_from', 'sms_id', 'sign'];
SmsXml.codes = {
    '7055': 0.25,
    '7136': 0.5,
    '7255': 1.0,
    '7355': 1.5,
    '7455': 2.0,
    '7555': 2.5,
    '7636': 3.0,
    '77464': 3.5,
    '78464': 4.0,
    '7936': 4.5,
    '91055': 5.0,
    '91155': 5.5,
    '91455': 7.0,
    '91664': 8.0,
    '91955': 9.5,
    '92055': 10.0,
    '92555': 12.5,
    '70908': 0.25,
    '71908': 0.5,
    '72998': 1,
    '73908': 1.5,
    '75908': 2.5,
    '76908': 3,
    '79908': 4.5,
    '91998': 9.5,
    '92598': 12.5,
};
