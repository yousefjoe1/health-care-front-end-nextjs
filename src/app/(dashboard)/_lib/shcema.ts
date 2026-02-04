import { z } from "zod";

export const LoginSchema = z.object({
    phone: z
        .string()
        .min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل")
        .regex(/^[0-9+]+$/, "رقم الهاتف غير صحيح"),
    password: z
        .string()
        .min(1, "يرجى إدخال كلمة المرور"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;