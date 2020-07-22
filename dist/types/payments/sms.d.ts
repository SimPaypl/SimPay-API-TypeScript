import { CodeVerifyRequest } from "../model/sms/requests/code.verify.request";
import { ServiceListRequest } from "../model/sms/requests/service.list.request";
import { ApiResponse } from "../model/generic/api.response";
import { CodeVerifyResponse } from "../model/sms/response/code.verify.response";
import { SmsServiceResponse } from "../model/sms/response/sms.service.response";
import { HttpService } from "../utils/http.service";
export declare class Sms extends HttpService {
    private apiKey;
    private secret;
    private serviceId;
    private static VERIFY_CODE_URL;
    private static SERVICE_LIST_URL;
    constructor(apiKey: string, secret: string, serviceId?: string);
    verifyCode(request: Partial<CodeVerifyRequest>): Promise<ApiResponse<CodeVerifyResponse>>;
    getServiceList(request: Partial<ServiceListRequest>): Promise<ApiResponse<SmsServiceResponse>>;
}
