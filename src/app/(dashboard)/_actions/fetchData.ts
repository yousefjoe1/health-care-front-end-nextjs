'use server'

import api from "@/app/(dashboard)/config/axios";

export async function fetchData(url: string) {

    try {
        const response = await api.get(`/${url}`);
        return {
            success: true,
            data: response.data,
        };
    } catch (error: unknown) {
        return {
            success: false,
            error: "حدث خطأ أثناء جلب البيانات",
        };
    }
}