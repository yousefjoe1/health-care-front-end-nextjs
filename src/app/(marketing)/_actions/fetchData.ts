// fetch data action

// register action
'use server'

import { RegisterPayload, RegisterResponse } from "@/app/(marketing)/types";
import api from "@/config/intercepotor";

export async function fetchData(url: string) {
    try {
        const response = await api.get(`/${url}`);

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: "حدث خطأ أثناء جلب البيانات",
        };
    }
}