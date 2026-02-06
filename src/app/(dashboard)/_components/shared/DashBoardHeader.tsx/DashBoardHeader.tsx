'use client';

import { Staff } from '@/app/(dashboard)/_types/auth.types';
import React, { useEffect, useState } from 'react'

const DashBoardHeader = () => {
    const [userInfo, setUserInfo] = useState<Staff | null>(null)
    useEffect(() => {

        const userInfo = JSON.parse(localStorage.getItem('admin-staff-info') || '{}')
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserInfo(userInfo)

    }, [])



    return (
        <header className="h-16 border-b flex items-center px-6 bg-card">
            <h1 className="text-sm font-medium">أهلاً بك، {userInfo?.full_name}</h1>
        </header>
    )
}

export default DashBoardHeader