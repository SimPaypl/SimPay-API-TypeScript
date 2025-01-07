interface TransactionRequest {
    amount: number;
    currency?: string;
    description?: string;
    control?: string;
    customer?: object;
    antifraud?: object;
    billing?: object;
    shipping?: object;
    cart?: object[];
    returns?: {
        success: string;
        failure: string;
    };
    directChannel?: string;
    channels?: string[];
    channelTypes?: object;
    referer?: string;
    signature?: string;
}

export type { TransactionRequest };
