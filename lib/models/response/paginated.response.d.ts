export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: Pagination;
}
interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: PaginationLinks;
}
interface PaginationLinks {
    next_page: string | null;
    prev_page: string | null;
}
export {};
