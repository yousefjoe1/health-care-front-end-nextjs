// register action
'use server'

import api from "@/app/(dashboard)/config/axios";
// import api from "@/config/intercepotor";
import { UserFormData } from "../_lib";

export async function addStaffAction(data: UserFormData) {
    try {
        const response = await api.post<UserFormData>(`/staff/create-user`, data);

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.log("🚀 ~ addStaffAction ~ error:", error.response.data.msg)
        return {
            success: false,
            error: error?.response?.data?.msg || 'حدث خطأ ما ...',
        };
    }
}