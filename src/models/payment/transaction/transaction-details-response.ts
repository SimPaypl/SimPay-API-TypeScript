export interface TransactionDetailsResponse {
    success: boolean;
    data: Data;
}

export interface Data {
    id: string;
    status: string;
    amount: Amount;
    channel: string;
    control: string;
    description: string;
    redirects: Redirects;
    customer: Customer;
    billing: Ing;
    shipping: Ing;
    cart: null;
    paid_at: Date;
    expires_at: string;
    created_at: string;
    updated_at: Date;
}

export interface Amount {
    value: number;
    currency: string;
    commission: number;
}

export interface Ing {
    name: string;
    surname: string;
    street: string;
    building: string;
    flat: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    company: string;
}

export interface Customer {
    name: string;
    email: string;
}

export interface Redirects {
    success: string;
    failure: string;
}
