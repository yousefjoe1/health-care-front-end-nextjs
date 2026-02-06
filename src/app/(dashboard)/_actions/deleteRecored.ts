'use server'

import api from "@/app/(dashboard)/config/axios";
import { AxiosError } from "axios";

interface ServerError {
    status: string;
    statusCode: number;
    message: string;
}


export async function deleteRecored(url: string) {
    try {
        const response = await api.delete(`/${url}`);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {

        const err = error as AxiosError<ServerError>; // بنعرفه إن الـ data جواها ServerError

        return {
            success: false,
            error: err.response?.data?.message || 'حدث خطأ ما ...',
        };
    }
}