// register action
'use server'

import { RegisterPayload, RegisterResponse } from "@/app/(marketing)/types";
import api from "@/config/intercepotor";

export async function registerAction(data: RegisterPayload) {
    try {
        const response = await api.post<RegisterResponse>(`/users`, data);

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: "حدث خطأ أثناء التسجيل",
        };
    }
}