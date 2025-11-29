'use client'

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

// TypeScript Interfaces
interface Article {
    slug: string;
    category: string;
    source: string;
    time: string;
    title: string;
    description: string;
    content: string;
    author: string;
    publishDate: string;
    readTime: number;
    heroImage: string;
    tags: string[];
}

interface RelatedArticle {
    slug: string;
    title: string;
    excerpt: string;
}

// Mock articles database
const articlesDatabase: Article[] = [
    {
        slug: 'tech-stocks-rally-ai-optimism',
        category: 'CRYPTO',
        source: 'CoinDesk',
        time: '3h ago',
        title: 'Tech stocks extend rally as AI optimism lifts broader US markets',
        description: 'Major US indexes have logged their strongest gains this year after bank-lending data. Chipmakers and cloud-based companies in broad-based rally to sustain price momentum.',
        content: 'The technology sector experienced a significant surge today as artificial intelligence developments continue to drive investor enthusiasm. Major chipmakers including NVIDIA, AMD, and Intel saw substantial gains, with the broader tech-heavy NASDAQ index climbing over 2.5% in early trading. Market analysts attribute this rally to a combination of factors, including stronger-than-expected earnings reports from key tech companies, positive sentiment around AI adoption across industries, and improved bank lending data that suggests continued economic resilience. Cloud computing giants such as Amazon Web Services, Microsoft Azure, and Google Cloud also contributed to the rally, with their parent companies posting gains between 3-4%. The sustained momentum in tech stocks has lifted broader market indices, with the S&P 500 reaching new yearly highs. Investors remain optimistic about the long-term growth potential of AI-driven technologies, despite concerns about valuation levels in some segments of the market.',
        author: 'Sarah Johnson',
        publishDate: 'November 12, 2024',
        readTime: 5,
        heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop',
        tags: ['Analysis', 'Tech', 'USA', 'AI', 'Markets']
    },
    {
        slug: 'dollar-dips-softer-cpi',
        category: 'FOREX',
        source: 'Forex.com',
        time: '6h ago',
        title: 'Dollar dips after softer-than-expected CPI; euro and yen edge higher',
        description: 'Federal Reserve officials continues at ongoing debate surrounding discounting risk sentiment and weighing on macro releases.',
        content: 'The US dollar weakened against major currencies following the release of softer-than-expected Consumer Price Index (CPI) data, which showed inflation continuing to moderate. The euro gained 0.8% against the dollar, while the Japanese yen strengthened by 0.6%. The CPI report revealed that core inflation rose by just 0.2% month-over-month, below the consensus estimate of 0.3%, suggesting that the Federal Reserve\'s aggressive rate hiking campaign is having the desired effect. Currency traders are now reassessing their expectations for future Fed policy, with many analysts predicting that the central bank may pause its rate increases sooner than previously anticipated. The softer inflation data has also boosted risk sentiment across global markets, with investors rotating into higher-yielding assets. European Central Bank officials have indicated they remain committed to their own tightening cycle, which has provided additional support for the euro.',
        author: 'Michael Chen',
        publishDate: 'November 11, 2024',
        readTime: 4,
        heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop',
        tags: ['Analysis', 'EUR', 'USD', 'Forex', 'CPI']
    },
    {
        slug: 'bitcoin-holds-60k-etf-inflows',
        category: 'STOCKS',
        source: 'Bloomberg',
        time: '12h ago',
        title: 'Bitcoin holds above $60k as ETF inflows offset profit-taking',
        description: 'Sustainable rally; persistent investor that takes initiative to remain bullish even on the back of Bitcoin spot ETF proving to be short-lived, thus we expect...',
        content: 'Bitcoin maintained its position above the $60,000 threshold despite some profit-taking pressure, as continued inflows into spot Bitcoin ETFs provided strong support. The leading cryptocurrency has shown remarkable resilience in recent weeks, with institutional investors demonstrating sustained interest through ETF products. Data from multiple ETF providers shows net inflows exceeding $500 million over the past week, indicating that institutional demand remains robust. While some retail investors have taken profits at current levels, the steady institutional buying has prevented any significant price decline. Market analysts note that the current price action suggests a healthy consolidation phase, with Bitcoin establishing a new support level around $58,000. On-chain metrics also paint a bullish picture, with long-term holders continuing to accumulate and exchange reserves declining, both typically positive indicators for future price appreciation.',
        author: 'David Martinez',
        publishDate: 'November 8, 2024',
        readTime: 6,
        heroImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=600&fit=crop',
        tags: ['Bitcoin', 'Crypto', 'ETF', 'Markets']
    },
    {
        slug: 'asian-markets-mixed-inflation',
        category: 'CRYPTO',
        source: 'Market Watch',
        time: '18h ago',
        title: 'Asian stock markets see mixed open as core data dampens trading inflation',
        description: 'Investor Fears: persistent investor that have caused declines in nasdaq before consecutive trading Asian weekly sentiment and volatility',
        content: 'Asian equity markets opened with mixed sentiment as investors digested overnight inflation data from the United States and assessed its implications for regional monetary policy. Japan\'s Nikkei 225 edged lower by 0.3%, while Hong Kong\'s Hang Seng index gained 0.5%. Chinese mainland markets showed resilience, with the Shanghai Composite rising 0.7% on hopes of additional stimulus measures from Beijing. The mixed performance reflects ongoing uncertainty about the trajectory of global interest rates and their impact on Asian economies. Traders are particularly focused on upcoming central bank meetings in the region, with the Bank of Japan expected to maintain its ultra-loose monetary policy stance while other regional central banks may continue tightening. Currency movements also influenced trading, with the yen weakening slightly against the dollar, providing some support to Japanese exporters.',
        author: 'Li Wei',
        publishDate: 'November 6, 2024',
        readTime: 4,
        heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop',
        tags: ['Markets', 'Asia', 'Inflation', 'Stocks']
    }
];

