import { DbService } from "../db.service";
export interface DbServicesListResponse {
    status: string;
    services: DbService[];
}
