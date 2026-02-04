import React from 'react'
import { StaffTable } from './_components/StaffTable'
import { AddStaffForm } from './_components/AddStaffForm'

const StaffPage = () => {
    return (
        <div>
            <AddStaffForm />

            <StaffTable />

        </div>
    )
}

export default StaffPage