"use client";

import DisplayCards from "./display-cards";
import { Award, BookOpen, Shield } from "lucide-react";

const koenigCards = [
  {
    icon: <Shield className="size-4 text-blue-300" />,
    title: "Microsoft Certified",
    description: "Azure & Cloud Security tracks",
    date: "10 certification paths",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-300",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <BookOpen className="size-4 text-blue-300" />,
    title: "Expert-Led Training",
    description: "Live & self-paced courses",
    date: "500+ hours of content",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-300",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Award className="size-4 text-blue-300" />,
    title: "98% Pass Rate",
    description: "Guaranteed exam success",
    date: "50,000+ alumni worldwide",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-300",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

export function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={koenigCards} />
      </div>
    </div>
  );
}
