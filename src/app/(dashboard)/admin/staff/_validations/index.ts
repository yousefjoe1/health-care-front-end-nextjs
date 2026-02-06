import { z } from "zod";

export const StaffSchema = z.object({
    full_name: z
        .string()
        .min(2, "الاسم يجب أن يكون حرفين على الأقل"),
    role: z
        .string()
        .min(1, "يرجى اختيار دور وظيفي"),
    email: z
        .string()
        .email("البريد الإلكتروني غير صحيح").optional()
        .or(z.literal("")),
    password: z
        .string()
        .min(8, "كلمة المرور يجب أن لا تقل عن 8 أرقام أو حروف"),
    phone: z
        .string()
        .min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل")
        // يمكنك إضافة regex للتأكد أنه أرقام فقط إذا أردت
        .regex(/^[0-9+]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
});
