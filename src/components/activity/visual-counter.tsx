"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Cat, Dog, Fish, Rabbit, Bug, Bird } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCcw } from "lucide-react";

export interface CounterRound {
    target: number;
}

interface VisualCounterProps {
    title: string;
    rounds: CounterRound[];
    onComplete?: () => void;
}

const ICONS = [Cat, Dog, Fish, Rabbit, Bug, Bird];

export function VisualCounter({ title, rounds, onComplete }: VisualCounterProps) {
    const router = useRouter();
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [IconComponent, setIconComponent] = useState<any>(Cat);
    const [showSummary, setShowSummary] = useState(false);

    const currentRound = rounds[currentRoundIndex];

    // Randomize icon on round change
    useEffect(() => {
        const RandomIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
        setIconComponent(() => RandomIcon);
        setSelectedNumber(null);
        setIsCorrect(null);
    }, [currentRoundIndex, rounds]);

    const handleSelect = (num: number) => {
        setSelectedNumber(num);
        const correct = num === currentRound.target;
        setIsCorrect(correct);

        if (correct) {
            setTimeout(() => {
                if (currentRoundIndex < rounds.length - 1) {
                    setCurrentRoundIndex(prev => prev + 1);
                } else {
                    setShowSummary(true);
                }
            }, 1500);
        }
    };

    if (showSummary) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Activity Complete!</h2>
                <div className="text-6xl text-green-500">
                    🎉
                </div>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    You counted everything correctly!
                </p>
                <div className="flex gap-4">
                    <Button onClick={() => window.location.reload()} variant="outline">
                        <RefreshCcw className="mr-2 h-4 w-4" /> Play Again
                    </Button>
                    <Button onClick={onComplete || (() => router.back())}>
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    }

    // Generate options (always include answer, plus some randoms around it)
    // Simple: Just 1-10 for <10, or specific set.
    // Let's stick to 1-10 for flexibility in MVP or dynamic later.
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className="flex flex-col items-center justify-center space-y-8 p-4">
            <div className="flex w-full max-w-lg items-center justify-between text-sm font-medium text-neutral-500">
                <span>Round {currentRoundIndex + 1} of {rounds.length}</span>
            </div>

            <div className="relative w-full max-w-lg overflow-hidden rounded-full bg-neutral-100 h-2">
                <motion.div
                    className="absolute left-0 top-0 h-full bg-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentRoundIndex) / rounds.length) * 100}%` }}
                />
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    How many do you see?
                </h2>
            </div>

            <div className="flex min-h-[300px] w-full max-w-2xl items-center justify-center rounded-3xl bg-indigo-50 p-8 dark:bg-indigo-950/30">
                <div className="flex flex-wrap justify-center gap-8">
                    {Array.from({ length: currentRound.target }).map((_, i) => (
                        <motion.div
                            key={`${currentRoundIndex}-${i}`}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                        >
                            <IconComponent className="h-16 w-16 text-indigo-600 dark:text-indigo-400 sm:h-24 sm:w-24" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {options.map((num) => (
                    <motion.button
                        key={num}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSelect(num)}
                        disabled={isCorrect === true}
                        className={cn(
                            "flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold shadow-md transition-colors",
                            selectedNumber === num
                                ? isCorrect
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                : "bg-white text-neutral-900 hover:bg-neutral-50 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                        )}
                    >
                        {num}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {isCorrect && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-20 rounded-full bg-green-100 px-6 py-2 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                        <span className="font-bold">Correct!</span> Moving on...
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