// Mock function to fetch article by slug
async function fetchArticleBySlug(slug: string): Promise<Article | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const article = articlesDatabase.find(a => a.slug === slug);
    return article || null;
}

// Mock function to fetch related articles
async function fetchRelatedArticles(currentSlug: string, category: string): Promise<RelatedArticle[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return articlesDatabase
        .filter(a => a.slug !== currentSlug && a.category === category)
        .slice(0, 3)
        .map(a => ({
            slug: a.slug,
            title: a.title,
            excerpt: a.description.substring(0, 100) + '...'
        }));
}

// Page Component
export default function NewsArticle({ params }: { params: { slug: string } }) {
    const [article, setArticle] = useState<Article | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const articleData = await fetchArticleBySlug(params.slug);

                if (!articleData) {
                    notFound();
                    return;
                }

                setArticle(articleData);

                const related = await fetchRelatedArticles(params.slug, articleData.category);
                setRelatedArticles(related);
            } catch (error) {
                console.error('Error loading article:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [params.slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        notFound();
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="text-sm text-gray-600">
                        <Link href="/dashboard/news" className="hover:text-gray-900">News</Link>
                        {' '}/{' '}
                        <span className="text-gray-900">{article.category}</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
                            Share
                        </button>
                        <button className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800 transition">
                            Save Article
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-8">
                    {/* Left Content */}
                    <article className="flex-1 max-w-3xl">
                        <div className="mb-6">
                            <span className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                                {article.category}
                            </span>
                            <h1 className="text-4xl font-bold mt-2 mb-4 leading-tight text-gray-900">
                                {article.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="font-medium">{article.author}</span>
                                <span>•</span>
                                <time>{article.publishDate}</time>
                                <span>•</span>
                                <span>{article.readTime} min read</span>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative w-full h-96 mb-8 bg-gray-200 rounded-lg overflow-hidden">
                            <Image
                                src={article.heroImage}
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg leading-relaxed text-gray-800 mb-6">
                                {article.content}
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                            {article.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700 hover:bg-gray-200 transition cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Source Info */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-600">
                                <span className="font-semibold">Source:</span> {article.source} • Published {article.time}
                            </p>
                        </div>
                    </article>

                    {/* Right Sidebar */}
                    <aside className="w-80 space-y-6">
                        {/* Stock Ticker Widget */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Related Stocks</span>
                                <button className="text-xs text-blue-600 hover:underline">View Chart</button>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
                                    NVDA
                                </button>
                                <button className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
                                    MSFT
                                </button>
                                <button className="flex-1 px-3 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800 transition">
                                    GOOGL
                                </button>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
                                    AAPL
                                </button>
                            </div>
                        </div>

                        {/* Related Articles */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900">Similar articles</h3>

                            {relatedArticles.length > 0 ? (
                                relatedArticles.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/dashboard/news/${related.slug}`}
                                        className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition"
                                    >
                                        <h4 className="text-sm font-medium mb-1 text-gray-900">{related.title}</h4>
                                        <p className="text-xs text-gray-500 line-clamp-2">{related.excerpt}</p>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 p-4 border border-gray-200 rounded-lg">
                                    No related articles found.
                                </p>
                            )}
                        </div>

                        {/* Newsletter Signup */}
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <h3 className="text-sm font-semibold mb-2">Stay Updated</h3>
                            <p className="text-xs text-gray-600 mb-3">
                                Get the latest market news delivered to your inbox.
                            </p>
                            <button className="w-full px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800 transition">
                                Subscribe
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
