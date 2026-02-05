import { AppSidebar } from "@/components/layout/app-sidebar";

export default function GradeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
            <AppSidebar />
            <main className="ml-20 flex-1 p-8 transition-all md:ml-64">
                {children}
            </main>
        </div>
    );
}
