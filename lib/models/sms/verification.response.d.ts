export interface VerificationResponse {
    used: boolean;
    code: string;
    test: boolean;
    from: number;
    number: number;
    value: number;
    used_at: Date;
}
