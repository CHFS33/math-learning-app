"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { curriculumData } from "@/data/curriculum";
import { Home, Layers, Calculator, BookOpen, GraduationCap } from "lucide-react";

export function AppSidebar() {
    const pathname = usePathname();
    const currentGradeId = pathname.split('/')[1];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-20 flex-col items-center border-r border-neutral-200 bg-white py-8 transition-all dark:border-neutral-800 dark:bg-neutral-900 md:w-64">
            <Link href="/" className="mb-8 flex items-center gap-3 px-4 transition-opacity hover:opacity-80">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-lg">
                    SE
                </div>
                <span className="hidden font-bold text-neutral-900 dark:text-white md:block">
                    SaskMath
                </span>
            </Link>

            <div className="w-full flex-1 px-3">
                <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Grades
                </div>
                <div className="space-y-2">
                    {curriculumData.map((grade) => {
                        const isActive = currentGradeId === grade.id;
                        return (
                            <Link
                                key={grade.id}
                                href={`/${grade.id}`}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                                        : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                                )}
                            >
                                <div
                                    className={cn(
                                        "h-2 w-2 rounded-full",
                                        `bg-gradient-to-br ${grade.gradient}`
                                    )}
                                />
                                <span className="hidden md:block">{grade.title}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
                <Link href="/" className="flex items-center gap-3 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    <Home className="h-5 w-5" />
                    <span className="hidden md:block">Home</span>
                </Link>
            </div>
        </aside>
    );
}
