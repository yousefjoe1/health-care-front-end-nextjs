import * as z from "zod";

export const appointmentSchema = z.object({
    full_name: z.string().min(3, "الاسم يجب أن يكون أكثر من 3 أحرف"),
    email: z.string()
        .email("البريد الإلكتروني غير صحيح")
        .optional()
        .or(z.literal("")),
    mobile: z.string().regex(/^01[0125]\d{8}$/, "رقم الموبايل غير صحيح"),
    age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "العمر يجب أن يكون رقماً صحيحاً",
    }).optional(),
    password: z.string().min(8, "كلمة المرور يجب أن لا تقل عن 8 أحرف"),
    doctor_id: z.string().min(1, "يرجى اختيار الطبيب"),
    sector_id: z.string().min(1, "يرجى اختيار القسم"),
    appointment_date: z.string().min(1, "يرجى تحديد الموعد"),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;