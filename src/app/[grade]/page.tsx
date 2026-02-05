"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { curriculumData } from "@/data/curriculum";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, Hash, Shapes, Grid3X3 } from "lucide-react";
// Import params type handling approach for Next.js 15+ if strict, but generic `params` works generally.
// Note: In Next.js 15, params is a Promise. We need to await it or use React.use() if it's a client component, 
// OR keep it server component. 
// However, I made this file "use client" so I can map data easily? No, Server Component is better.
// But I need access to params.
// Let's stick to "use client" for interactivity if needed, but params needs handling.
// Actually, for simplicity in MVP, let's use a Server Component.

// Re-writing as Server Component (no 'use client' at top).
// Data is static in this file context anyway.

import { use } from "react";

export async function generateStaticParams() {
    return curriculumData.map((grade) => ({
        grade: grade.id,
    }));
}

export default function GradePage({ params }: { params: Promise<{ grade: string }> }) {
    // Unwrap params using React.use() or await in async component
    // Since Next.js 15, params is a promise.
    const { grade: gradeId } = use(params);

    const grade = curriculumData.find((g) => g.id === gradeId);

    if (!grade) {
        return notFound();
    }

    // Helper to get icon based on strand title keyword
    const getIcon = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes('number')) return <Hash className="h-8 w-8 text-white" />;
        if (t.includes('pattern')) return <Grid3X3 className="h-8 w-8 text-white" />;
        if (t.includes('shape')) return <Shapes className="h-8 w-8 text-white" />;
        return <BookOpen className="h-8 w-8 text-white" />;
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                    {grade.title}
                </h1>
                <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
                    {grade.description}
                </p>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {grade.strands.length > 0 ? (
                    grade.strands.map((strand) => (
                        <Link key={strand.id} href={`/${grade.id}/${strand.id}`}>
                            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-neutral-900">
                                {/* Header with Icon */}
                                <div className={cn(
                                    "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-inner",
                                    grade.gradient
                                )}>
                                    {getIcon(strand.title)}
                                </div>

                                <h2 className="mb-2 text-xl font-bold text-neutral-900 dark:text-white">
                                    {strand.title}
                                </h2>
                                <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                                    {strand.outcomes.length} Outcomes
                                </p>

                                <div className="flex items-center text-sm font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700 dark:text-indigo-400">
                                    Explore Strand <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>

                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-neutral-100 dark:bg-neutral-800 transition-transform group-hover:scale-150" />
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center">
                        <p className="text-neutral-500">Curriculum data coming soon for this grade.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
