import Link from "next/link";
import { notFound } from "next/navigation";
import { curriculumData } from "@/data/curriculum";
import { cn } from "@/lib/utils";
import { ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { use } from "react";

export default function StrandPage({ params }: { params: Promise<{ grade: string; strand: string }> }) {
    const { grade: gradeId, strand: strandId } = use(params);

    const grade = curriculumData.find((g) => g.id === gradeId);
    if (!grade) notFound();

    const strand = grade.strands.find((s) => s.id === strandId);
    if (!strand) notFound();

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <header>
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <Link href={`/${gradeId}`} className="hover:underline">{grade.title}</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span>{strand.title}</span>
                </div>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                    {strand.title}
                </h1>
                <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
                    In this unit, we will cover the following goals:
                </p>
            </header>

            <div className="space-y-4">
                {strand.outcomes.map((outcome, index) => (
                    <Link
                        key={outcome.id}
                        href={`/${gradeId}/${strandId}/${outcome.id}`}
                        className="block"
                    >
                        <div className="group flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-indigo-500 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-indigo-500">
                            <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:bg-indigo-900/30 dark:group-hover:text-indigo-400">
                                <Circle className="h-5 w-5" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                        {outcome.code}
                                    </span>
                                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                        Outcome {index + 1}
                                    </h3>
                                </div>
                                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                    {outcome.description}
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-indigo-400">
                                    Start Activities <ChevronRight className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                {strand.outcomes.length === 0 && (
                    <p className="text-neutral-500">No outcomes defined yet.</p>
                )}
            </div>
        </div>
    );
}
