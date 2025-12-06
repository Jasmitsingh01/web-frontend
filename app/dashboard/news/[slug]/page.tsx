'use client'

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';

// Note: In Next.js 15+, params is a Promise and must be unwrapped with React.use()

// Trending Stocks Widget Component
function TrendingStocksWidget() {
    const { token } = useAuth();
    const [trendingStocks, setTrendingStocks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTrendingStocks() {
            if (!token) return;
            
            try {
                setLoading(true);
                const response = await api.news.getTrendingStocks(token);
                if (response.success && response.data) {
                    setTrendingStocks(response.data.slice(0, 4)); // Show top 4
                }
            } catch (error) {
                console.error('Error fetching trending stocks:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchTrendingStocks();
    }, [token]);

    return (
        <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-sm">Trending Stocks</h3>
                <Link href="/dashboard/market" className="text-emerald-400 text-xs hover:text-emerald-300 transition">
                    See all
                </Link>
            </div>
            
            {loading ? (
                <div className="space-y-3">
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="animate-pulse flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-slate-700 rounded"></div>
                                <div>
                                    <div className="h-3 bg-slate-700 rounded w-12 mb-1"></div>
                                    <div className="h-2 bg-slate-700 rounded w-16"></div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="h-3 bg-slate-700 rounded w-16 mb-1"></div>
                                <div className="h-2 bg-slate-700 rounded w-12"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : trendingStocks.length > 0 ? (
                <div className="space-y-3">
                    {trendingStocks.map((stock, idx) => (
                        <div key={stock.symbol} className="flex items-center justify-between group hover:bg-slate-800/50 p-2 rounded transition">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                    {stock.symbol.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-white text-sm font-medium">{stock.symbol}</div>
                                    <div className="text-slate-400 text-xs truncate max-w-[100px]">
                                        {stock.name || stock.symbol}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-sm font-medium">
                                    ${stock.price?.toFixed(2) || '0.00'}
                                </div>
                                <div className={`text-xs font-medium ${
                                    (stock.changePercent || 0) >= 0 
                                        ? 'text-emerald-400' 
                                        : 'text-red-400'
                                }`}>
                                    {(stock.changePercent || 0) >= 0 ? '+' : ''}
                                    {(stock.changePercent || 0).toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-6">
                    <div className="text-slate-400 text-sm">No trending stocks available</div>
                </div>
            )}
        </div>
    );
}

// TypeScript Interfaces
interface Article {
    id: number;
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
    uuid?: string;
    headline: string;
    summary: string;
    datetime: number;
    image: string;
    url: string;
    related: string;
}

interface RelatedArticle {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
}

// Helper function to format relative time
const formatRelativeTime = (datetime: number) => {
    const now = Date.now() / 1000
    const diff = now - datetime
    const hours = Math.floor(diff / 3600)
    const days = Math.floor(diff / 86400)
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "Just now"
}

// Function to fetch article by slug from API
async function fetchArticleBySlug(slug: string, token: string): Promise<Article | null> {
    try {
        console.log('🔍 [fetchArticleBySlug] Looking for article with slug:', slug);
        
        // Extract ID from slug (supports both old news-{id} and new title-based formats)
        let articleId;
        
        // Try new format first: title-words-{id}
        const newFormatMatch = slug.match(/-(\d+)$/);
        if (newFormatMatch) {
            articleId = newFormatMatch[1];
        } else {
            // Fallback to old format: news-{id}
            const oldFormatMatch = slug.match(/^news-(\d+)$/);
            if (oldFormatMatch) {
                articleId = oldFormatMatch[1];
            } else {
                console.log('❌ [fetchArticleBySlug] Invalid slug format:', slug);
                return null;
            }
        }
        console.log('📋 [fetchArticleBySlug] Extracted article ID:', articleId);
        
        const response = await api.news.getNewsById(token, slug); // Pass the full slug to the API
        console.log('✅ [fetchArticleBySlug] API response:', response);
        
        if (!response.success || !response.data) {
            console.log('❌ [fetchArticleBySlug] Article not found or API error');
            return null;
        }
        
        const articleData = response.data;
        
        // Transform API response to match Article interface
        const article: Article = {
            id: articleData.id,
            slug: slug,
            category: articleData.category,
            source: articleData.source,
            time: formatRelativeTime(articleData.datetime),
            title: articleData.headline || articleData.title,
            description: articleData.summary || articleData.description,
            content: articleData.content,
            author: articleData.author,
            publishDate: articleData.publishDate,
            readTime: articleData.readTime,
            heroImage: articleData.heroImage || articleData.image,
            tags: articleData.tags || [],
            uuid: articleData.uuid,
            headline: articleData.headline,
            summary: articleData.summary,
            datetime: articleData.datetime,
            image: articleData.image,
            url: articleData.url,
            related: articleData.related
        };
        
        console.log('✅ [fetchArticleBySlug] Transformed article:', article);
        return article;
    } catch (error: any) {
        console.error('❌ [fetchArticleBySlug] Error fetching article:', error);
        return null;
    }
}

// Function to fetch related articles from API
async function fetchRelatedArticles(currentId: number, category: string, token: string): Promise<RelatedArticle[]> {
    try {
        console.log('🔍 [fetchRelatedArticles] Fetching related articles for category:', category);
        
        let response;
        
        // Fetch articles based on category
        switch (category.toLowerCase()) {
            case 'crypto':
                response = await api.news.getCryptoNews(token, 10);
                break;
            case 'forex':
                response = await api.news.getForexNews(token, 10);
                break;
            case 'stocks':
                response = await api.news.getStockNews(token, { limit: 10 });
                break;
            default:
                response = await api.news.getMarketNews(token, { limit: 10 });
        }
        
        console.log('✅ [fetchRelatedArticles] API response:', response);
        
        if (!response.success || !response.data) {
            console.log('❌ [fetchRelatedArticles] No related articles found');
            return [];
        }
        
        // Filter out current article and transform to RelatedArticle format
        const relatedArticles = response.data
            .filter((article: any) => article.id !== currentId)
            .slice(0, 3)
            .map((article: any) => ({
                id: article.id,
                slug: article.slug || `news-${article.id}`, // Use API-provided slug or fallback
                title: article.headline,
                excerpt: (article.summary || article.description || '').substring(0, 100) + '...',
                category: article.category
            }));
        
        console.log('✅ [fetchRelatedArticles] Transformed related articles:', relatedArticles);
        return relatedArticles;
    } catch (error: any) {
        console.error('❌ [fetchRelatedArticles] Error fetching related articles:', error);
        return [];
    }
}

// Page Component
export default function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
    // Unwrap the params Promise using React.use()
    const { slug } = use(params);
    const { token, isLoading: authLoading } = useAuth();
    
    const [article, setArticle] = useState<Article | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function loadData() {
            if (!token || authLoading) {
                console.log('🔒 [loadData] Waiting for authentication...');
                return;
            }
            
            try {
                console.log('🚀 [loadData] Starting to load article data for slug:', slug);
                setLoading(true);
                setError('');
                
                const articleData = await fetchArticleBySlug(slug, token);

                if (!articleData) {
                    console.log('❌ [loadData] Article not found, redirecting to 404');
                    notFound();
                    return;
                }

                setArticle(articleData);
                console.log('✅ [loadData] Article loaded successfully');

                // Fetch related articles
                const related = await fetchRelatedArticles(articleData.id, articleData.category, token);
                setRelatedArticles(related);
                console.log('✅ [loadData] Related articles loaded');
            } catch (error: any) {
                console.error('❌ [loadData] Error loading article:', error);
                setError(error.message || 'Failed to load article');
            } finally {
                setLoading(false);
                console.log('🏁 [loadData] Load completed');
            }
        }

        loadData();
    }, [slug, token, authLoading]);

    // Show loading state while authenticating or loading article
    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-emerald-500 mx-auto mb-4" />
                    <p className="text-slate-400">
                        {authLoading ? 'Authenticating...' : 'Loading article...'}
                    </p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-400 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-white mb-2">Error Loading Article</h1>
                    <p className="text-slate-400 mb-4">{error}</p>
                    <Link 
                        href="/dashboard/news"
                        className="inline-block px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                    >
                        Back to News
                    </Link>
                </div>
            </div>
        );
    }

    // Redirect to 404 if no article found
    if (!article) {
        notFound();
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950">
            {/* Header */}
            <header className="border-b border-white/10 px-6 py-4 bg-slate-900/50">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="text-sm text-slate-400">
                        <Link href="/dashboard/news" className="hover:text-white">News</Link>
                        {' '}/{' '}
                        <span className="text-white">{article.category}</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-white/10 rounded text-sm text-slate-300 hover:bg-white/5 transition">
                            Share
                        </button>
                        <button className="px-4 py-2 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-500/90 transition">
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
                            <span className="text-sm text-slate-400 uppercase tracking-wide font-semibold">
                                {article.category}
                            </span>
                            <h1 className="text-4xl font-bold mt-2 mb-4 leading-tight text-white">
                                {article.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                                <span className="font-medium text-white">{article.author}</span>
                                <span>•</span>
                                <time>{article.publishDate}</time>
                                <span>•</span>
                                <span>{article.readTime} min read</span>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative w-full h-96 mb-8 bg-slate-800 rounded-lg overflow-hidden border border-white/10">
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
                            <p className="text-lg leading-relaxed text-slate-300 mb-6">
                                {article.content}
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10">
                            {article.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-white/5 text-sm rounded-full text-slate-300 hover:bg-white/10 transition cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Source Info */}
                        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-xs text-slate-400">
                                <span className="font-semibold text-white">Source:</span> {article.source} • Published {article.time}
                            </p>
                        </div>
                    </article>

                    {/* Right Sidebar */}
                    <aside className="w-80 space-y-6">
                        {/* Trending Stocks Widget */}
                        <TrendingStocksWidget />

                        {/* Related Articles */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-white">Similar articles</h3>

                            {relatedArticles.length > 0 ? (
                                relatedArticles.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/dashboard/news/${related.slug}`}
                                        className="block p-4 border border-white/10 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm hover:bg-white/5 hover:border-white/20 transition"
                                    >
                                        <h4 className="text-sm font-medium mb-1 text-white">{related.title}</h4>
                                        <p className="text-xs text-slate-400 line-clamp-2">{related.excerpt}</p>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-sm text-slate-400 p-4 border border-white/10 rounded-lg bg-white/5">
                                    No related articles found.
                                </p>
                            )}
                        </div>

                        {/* Newsletter Signup */}
                        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 rounded-lg p-4 border border-emerald-500/20">
                            <h3 className="text-white font-semibold text-sm mb-2">Stay Updated</h3>
                            <p className="text-slate-300 text-xs mb-4">
                                Get the latest market news and analysis delivered to your inbox.
                            </p>
                            <div className="space-y-2">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                                />
                                <button className="w-full px-4 py-2 bg-emerald-500 text-white rounded text-sm font-medium hover:bg-emerald-600 transition">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-slate-400 text-xs mt-2">
                                No spam, unsubscribe anytime.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
