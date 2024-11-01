import { RainbowButton } from "@/components/ui/rainbow-button";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Pencil, Sparkles } from "lucide-react";

const LandingPage = () => {
    return (
        <main className="min-h-screen container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-center relative overflow-hidden">
            <div className="flex items-center justify-center flex-col relative z-10 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                <div className="animate-fade-in space-y-2">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                        <span className="text-sm text-center font-medium text-gray-600 dark:text-gray-400 tracking-wider uppercase">
                            Welcome to VicharSpace
                        </span>
                        <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                    </div>
                    <h1 className="max-w-3xl flex flex-col gap-6 text-center text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] bg-clip-text">
                        Unleash Your Creativity,{" "}
                        <span className="relative">
                            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 blur-2xl opacity-20 dark:opacity-40 animate-pulse"></span>
                            <span className="relative bg-gradient-to-br from-blue-600 to-violet-600 text-transparent bg-clip-text dark:from-blue-400 dark:to-violet-400 hover:scale-105 transition-transform duration-300 inline-block">
                                Share Your Story
                            </span>
                        </span>
                    </h1>
                </div>

                <p className="max-w-2xl text-center text-xl mb-12 text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                    VicharSpace is your canvas for ideas, experiences, and expertise. Join a community of passionate writers and readers, and let your voice be heard.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <Link to="/dashboard">
                        <RainbowButton className="text-lg px-8 py-4 font-medium tracking-wide shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
                            Start Exploring
                        </RainbowButton>
                    </Link>
                    <Link to="/publish">
                        <RainbowButton className="group flex items-center gap-3 text-lg px-8 py-4 bg-gray-900 dark:bg-gray-800 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-950/20">
                            <Pencil className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            Start Writing
                        </RainbowButton>
                    </Link>
                </div>
            </div>

            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                    "absolute inset-0 opacity-40 dark:opacity-30 animate-pulse"
                )}
            />

            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-30 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-30 animate-pulse animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-10 dark:opacity-20 animate-pulse animation-delay-4000" />
        </main>
    );
}

export default LandingPage;