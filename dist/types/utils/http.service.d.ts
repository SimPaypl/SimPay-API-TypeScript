export declare class HttpService {
    private static GET_IP_URL;
    sendJsonPost<T>(url: string, body: any): Promise<T>;
    sendFormPost<T>(url: string, body: any): Promise<T>;
    sendGet<T>(url: string): Promise<T>;
    getServersIp(): Promise<string[]>;
}
