

import DashBoardHeader from "../_components/shared/DashBoardHeader.tsx/DashBoardHeader";
import DashboardLinks from "../_components/shared/DashboardLinks";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {


    return (
        <>
            <div dir="rtl" className="flex min-h-screen bg-background">
                {/* هنا تضيف السايد بار الخاص بك */}
                <aside className="w-64 border-l bg-card hidden md:block">
                    {/* مكون السايد بار */}
                    <div className="p-4 font-bold text-primary text-xl">لوحة التحكم</div>
                    <DashboardLinks />
                </aside>

                <div className="flex-1 flex flex-col">
                    {/* هيدر داخلي للداشبورد */}
                    <DashBoardHeader />

                    {/* محتوى الصفحة المتغير */}
                    <main className="p-6 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}