import {DbGenerateRequest} from "../model/db/requests/db.generate.request";
import {ApiResponse} from "../model/generic/api.response";
import {DbTransaction} from "../model/db/db.transaction";
import {DbTransactionRequest} from "../model/db/requests/db.transaction.request";
import {DbServicesListRequest} from "../model/db/requests/db.services.list.request";
import {DbServicesListResponse} from "../model/db/response/db.services.list.response";
import {DbTransactionLimit} from "../model/db/db.transaction.limit";
import {DbTransactionLimitsRequest} from "../model/db/requests/db.transaction.limits.request";
import {DbServiceCommissionRequest} from "../model/db/requests/db.service.commission.request";
import {DbCommission} from "../model/db/db.commission";
import {Hashing} from "../utils/hashing";
import {HttpService} from "../utils/http.service";
import {DbGenerateResponse} from "../model/db/response/db.generate.response";

export class DirectBilling extends HttpService {
    private static API_URL: string = 'https://simpay.pl/db/api';
    private static TRANSACTION_STATUS_URL: string = 'https://simpay.pl/api/db_status';
    private static SERVICES_LIST_URL: string = 'https://simpay.pl/api/get_services_db';
    private static TRANSACTION_LIMITS_URL: string = 'https://simpay.pl/api/db_hosts';
    private static SERVICE_COMMISSION_URL: string = 'https://simpay.pl/api/db_hosts_commission';

    constructor(public apiKey: string,
                public secret: string,
                public debugMode: boolean = false,
                public serviceId: string = '') {
        super();
    }

    // https://docs.simpay.pl/#generowanie-transakcji
    async generateTransaction(request: Partial<DbGenerateRequest>): Promise<ApiResponse<DbGenerateResponse>> {
        let key = this.apiKey;

        if (!request.serviceId) request.serviceId = this.serviceId;

        if (request.apiKey) {
            key = request.apiKey;
            request.apiKey = undefined;
        }

        let amount: string = '';

        if (request.amount) amount = request.amount;
        if (request.amount_gross) amount = request.amount_gross;
        if (request.amount_required) amount = request.amount_required;

        request.sign = Hashing.sha256(this.serviceId + "" + +amount + "" + request.control + "" + key).toLowerCase();

        return super.sendFormPost<ApiResponse<DbGenerateResponse>>(DirectBilling.API_URL, request);
    }

    // https://docs.simpay.pl/#pobieranie-danych-o-transakcji
    async getTransaction(request: Partial<DbTransactionRequest>): Promise<ApiResponse<DbTransaction>> {
        if (!request.key) request.key = this.apiKey;
        if (!request.secret) request.secret = this.secret;

        return super.sendJsonPost(DirectBilling.TRANSACTION_STATUS_URL, {params: request});
    }

    // https://docs.simpay.pl/#pobieranie-listy-uslug-dcb
    async getServices(request: Partial<DbServicesListRequest>): Promise<ApiResponse<DbServicesListResponse>> {
        if (!request.key) request.key = this.apiKey;
        if (!request.secret) request.secret = this.secret;

        return super.sendJsonPost(DirectBilling.SERVICES_LIST_URL, {params: request});
    }

    // https://docs.simpay.pl/#pobieranie-maksymalnych-kwot-transakcji
    async getTransactionLimits(request: Partial<DbTransactionLimitsRequest>): Promise<ApiResponse<DbTransactionLimit[]>> {
        if (!request.key) request.key = this.apiKey;
        if (!request.secret) request.secret = this.secret;
        if (!request.service_id) request.service_id = this.serviceId;

        return super.sendJsonPost(DirectBilling.TRANSACTION_LIMITS_URL, {params: request});
    }

    // https://docs.simpay.pl/#pobieranie-prowizji-dla-uslugi
    async getServiceCommission(request: Partial<DbServiceCommissionRequest>): Promise<ApiResponse<DbCommission[]>> {
        if (!request.key) request.key = this.apiKey;
        if (!request.secret) request.secret = this.secret;
        if (!request.service_id) request.service_id = this.serviceId;

        return super.sendJsonPost(DirectBilling.SERVICE_COMMISSION_URL, {params: request});
    }

    // https://docs.simpay.pl/#odbieranie-transakcji
    private sign(id: number, status: string, valuenet: string, valuepartner: string, control: string): string {
        return Hashing.sha256(id + status + valuenet + valuepartner + control + this.apiKey).toLowerCase();
    }
}
