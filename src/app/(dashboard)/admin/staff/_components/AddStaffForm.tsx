"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { StaffSchema } from "../_validations";
import { addStaffAction } from "../_actions/addStaff";
import { useState } from "react";
import { useNotify } from "@/app/(dashboard)/_hooks/use-notify";
import { Staff } from "@/app/(dashboard)/_types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function AddStaffForm() {
    const { success, error } = useNotify()
    const form = useForm<Staff>({
        resolver: zodResolver(StaffSchema),
        defaultValues: {
            full_name: "",
            role: "",
            email: "",
            password: "",
            phone: "",
        },
    });


    const onSubmit = async (values: Staff) => {
        mutate(values)
        // const res = await addStaffAction(values)
    }

    const queryClient = useQueryClient() // 1. استدعاء الـ Client
    const { mutate, isPending } = useMutation({
        mutationFn: addStaffAction,
        onSuccess: (res) => {
            console.log("🚀 ~ AddStaffForm ~ res:", res)
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ['staff'] })
                success("تمت الإضافة")
            } else {
                error(res.error || '')
            }
        },
    })


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-lg rounded-2xl p-6 border"
            >

                {/* الاسم الكامل */}
                <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>الاسم الكامل</FormLabel>
                            <FormControl>
                                <Input placeholder="يوسف محمود" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* الدور الوظيفي */}
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>الدور</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full" dir="rtl">
                                        <SelectValue placeholder="اختر الدور" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Admin">مدير</SelectItem>
                                    <SelectItem value="staff">موظف</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* البريد الإلكتروني */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>البريد الإلكتروني</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="example@mail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* كلمة المرور */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>كلمة المرور</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* رقم الهاتف */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>رقم الهاتف</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="+20..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* زر الإرسال - ممتد على عرض الشبكة بالكامل */}
                <div className="md:col-span-2 lg:col-span-3 mt-2">
                    <Button disabled={isPending} type="submit" className="w-full text-lg font-bold">
                        {isPending ? 'جاري ارسال البيانات ' : 'إرسال البيانات'}
                    </Button>
                </div>

            </form>
        </Form>
    );
}