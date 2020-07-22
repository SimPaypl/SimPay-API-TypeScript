import {ApiError} from "./api.error";

export interface ApiResponse<T> {
    respond: T;
    error: ApiError[];
}
