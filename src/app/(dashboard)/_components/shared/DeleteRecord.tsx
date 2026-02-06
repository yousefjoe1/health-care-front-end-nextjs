import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { deleteRecored } from '../../_actions/deleteRecored'
import { useNotify } from '../../_hooks/use-notify'
import { Button } from '@/components/ui/button'

const DeleteRecord = ({ queryKey, url }: { queryKey: string, url: string }) => {

    const { success, error } = useNotify()


    const queryClient = useQueryClient() // 1. استدعاء الـ Client
    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteRecored(url),
        onSuccess: (res) => {
            console.log("🚀 ~ DeleteRecord ~ res:", res)
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: [queryKey] })
                success("تم المسح")
            } else {
                error(res.error || '')
            }
        },
    })

    const d = () => {
        mutate()
    }

    return (
        <div>
            <Button disabled={isPending} onClick={d} variant={'delete'}>
                {isPending ? `بتم المسح` : `تاكيد المسح`}
            </Button>

        </div>
    )
}

export default DeleteRecord