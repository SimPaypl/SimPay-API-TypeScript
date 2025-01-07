import { sha256 } from '../lib/hashing.js';

const charset = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
const params = ['send_number', 'sms_text', 'sms_from', 'sms_id', 'sign'] as const;

type ParamsSMS = {
    [T in (typeof params)[number]]: string | number;
} & {
    send_time?: string;
};

const codes = {
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
} as const;

type Codes = keyof typeof codes;

export class SmsXml {
    constructor(private apiKey: string) {}

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#smsxml-odbieranie-informacji-o-sms
     */
    checkParameters(map: ParamsSMS): boolean {
        for (const param of params) {
            if (!map[param]) return false;
        }

        return map.sign === this.sign(map);
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#smsxml-odbieranie-informacji-o-sms
     */
    generateCode(): string {
        let result = '';

        for (let i = 0; i < 6; i++) {
            result += charset.charAt(this.random(0, charset.length));
        }

        return result;
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#smsxml-odbieranie-informacji-o-sms
     */
    getSmsValue(phone: Codes): number {
        return codes[phone];
    }

    /*
        https://docs.simpay.pl/pl/typescript/?typescript#smsxml-odbieranie-informacji-o-sms
     */
    generateXml(text: string) {
        return `<?xml version="1.0" encoding="UTF-8"?><sms-response>${text.normalize('NFKD')}<sms-text></sms-text></sms-response>`;
    }

    private sign(map: ParamsSMS) {
        return sha256(
            `${map.sms_id}${map.sms_text}${map.sms_from}${map.send_number}${map.send_time}${this.apiKey}`,
        );
    }

    private random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
}
