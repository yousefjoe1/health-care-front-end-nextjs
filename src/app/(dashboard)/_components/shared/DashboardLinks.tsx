'use client';
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation';
import React from 'react'

const links = [
    {
        title: "الرئيسية",
        href: "/admin",
    },
    {
        title: "الموظفين",
        href: "/admin/staff",
    },
    {
        title: "المرضى",
        href: "/admin/patients",
    },
    {
        title: "المواعيد",
        href: "/admin/appointments",
    },
    {
        title: "التقارير",
        href: "/admin/reports",
    },
]

const DashboardLinks = () => {
    // get current path
    const path = usePathname();

    return (
        <div className='flex flex-col gap-2 mt-1'>
            {links.map((link) => (
                <Link className={`p-2 ${path == link.href ? 'bg-primary' : ''}`} key={link.href} href={link.href}>
                    {link.title}
                </Link>
            ))}
        </div>
    )
}

export default DashboardLinks