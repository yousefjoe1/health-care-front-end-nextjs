"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { appointmentSchema, type AppointmentFormValues } from "./schema";
import { registerAction } from "@/app/(marketing)/_actions/register";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/app/(marketing)/_actions/fetchData";
import { Doctor, Sector } from "@/app/(marketing)/types";
import Selections from "@/components/shared/Selections";

export default function AppointmentForm() {
    const { data: doctors, isError, isLoading } = useQuery({
        queryKey: ['docs'], queryFn: async () => {
            const res = await fetchData('doctors')
            return res
        }
    })
    const { data: sectors, isError: sectorsError, isLoading: sectorsLoading } = useQuery({
        queryKey: ['sectors'], queryFn: async () => {
            const res = await fetchData('sectors')
            return res
        }
    })
    console.log("🚀 ~ AppointmentForm ~ sectors:", sectors)

    const [loading, setLoading] = useState(false)
    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            full_name: "",
            email: "",
            mobile: "",
            age: "",
            password: "",
            doctor_id: "",
            sector_id: "",
            appointment_date: "",
        },
    });
    console.log("🚀 ~ AppointmentForm ~ form:", form)

    async function onSubmit(data: AppointmentFormValues) {
        console.log("🚀 ~ onSubmit ~ data:", data)
        // const result = await registerAction(data);
        // console.log("🚀 ~ onSubmit ~ result:", result)
        // if (result.success) {
        //     // toast.success("تم التسجيل بنجاح");
        //     // form.reset();
        // } else {
        //     // toast.error(result.error);
        // }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-card rounded-xl border shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-primary">حجز موعد جديد</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الاسم الكامل</FormLabel>
                                    <FormControl>
                                        <Input placeholder="أحمد محمد..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>البريد الإلكتروني</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="example@test.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Mobile */}
                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>رقم الموبايل</FormLabel>
                                    <FormControl>
                                        <Input placeholder="010..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Age */}
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>العمر</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>كلمة المرور</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        {/* Sector Select */}
                        <FormField
                            control={form.control}
                            name="sector_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>القسم</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full" >
                                                <SelectValue placeholder={`اختر القسم`} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sectors?.data?.map((item: Sector) => (
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.name} - الميعاد :  {item.open_time} - {item.end_time}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Doctor Select */}
                        <FormField
                            control={form.control}
                            name="doctor_id"
                            render={({ field }) => (
                                <Selections
                                    selectWidth="w-full"
                                    field={field}
                                    name="الطبيب"
                                    placeholder="اختر الطبيب"
                                    data={doctors?.data}
                                    itemNameKey="full_name"
                                />
                            )}
                        />

                        {/* Appointment Date */}
                        <FormField
                            control={form.control}
                            name="appointment_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>تاريخ الموعد</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    <Button
                        disabled={loading}
                        type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90">
                        {
                            loading ? <Loader2 /> : `حفظ البيانات`
                        }
                    </Button>
                </form>
            </Form>
        </div>
    );
}