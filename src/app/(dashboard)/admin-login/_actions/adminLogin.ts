// register action
'use server'

import api from "@/config/intercepotor";
import { LoginFormData } from "../_lib/shcema";
import { RegisterResponse } from "@/app/(marketing)/types";
import { cookies } from "next/headers";
// adminLoginAction.ts
import { AxiosError } from "axios";


// هنعرف شكل الـ Error اللي جاي من السيرفر بتاعك
interface ServerError {
    status: string;
    statusCode: number;
    message: string;
}

export async function adminLoginAction(data: LoginFormData) {
    try {
        const response = await api.post<RegisterResponse>(`/staff/login`, data);
        (await cookies()).set('admin-token', response.data.token);

        return {
            success: true,
            data: response.data.user,
        };
    } catch (error) {
        console.log("🚀 ~ adminLoginAction ~ error:", error)
        const err = error as AxiosError<ServerError>; // بنعرفه إن الـ data جواها ServerError
        console.log("🚀 ~ adminLoginAction ~ err:", err.response)

        return {
            success: false,
            // بنبعت الـ message اللي جاية من السيرفر أو رسالة افتراضية
            error: err.response?.data?.message || "حدث خطأ غير متوقع",
        };
    }
}