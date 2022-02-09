import { ServiceStatus } from '../../service.status';
export interface PartialDbService {
    id: string;
    name: string;
    suffix: string;
    status: ServiceStatus;
    created_at: Date;
}
