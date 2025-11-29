"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface NewsArticle {
    slug: string
    category: string
    source: string
    time: string
    title: string
    description: string
    tags: string[]
    reactions?: { smiling?: number; cool?: number }
}

interface NewsCardProps {
    article: NewsArticle
}

export function NewsCard({ article }: NewsCardProps) {
    return (
        <div className="border-b border-white/10 pb-4">
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-white bg-white/10 px-2 py-0.5 rounded">
                            {article.category}
                        </span>
                        <span className="text-xs text-slate-400">{article.source}</span>
                        <span className="text-xs text-slate-400">• {article.time}</span>
                    </div>
                    <Link href={`/dashboard/news/${article.slug}`}>
                        <h3 className="text-base font-bold mb-2 text-white hover:text-emerald-400 cursor-pointer transition">
                            {article.title}
                        </h3>
                    </Link>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">
                        {article.description}
                    </p>
                    <div className="flex items-center gap-2">
                        {article.tags.map((tag, tagIdx) => (
                            <Badge key={tagIdx} variant="neutral" className="bg-white/5 text-slate-300">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
            {article.reactions && (
                <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-500">
                        Reactions: {article.reactions.smiling ? `${article.reactions.smiling} Smiling` : ''}
                        {article.reactions.smiling && article.reactions.cool ? ' • ' : ''}
                        {article.reactions.cool ? `${article.reactions.cool} Cool` : ''}
                    </span>
                </div>
            )}
        </div>
    )
}
