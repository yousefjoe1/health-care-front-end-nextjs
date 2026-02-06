'use client';
import { fetchData } from "@/app/(dashboard)/_actions/fetchData"
import DeleteRecord from "@/app/(dashboard)/_components/shared/DeleteRecord";
import ActionModal from "@/app/(dashboard)/_components/shared/modals/ActionModal";
import { Staff } from "@/app/(dashboard)/_types/auth.types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"



export function StaffTable() {
    const { data: staff, isError, isLoading } = useQuery({
        queryKey: ['staff'], queryFn: async () => {
            const res = await fetchData('staff')
            return res
        }
    })
    return (
        <Table className="mt-12 border">
            <TableCaption>
                {isLoading ? 'يتم تحديث البيانات' : 'بيانات الموظفين'}
                {
                    isError && 'حدث خطأ أثناء جلب البيانات'
                }
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>عمليات</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>الهاتف</TableHead>
                    <TableHead>الاميل</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {staff?.data?.data && staff?.data?.data?.map((user: Staff) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium space-x-3 p-5">
                            <ActionModal buttonName="مسح" >
                                <DeleteRecord
                                    url={`staff/delete/${user.id}`}
                                    queryKey='staff'
                                />
                            </ActionModal>
                            <ActionModal buttonName="تعديل" >
                                form
                            </ActionModal>
                        </TableCell>
                        <TableCell className="font-medium">{user.full_name}</TableCell>
                        <TableCell className="font-medium">{user.role}</TableCell>
                        <TableCell className="font-medium">{user.phone}</TableCell>
                        <TableCell className="font-medium">{user.email}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}
        </Table>
    )
}
