import type { DBServiceStatus } from './db.service.status.js';

export interface PartialDbService {
    id: string;
    name: string;
    suffix: string;
    status: DBServiceStatus;
    created_at: Date;
}
