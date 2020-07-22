import { HttpService } from "../utils/http.service";
export declare class SmsXml extends HttpService {
    private apiKey;
    private static charset;
    private static params;
    private static codes;
    constructor(apiKey: string);
    checkParameters(map: any): boolean;
    generateCode(): string;
    getSmsValue(phone: string): number;
    generateXml(text: string): string;
    private sign;
    private random;
}
