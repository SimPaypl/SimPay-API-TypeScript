import got from "got";
import {ApiResponse} from "../model/generic/api.response";
import {IpResponse} from "../model/generic/ip.response";

export class HttpService {
    private static GET_IP_URL: string = 'https://simpay.pl/api/get_ip';

    sendJsonPost<T>(url :string, body :any) :Promise<T> {
        return got.post(url, {
            json: body
        }).json();
    }

    sendFormPost<T>(url :string, body :any) :Promise<T> {
        return got.post(url, {
            form: body
        }).json();
    }

    sendGet<T>(url: string) :Promise<T> {
        return got.get(url).json();
    }

    // https://docs.simpay.pl/#lista-ip-serwerow-simpay
    public async getServersIp(): Promise<string[]> {
        return (await this.sendGet<ApiResponse<IpResponse>>(HttpService.GET_IP_URL)).respond.ips;
    }
}
