// @ts-nocheck
"use server";

import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import HttpStatus from "@/Utils/httpStatus";

const baseURL: string = process.env.API || "";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
    withCredentials: true,
});

export interface GetDataResponse<T> {
    data: T | null;
    status: number;
    error: boolean;
    message?: string;
}

async function makeRequestWithRetry<T>(
    axiosConfig: AxiosRequestConfig,
    retries: number = 3,
    delay: number = 1000,
    retryNonIdempotent: boolean = false,
): Promise<AxiosResponse<T>> {
    const method = axiosConfig.method?.toUpperCase() || "GET";

    const idempotentMethods = ["GET", "HEAD", "OPTIONS", "PUT", "DELETE"];

    const shouldRetry = retryNonIdempotent || idempotentMethods.includes(method);

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await axiosInstance.request<T>(axiosConfig);
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status && status >= 400 && status < 500 && status !== 429) {
                    throw error;
                }

                if (!shouldRetry) {
                    throw error;
                }

                if (attempt === retries - 1) {
                    throw error;
                }

                await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
            } else {
                throw error;
            }
        }
    }
    throw new Error("Request failed after maximum retries");
}

export async function GetData<T>(url: string): Promise<GetDataResponse<T>> {
    try {
        if (typeof url !== "string" || !url.trim()) {
            return {
                data: null,
                status: HttpStatus.FAILED_DEPENDENCY,
                error: true,
                message: "Invalid URL",
            };
        }

        const requestCookies = cookies().getAll();
        const cookieHeader = requestCookies.map(c => `${c.name}=${c.value}`).join("; ");

        const axiosConfig: AxiosRequestConfig = {
            method: "GET",
            url: url,
            headers: {
                Cookie: cookieHeader,
            },
            withCredentials: true,
        };

        const response = await makeRequestWithRetry<T>(axiosConfig);

        if (response.status === HttpStatus.UNAUTHORIZED || response.status === HttpStatus.FORBIDDEN) {
            const responseData = response.data as { message?: string; redirect?: string };
            redirect("/auth/logout");

            return {
                data: null,
                status: response.status,
                error: true,
                message: responseData.message || "Unauthorized access",
            };
        }

        if (response.status !== HttpStatus.SUCCESS) {
            return {
                data: null,
                status: response.status,
                error: true,
                message: response.statusText,
            };
        }

        return {data: response.data, status: response.status, error: false};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
            const responseData = error.response?.data as { message?: string; redirect?: string };

            if (status === HttpStatus.UNAUTHORIZED || status === HttpStatus.FORBIDDEN) {
                if (responseData?.redirect) {
                    redirect("/auth/logout");
                }

                return {
                    data: null,
                    status: status,
                    error: true,
                    message: responseData?.message || "Unauthorized access",
                };
            }

            return {
                data: null,
                status: status,
                error: true,
                message: error.message,
            };
        } else {
            return {
                data: null,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: true,
                message: "An unexpected error occurred",
            };
        }
    }
}

export async function PostData<T>(
    url: string,
    data: object,
    method: "POST" | "PUT" | "PATCH" = "POST",
    retryNonIdempotent: boolean = false,
): Promise<{
    data: T | null;
    fullResponse: AxiosResponse<T>;
    error: boolean;
    status: HttpStatus;
    message?: string;
    fullError?: AxiosError;
}> {
    if (typeof url !== "string" || !url.trim()) {
        return {
            data: null,
            status: HttpStatus.BAD_REQUEST,
            error: true,
            message: "Invalid URL",
        };
    }

    const allowedMethods = ["POST", "PUT", "PATCH"];

    if (!allowedMethods.includes(method)) {
        return {
            data: null,
            status: HttpStatus.METHOD_NOT_ALLOWED,
            error: true,
            message: "Invalid HTTP method",
        };
    }

    if (!data || typeof data !== "object") {
        return {
            data: null,
            status: HttpStatus.BAD_REQUEST,
            error: true,
            message: "Data payload is required and must be an object",
        };
    }

    const requestCookies = cookies().getAll();
    const cookieHeader = requestCookies.map(c => `${c.name}=${c.value}`).join("; ");

    const axiosConfig: AxiosRequestConfig = {
        method: method,
        url: url,
        data: data,
        headers: {
            Cookie: cookieHeader,
        },
        withCredentials: true,
    };

    try {
        const response = await makeRequestWithRetry<T>(axiosConfig, 3, 1000, retryNonIdempotent);
        if (response.status === HttpStatus.UNAUTHORIZED || response.status === HttpStatus.FORBIDDEN) {
            const responseData = response.data as { message?: string; redirect?: string };

            redirect("/auth/logout");

            return {
                data: null,
                status: response.status,
                error: true,
                message: responseData?.message || "Unauthorized access",
            };
        }

        if (response.status !== HttpStatus.SUCCESS && response.status !== HttpStatus.CREATED) {
            return {
                data: null,
                status: response.status,
                error: true,
                message: response.statusText,
            };
        }

        return {data: response.data, status: response.status, error: false, fullResponse: response};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
            const responseData = error.response?.data as { message?: string; redirect?: string };

            if (status === HttpStatus.UNAUTHORIZED || status === HttpStatus.FORBIDDEN) {
                if (status === HttpStatus.FORBIDDEN) {
                    cookies().set("pmp_db_userId", "", {maxAge: 0});
                }

                if (responseData?.redirect) {
                    redirect("/auth/logout");
                }

                return {
                    data: null,
                    status: status,
                    error: true,
                    message: responseData?.message || "Unauthorized access",
                    fullError: error,
                };
            }

            return {
                data: null,
                status: status,
                error: true,
                message: error.message,
                fullError: error,
            };
        } else {
            return {
                data: null,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: true,
                message: "An unexpected error occurred",
                fullError: error,
            };
        }
    }
}
