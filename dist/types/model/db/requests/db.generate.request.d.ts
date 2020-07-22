import { Operator } from "../../generic/operator";
export interface DbGenerateRequest {
    serviceId: string;
    apiKey: string;
    control: string;
    complete: string;
    failure: string;
    amount: string;
    amount_gross: string;
    amount_required: string;
    provider: Operator;
    sign: string;
}
