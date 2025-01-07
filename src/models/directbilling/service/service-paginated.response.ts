import type { DBServiceStatus } from './db.service.status.js';

interface DirectBillingServicePaginatedResponse {
    success: boolean;
    data: Datum[];
    pagination: Pagination;
}

interface Datum {
    id: string;
    name: string;
    suffix: string;
    status: DBServiceStatus;
    created_at: Date;
}

interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: Links;
}

interface Links {
    next_page: null;
    prev_page: null;
}

export type { DirectBillingServicePaginatedResponse };
