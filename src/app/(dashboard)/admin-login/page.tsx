"use client"

import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { LoginFormData, LoginSchema } from './_lib/shcema'
import { adminLoginAction } from './_actions/adminLogin'
import { useNotify } from '../_hooks/use-notify'
import { useRouter } from 'next/navigation'

const Login = () => {
    const { success, error } = useNotify()
    const router = useRouter()
    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await adminLoginAction(data)
            if (res.success) {
                success(`تم تسجيل الدخول بنجاح`)
                router.push('/admin')
            }

            if (!res.success) {
                const er = res.error
                error(er || 'حدث خطأ')
            }


        } catch {
            error("حدث خطأ")
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-4" dir="rtl">
            <div className="w-full max-w-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 shadow-lg rounded-2xl p-6 border">

                        {/* رقم الهاتف */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>رقم الهاتف</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+201234567890" type="tel" {...field} />
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

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? "جاري الدخول..." : "دخول"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login