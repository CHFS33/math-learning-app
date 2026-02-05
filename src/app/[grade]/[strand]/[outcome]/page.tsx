"use client";

import { notFound, useRouter } from "next/navigation";
import { curriculumData } from "@/data/curriculum";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { VisualCounter } from "@/components/activity/visual-counter";
import { Quiz } from "@/components/activity/quiz";
import { use } from "react";

export async function generateStaticParams() {
    return curriculumData.flatMap((grade) =>
        grade.strands.flatMap((strand) =>
            strand.outcomes.map((outcome) => ({
                grade: grade.id,
                strand: strand.id,
                outcome: outcome.id,
            }))
        )
    );
}

export default function OutcomePage({ params }: { params: Promise<{ grade: string; strand: string; outcome: string }> }) {
    const { grade: gradeId, strand: strandId, outcome: outcomeId } = use(params);
    const router = useRouter();

    const grade = curriculumData.find((g) => g.id === gradeId);
    const strand = grade?.strands.find((s) => s.id === strandId);
    const outcome = strand?.outcomes.find((o) => o.id === outcomeId);

    if (!grade || !strand || !outcome) {
        notFound();
    }

    // Flatten activities from indicators
    const allActivities = outcome.indicators.flatMap(i => i.activities);

    if (allActivities.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center text-center">
                <h2 className="text-xl font-semibold">No activities yet</h2>
                <p className="text-neutral-500">Check back later!</p>
                <Button onClick={() => router.back()} className="mt-4" variant="outline">Go Back</Button>
            </div>
        );
    }

    // MVP: Render the first activity found
    const activity = allActivities[0];

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <header className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        {activity.title}
                    </h1>
                    <p className="text-sm text-neutral-500">{outcome.description}</p>
                </div>
            </header>

            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                {activity.type === 'visual-counter' && (
                    <VisualCounter
                        title={activity.title}
                        rounds={activity.content?.rounds || [{ target: activity.content?.target || 3 }]}
                        onComplete={() => router.back()}
                    />
                )}

                {activity.type === 'quiz' && (
                    <Quiz
                        title={activity.title}
                        questions={activity.content?.questions || [{ question: activity.content?.question || '', options: activity.content?.options || [], answer: activity.content?.answer || '' }]}
                        onComplete={() => router.back()}
                    />
                )}

                {activity.type !== 'visual-counter' && activity.type !== 'quiz' && (
                    <div className="py-12 text-center text-neutral-500">
                        Activity type {activity.type} is under construction.
                    </div>
                )}
            </div>
        </div>
    );
}
