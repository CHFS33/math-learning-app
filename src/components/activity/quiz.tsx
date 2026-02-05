"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Question {
    question: string;
    options: string[];
    answer: string;
    explanation?: string; // Optional explanation for visual learning
}

interface QuizProps {
    title: string;
    questions: Question[];
    onComplete: () => void;
}

export function Quiz({ title, questions, onComplete }: QuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [showSummary, setShowSummary] = useState(false);

    const currentQuestion = questions[currentIndex];

    const handleSelect = (option: string) => {
        if (selectedOption) return; // Prevent double selection

        setSelectedOption(option);
        const correct = option === currentQuestion.answer;
        setIsCorrect(correct);
        if (correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            setShowSummary(true);
        }
    };

    if (showSummary) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Quiz Complete!</h2>
                <div className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {score} / {questions.length}
                </div>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    {score === questions.length ? "Perfect Score! 🌟" : "Great effort! Keep practicing."}
                </p>
                <div className="flex gap-4">
                    <Button onClick={() => window.location.reload()} variant="outline">
                        <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
                    </Button>
                    <Button onClick={onComplete}>
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col items-center space-y-8 p-4">
            <div className="flex w-full max-w-lg items-center justify-between text-sm font-medium text-neutral-500">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>Score: {score}</span>
            </div>

            <div className="relative w-full max-w-lg overflow-hidden rounded-full bg-neutral-100 h-2">
                <motion.div
                    className="absolute left-0 top-0 h-full bg-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {currentQuestion.question}
                </h2>
            </div>

            <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
                {currentQuestion.options.map((option) => (
                    <motion.button
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(option)}
                        disabled={!!selectedOption}
                        className={cn(
                            "flex h-20 items-center justify-center rounded-2xl border-2 text-xl font-bold transition-all disabled:cursor-not-allowed",
                            selectedOption === option
                                ? isCorrect
                                    ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                    : "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                : "border-neutral-200 bg-white text-neutral-700 hover:border-indigo-500 hover:text-indigo-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:border-indigo-400",
                            selectedOption && option === currentQuestion.answer && !isCorrect && selectedOption !== option
                                ? "border-green-500 bg-green-50 text-green-700 opacity-50" // Show correct answer if wrong
                                : ""
                        )}
                    >
                        {option}
                        {selectedOption === option && isCorrect && (
                            <CheckCircle2 className="ml-2 h-6 w-6 text-green-600" />
                        )}
                        {selectedOption === option && isCorrect === false && (
                            <XCircle className="ml-2 h-6 w-6 text-red-600" />
                        )}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {selectedOption && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8"
                    >
                        <Button size="lg" onClick={handleNext} className="rounded-xl px-8">
                            {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
