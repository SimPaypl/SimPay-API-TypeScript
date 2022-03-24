import { DBServiceStatus } from './db.service.status';
export interface PartialDbService {
    id: string;
    name: string;
    suffix: string;
    status: DBServiceStatus;
    created_at: Date;
}
