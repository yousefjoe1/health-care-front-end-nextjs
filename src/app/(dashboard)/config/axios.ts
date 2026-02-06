import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    // دي أهم خاصية: بتخلي المتصفح يبعت الكوكيز (حتى الـ httpOnly) تلقائياً مع كل طلب
    withCredentials: true,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    // لو الطلب طالع من السيرفر (Server Action / SSR)
    if (typeof window === "undefined") {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const token = cookieStore.get("admin-token")?.value;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    // ملاحظة: في الكلينت (المتصفح)، إحنا مش محتاجين نكتب الـ Header بإيدنا
    // لأن مع withCredentials: true، المتصفح بيبعت الكوكي لوحده في الـ request headers

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // معالجة الـ 401 في الكلينت
            if (typeof window !== "undefined") {
                // بما إننا مش هنعرف نمسح الـ httpOnly cookie من الجافا سكريبت
                // هنكتفي بتوجيه المستخدم لصفحة اللوجين، وهناك الـ Server Action بتاع Logout يمسحها
                window.location.href = "/admin-login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;