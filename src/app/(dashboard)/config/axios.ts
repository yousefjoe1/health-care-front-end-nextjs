import axios, {
    AxiosInstance,
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse
} from "axios";

// تعريف شكل البيانات المتوقع في حال وجود خطأ من السيرفر
interface ApiError {
    message?: string;
    errors?: Record<string, string[]>;
}

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Request Interceptor
 */
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token && config.headers) {
                // استخدام النوع الآمن لإضافة التوكن
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 */
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    async (error: AxiosError<ApiError>): Promise<never> => {
        // معالجة خطأ 401 (Unauthorized)
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }

        // استخراج رسالة الخطأ بشكل آمن
        const errorMessage = error.response?.data?.message || "حدث خطأ غير متوقع";

        // يمكنك هنا إضافة Toast notification لإظهار الخطأ للمستخدم
        // toast.error(errorMessage);

        return Promise.reject(error);
    }
);

export default api;