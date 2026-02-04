// register action
'use server'

import api from "@/config/intercepotor";
import { LoginFormData } from "../_lib/shcema";
import { RegisterResponse } from "@/app/(marketing)/types";
import { cookies } from "next/headers";
import { AxiosError } from "axios";

export async function adminLoginAction(data: LoginFormData) {
    try {
        const response = await api.post<RegisterResponse>(`/staff/login`, data);

        (await cookies()).set('admin-token', response.data.token)

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        const err = error as AxiosError;
        console.log("البيانات من السيرفر:", err.response?.data);
        return {
            success: false,
            error: err.response?.data,
        };
    }
}