// check token from cookies

'use server';

import { cookies } from "next/headers";

export async function checkToken() {
    try {
        const token = (await cookies()).get("admin-token");
        if (!token) {
            return {
                success: false,
            };
        }
        return {
            success: true,
        };
    } catch {
        return {
            success: false,
        };
    }
}