import { curriculumData } from "@/data/curriculum";
import { GradeCard } from "@/components/curriculum/grade-card";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-neutral-50 px-4 py-8 dark:bg-neutral-950 sm:px-8">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-neutral-950 dark:bg-[radial-gradient(#171717_1px,transparent_1px)]" />

      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
            SaskMath <span className="text-indigo-600 dark:text-indigo-400">Explorer</span>
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Interactive math learning aligned with the Saskatchewan curriculum.
          </p>
        </header>

        <section>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {curriculumData.map((grade) => (
              <GradeCard key={grade.id} grade={grade} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
