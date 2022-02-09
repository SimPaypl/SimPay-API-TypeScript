export interface DbGenerationResponse {
    success: boolean;
    data: DbGenerationResponseBody;
    errors?: { [key: string]: string[] }
}

interface DbGenerationResponseBody {
    transactionId: string;
    redirectUrl: string;
}