// import { Button } from "@/components/ui/button"
import { ActionModalProps } from "@/app/(dashboard)/_types/modals.types"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from 'react'

const ActionModal = ({ children, title, buttonName, icon, details }: ActionModalProps) => {
    return (
        <Dialog>
            <DialogTrigger>
                <span className="border text-primary p-2 rounded-lg"> {buttonName && buttonName}</span>
                {icon && icon}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <div className="mt-6">
                        {children}
                    </div>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose render={<Button type="button">اغلاق</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ActionModal