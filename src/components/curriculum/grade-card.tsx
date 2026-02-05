"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Grade } from "@/data/curriculum";

interface GradeCardProps {
    grade: Grade;
}

export function GradeCard({ grade }: GradeCardProps) {
    return (
        <Link href={`/${grade.id}`}>
            <div
                className={cn(
                    "group relative h-48 w-full cursor-pointer overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl",
                    `bg-gradient-to-br ${grade.gradient}`
                )}
            >
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />

                <div className="relative z-10 flex h-full flex-col justify-between text-white">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight">{grade.title}</h3>
                        <p className="mt-2 text-sm font-medium text-white/90">
                            {grade.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        Start Learning <ArrowRight className="h-4 w-4" />
                    </div>
                </div>

                {/* Decorative circle */}
                <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/20 blur-2xl transition-transform duration-500 group-hover:scale-150" />
            </div>
        </Link>
    );
}
