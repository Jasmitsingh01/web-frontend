'use client'

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/lib/api"
import { NewsCard } from "@/components/dashboard/NewsCard"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Types for news data
interface NewsArticle {
    id: number
    category: string
    datetime: number
    headline: string
    image: string
    related: string
    source: string
    summary: string
    url: string
    slug?: string // Optional for backward compatibility
}

interface TrendingStock {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
}

interface EconomicEvent {
    time: string
    event: string
    impact: string
}

export default function MarketNews() {
    const { token, isLoading: authLoading } = useAuth()
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["All Assets"])
    const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>([])
    const [selectedRegion, setSelectedRegion] = useState<string>("")
    const [isPersonalizeModalOpen, setIsPersonalizeModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    // Loading states
    const [isLoadingNews, setIsLoadingNews] = useState(true)
    const [isLoadingTrending, setIsLoadingTrending] = useState(true)
    const [isLoadingCalendar, setIsLoadingCalendar] = useState(true)
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    // Data states
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
    const [trendingStocks, setTrendingStocks] = useState<TrendingStock[]>([])
    const [economicEvents, setEconomicEvents] = useState<EconomicEvent[]>([])
    const [error, setError] = useState<string>("")
    const [hasMore, setHasMore] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    // Category filters
    const categories = ["All Assets", "Breaking", "Analysis", "Forecast"]
    const assetTypes = ["Bitcoin", "Forex", "Crypto", "Stocks"]
    const regions = ["US", "Europe", "Asia", "Global"]

    // Helper function to format datetime to relative time
    const formatRelativeTime = (datetime: number) => {
        const now = Date.now() / 1000
        const diff = now - datetime
        const hours = Math.floor(diff / 3600)
        const days = Math.floor(diff / 86400)
        
        if (days > 0) return `${days}d ago`
        if (hours > 0) return `${hours}h ago`
        return "Just now"
    }

    // Transform backend news data to match NewsCard component expectations
    const transformNewsArticle = (article: NewsArticle) => ({
        slug: article.slug || `news-${article.id}`, // Use API-provided slug or fallback to old format
        category: article.category.toUpperCase(),
        source: article.source,
        time: formatRelativeTime(article.datetime),
        title: article.headline,
        description: article.summary,
        tags: article.related ? article.related.split(',').slice(0, 3) : [],
        reactions: { smiling: 0, cool: 0 },
        image: article.image,
        url: article.url
    })

    // Fetch news data based on selected categories
    const fetchNewsData = async () => {
        if (!token) {
            console.log('🔒 [fetchNewsData] No token available, skipping fetch')
            return
        }

        console.log('📰 [fetchNewsData] Starting news fetch with filters:', {
            selectedCategories,
            selectedAssetTypes,
            selectedRegion,
            searchQuery
        })

        try {
            setIsLoadingNews(true)
            setError("")

            let newsData: any = { data: [] }

            if (selectedCategories.includes("All Assets")) {
                console.log('🌍 [fetchNewsData] Fetching All Assets news...')
                const params = { 
                    category: 'general', 
                    limit: 20,
                    region: selectedRegion || undefined
                }
                console.log('📋 [fetchNewsData] All Assets params:', params)
                newsData = await api.news.getMarketNews(token, params)
                console.log('✅ [fetchNewsData] All Assets response:', newsData)
            } else if (selectedCategories.includes("Breaking")) {
                console.log('⚡ [fetchNewsData] Fetching Breaking news...')
                newsData = await api.news.getBreakingNews(token)
                console.log('✅ [fetchNewsData] Breaking news response:', newsData)
            } else if (selectedCategories.includes("Analysis")) {
                console.log('📊 [fetchNewsData] Fetching Analysis news...')
                const params = { 
                    category: 'general', 
                    limit: 20 
                }
                console.log('📋 [fetchNewsData] Analysis params:', params)
                newsData = await api.news.getMarketNews(token, params)
                console.log('✅ [fetchNewsData] Analysis response:', newsData)
            } else if (selectedCategories.includes("Forecast")) {
                console.log('🔮 [fetchNewsData] Fetching Forecast news...')
                const params = { 
                    category: 'general', 
                    limit: 20 
                }
                console.log('📋 [fetchNewsData] Forecast params:', params)
                newsData = await api.news.getMarketNews(token, params)
                console.log('✅ [fetchNewsData] Forecast response:', newsData)
            }

            // Fetch asset-specific news if filters are selected
            if (selectedAssetTypes.length > 0) {
                console.log('🎯 [fetchNewsData] Fetching asset-specific news for:', selectedAssetTypes)
                const assetNews = []
                for (const assetType of selectedAssetTypes) {
                    console.log(`📈 [fetchNewsData] Fetching ${assetType} news...`)
                    let data
                    switch (assetType.toLowerCase()) {
                        case 'crypto':
                        case 'bitcoin':
                            data = await api.news.getCryptoNews(token, 10)
                            console.log(`✅ [fetchNewsData] ${assetType} crypto response:`, data)
                            break
                        case 'forex':
                            data = await api.news.getForexNews(token, 10)
                            console.log(`✅ [fetchNewsData] ${assetType} forex response:`, data)
                            break
                        case 'stocks':
                            data = await api.news.getStockNews(token, { limit: 10 })
                            console.log(`✅ [fetchNewsData] ${assetType} stocks response:`, data)
                            break
                        default:
                            console.log(`⚠️ [fetchNewsData] Unknown asset type: ${assetType}`)
                            continue
                    }
                    if (data?.data) {
                        console.log(`📊 [fetchNewsData] Adding ${data.data.length} articles from ${assetType}`)
                        assetNews.push(...data.data)
                    }
                }
                if (assetNews.length > 0) {
                    console.log(`🔄 [fetchNewsData] Using asset-specific news (${assetNews.length} articles)`)
                    newsData = { data: assetNews }
                } else {
                    console.log('⚠️ [fetchNewsData] No asset-specific news found')
                }
            }

            console.log('📝 [fetchNewsData] Final news data:', newsData)
            console.log(`📊 [fetchNewsData] Setting ${newsData.data?.length || 0} articles`)
            setNewsArticles(newsData.data || [])
        } catch (err: any) {
            console.error('❌ [fetchNewsData] Error fetching news:', err)
            console.error('❌ [fetchNewsData] Error details:', {
                message: err.message,
                status: err.status,
                response: err.response?.data
            })
            setError(err.message || 'Failed to fetch news')
        } finally {
            console.log('🏁 [fetchNewsData] Fetch completed')
            setIsLoadingNews(false)
        }
    }

    // Fetch trending stocks
    const fetchTrendingStocks = async () => {
        if (!token) {
            console.log('🔒 [fetchTrendingStocks] No token available, skipping fetch')
            return
        }

        console.log('📈 [fetchTrendingStocks] Starting trending stocks fetch...')
        try {
            setIsLoadingTrending(true)
            const data = await api.news.getTrendingStocks(token)
            console.log('✅ [fetchTrendingStocks] Raw API response:', data)
            console.log('📊 [fetchTrendingStocks] Trending stocks data:', data.data)
            console.log(`📈 [fetchTrendingStocks] Setting ${data.data?.length || 0} trending stocks`)
            setTrendingStocks(data.data || [])
        } catch (err: any) {
            console.error('❌ [fetchTrendingStocks] Error fetching trending stocks:', err)
            console.error('❌ [fetchTrendingStocks] Error details:', {
                message: err.message,
                status: err.status,
                response: err.response?.data
            })
        } finally {
            console.log('🏁 [fetchTrendingStocks] Fetch completed')
            setIsLoadingTrending(false)
        }
    }

    // Fetch economic calendar
    const fetchEconomicCalendar = async () => {
        if (!token) {
            console.log('🔒 [fetchEconomicCalendar] No token available, skipping fetch')
            return
        }

        console.log('📅 [fetchEconomicCalendar] Starting economic calendar fetch...')
        try {
            setIsLoadingCalendar(true)
            const data = await api.news.getEconomicCalendar(token)
            console.log('✅ [fetchEconomicCalendar] Raw API response:', data)
            console.log('📊 [fetchEconomicCalendar] Economic calendar raw data:', data.data)
            
            // Transform economic calendar data to match expected format
            const events = (data.data || []).map((event: any, index: number) => {
                console.log(`🔄 [fetchEconomicCalendar] Transforming event ${index}:`, event)
                const transformed = {
                    time: new Date(event.time || event.datetime || event.published_at).toLocaleDateString(),
                    event: event.event || event.name || event.headline || 'Economic Event',
                    impact: event.impact || 'medium'
                }
                console.log(`✅ [fetchEconomicCalendar] Transformed event ${index}:`, transformed)
                return transformed
            })
            
            console.log('📊 [fetchEconomicCalendar] Final transformed events:', events)
            console.log(`📅 [fetchEconomicCalendar] Setting ${events.length} economic events`)
            setEconomicEvents(events)
        } catch (err: any) {
            console.error('❌ [fetchEconomicCalendar] Error fetching economic calendar:', err)
            console.error('❌ [fetchEconomicCalendar] Error details:', {
                message: err.message,
                status: err.status,
                response: err.response?.data
            })
        } finally {
            console.log('🏁 [fetchEconomicCalendar] Fetch completed')
            setIsLoadingCalendar(false)
        }
    }

    // Search news
    const handleSearch = async (query: string) => {
        if (!token || !query.trim()) {
            console.log('🔒 [handleSearch] No token or empty query, skipping search')
            return
        }

        console.log('🔍 [handleSearch] Starting news search for:', query)
        try {
            setIsLoadingNews(true)
            const params = { limit: 20 }
            console.log('📋 [handleSearch] Search params:', { query, params })
            const data = await api.news.searchNews(token, query, params)
            console.log('✅ [handleSearch] Search response:', data)
            console.log('📊 [handleSearch] Search results:', data.data)
            console.log(`🔍 [handleSearch] Setting ${data.data?.length || 0} search results`)
            setNewsArticles(data.data || [])
        } catch (err: any) {
            console.error('❌ [handleSearch] Error searching news:', err)
            console.error('❌ [handleSearch] Error details:', {
                message: err.message,
                status: err.status,
                response: err.response?.data
            })
            setError(err.message || 'Failed to search news')
        } finally {
            console.log('🏁 [handleSearch] Search completed')
            setIsLoadingNews(false)
        }
    }

    // Load more news
    const loadMoreNews = async () => {
        if (!token || isLoadingMore || !hasMore) {
            console.log('🔒 [loadMoreNews] Cannot load more:', { token: !!token, isLoadingMore, hasMore })
            return
        }

        console.log('📄 [loadMoreNews] Loading more news, current page:', currentPage)
        try {
            setIsLoadingMore(true)
            const params = { 
                category: 'general', 
                limit: 10 
            }
            console.log('📋 [loadMoreNews] Load more params:', params)
            const data = await api.news.getMarketNews(token, params)
            console.log('✅ [loadMoreNews] Load more response:', data)
            console.log('📊 [loadMoreNews] Additional articles:', data.data)
            
            if (data.data && data.data.length > 0) {
                console.log(`📄 [loadMoreNews] Adding ${data.data.length} more articles`)
                setNewsArticles(prev => {
                    const updated = [...prev, ...data.data]
                    console.log(`📊 [loadMoreNews] Total articles now: ${updated.length}`)
                    return updated
                })
                setCurrentPage(prev => prev + 1)
            } else {
                console.log('🏁 [loadMoreNews] No more articles available')
                setHasMore(false)
            }
        } catch (err: any) {
            console.error('❌ [loadMoreNews] Error loading more news:', err)
            console.error('❌ [loadMoreNews] Error details:', {
                message: err.message,
                status: err.status,
                response: err.response?.data
            })
        } finally {
            console.log('🏁 [loadMoreNews] Load more completed')
            setIsLoadingMore(false)
        }
    }

    // Initial data fetch
    useEffect(() => {
        console.log('🚀 [useEffect-Initial] Auth state changed:', { token: !!token, authLoading })
        if (token && !authLoading) {
            console.log('🎯 [useEffect-Initial] Starting initial data fetch...')
            fetchNewsData()
            fetchTrendingStocks()
            fetchEconomicCalendar()
        }
    }, [token, authLoading])

    // Refetch news when filters change
    useEffect(() => {
        console.log('🔄 [useEffect-Filters] Filters changed:', {
            selectedCategories,
            selectedAssetTypes,
            selectedRegion,
            token: !!token,
            authLoading
        })
        if (token && !authLoading) {
            console.log('🎯 [useEffect-Filters] Refetching news due to filter change...')
            fetchNewsData()
        }
    }, [selectedCategories, selectedAssetTypes, selectedRegion])

    // Handle search
    useEffect(() => {
        console.log('🔍 [useEffect-Search] Search query changed:', searchQuery)
        if (searchQuery.trim()) {
            console.log('⏱️ [useEffect-Search] Setting up debounced search...')
            const debounceTimer = setTimeout(() => {
                console.log('🎯 [useEffect-Search] Executing debounced search...')
                handleSearch(searchQuery)
            }, 500)
            return () => {
                console.log('🚫 [useEffect-Search] Clearing debounce timer')
                clearTimeout(debounceTimer)
            }
        } else if (token) {
            console.log('🔄 [useEffect-Search] Empty search, fetching regular news...')
            fetchNewsData()
        }
    }, [searchQuery])

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white">
            <div className="max-w-[1600px] mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-1 text-white">Market news</h1>
                    <p className="text-sm text-slate-400">Latest headlines, news events, and asset-specific insights</p>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Section - News Articles */}
                    <div className="col-span-8">
                        {/* Category Filters */}
                        <div className="flex items-center gap-2 mb-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${selectedCategories.includes(cat)
                                        ? 'bg-emerald-500 text-white hover:bg-emerald-500/90'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                    onClick={() => {
                                        if (selectedCategories.includes(cat)) {
                                            setSelectedCategories(selectedCategories.filter(c => c !== cat))
                                        } else {
                                            setSelectedCategories([...selectedCategories, cat])
                                        }
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search headlines, tickers, or locations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}

                        {/* News Articles List */}
                        <div className="space-y-4">
                            {isLoadingNews ? (
                                // Loading state
                                <div className="space-y-4">
                                    {[...Array(5)].map((_, idx) => (
                                        <div key={idx} className="animate-pulse">
                                            <div className="bg-white/5 rounded-lg p-4 space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-4 bg-white/10 rounded w-16"></div>
                                                    <div className="h-4 bg-white/10 rounded w-20"></div>
                                                    <div className="h-4 bg-white/10 rounded w-12"></div>
                                                </div>
                                                <div className="h-6 bg-white/10 rounded w-3/4"></div>
                                                <div className="h-4 bg-white/10 rounded w-full"></div>
                                                <div className="h-4 bg-white/10 rounded w-2/3"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : newsArticles.length > 0 ? (
                                newsArticles.map((article, idx) => (
                                    <NewsCard key={`${article.id}-${idx}`} article={transformNewsArticle(article)} />
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-slate-400">No news articles found</p>
                                    {searchQuery && (
                                        <button 
                                            onClick={() => setSearchQuery("")}
                                            className="mt-2 text-emerald-400 hover:text-emerald-300 text-sm"
                                        >
                                            Clear search and try again
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Load More */}
                        {!isLoadingNews && newsArticles.length > 0 && hasMore && (
                            <div className="mt-6 text-center">
                                <button 
                                    onClick={loadMoreNews}
                                    disabled={isLoadingMore}
                                    className="px-6 py-2 bg-white/5 text-slate-300 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                                >
                                    {isLoadingMore && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {isLoadingMore ? 'Loading...' : 'Load more headlines'}
                                </button>
                            </div>
                        )}

                        <p className="text-xs text-slate-500 text-center mt-4">
                            Headlines are delayed by up to 5-7 minutes depending on your data package
                        </p>
                    </div>

                    {/* Middle Column - Filters */}
                    <div className="col-span-2">
                        <div className="sticky top-6">
                            {/* Filter Header */}
                            <div className="mb-4 pb-3 border-b border-white/10">
                                <Button
                                    className="w-full bg-emerald-500 text-white hover:bg-emerald-500/90 text-xs font-medium"
                                    onClick={() => setIsPersonalizeModalOpen(true)}
                                >
                                    Personalize feeds
                                </Button>
                            </div>

                            {/* Filter by asset and region */}
                            <div className="mb-6">
                                <h3 className="text-sm font-bold mb-3 text-white">Filter by asset and region</h3>
                                <p className="text-xs text-slate-400 mb-3">Choose asset classes</p>

                                {/* Asset Type Checkboxes */}
                                <div className="space-y-2 mb-4">
                                    {assetTypes.map((asset) => (
                                        <label key={asset} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedAssetTypes.includes(asset)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedAssetTypes([...selectedAssetTypes, asset])
                                                    } else {
                                                        setSelectedAssetTypes(selectedAssetTypes.filter(a => a !== asset))
                                                    }
                                                }}
                                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500/50"
                                            />
                                            <span className="text-xs text-slate-300 group-hover:text-white transition">{asset}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Region Pills */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {regions.map((region) => (
                                        <button
                                            key={region}
                                            onClick={() => setSelectedRegion(selectedRegion === region ? "" : region)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                                                selectedRegion === region
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            {region}
                                        </button>
                                    ))}
                                </div>

                                {/* More Filters */}
                                <div className="space-y-2">
                                    {["Crypto news", "Analysis", "Forex", "Economics"].map((filter) => (
                                        <button
                                            key={filter}
                                            className="w-full text-left px-3 py-2 bg-white/5 text-slate-300 rounded text-xs font-medium hover:bg-white/10 hover:text-white transition"
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Advanced filters link */}
                            <div className="text-xs text-slate-500 mb-4">
                                Apply advanced filters or save dashboard preferences.
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Trending & Calendar */}
                    <div className="col-span-2">
                        <div className="sticky top-6 space-y-6">
                         
                            {/* Economic Calendar */}
                            <div className="border border-white/10 rounded-lg p-4 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
                                <h3 className="text-sm font-bold mb-3 text-white">Economic Calendar</h3>
                                
                                {isLoadingCalendar ? (
                                    <div className="space-y-3">
                                        {[...Array(4)].map((_, idx) => (
                                            <div key={idx} className="animate-pulse">
                                                <div className="h-3 bg-white/10 rounded w-20 mb-1"></div>
                                                <div className="h-4 bg-white/10 rounded w-full mb-1"></div>
                                                <div className="h-3 bg-white/10 rounded w-16"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : economicEvents.length > 0 ? (
                                    <div className="space-y-3">
                                        {economicEvents.map((event, idx) => (
                                            <div key={idx} className="pb-3 border-b border-white/5 last:border-0">
                                                <div className="text-xs text-slate-400 mb-1">{event.time}</div>
                                                <div className="text-sm text-slate-300 mb-1">{event.event}</div>
                                                <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                                                    event.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                                                    event.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-green-500/20 text-green-400'
                                                }`}>
                                                    {event.impact} impact
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-400">No economic events available</p>
                                )}
                            </div>

                            {/* Related Articles */}
                            <div className="border border-white/10 rounded-lg p-4 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
                                <h3 className="text-sm font-bold mb-3 text-white">Related Articles</h3>
                                <p className="text-xs text-slate-400 mb-3">Latest analysis from our team</p>

                                <div className="space-y-3">
                                    {newsArticles.slice(0, 3).map((article, idx) => (
                                        <div key={idx} className="pb-3 border-b border-white/5 last:border-0">
                                            <div className="text-sm text-slate-300 hover:text-emerald-400 cursor-pointer mb-1 transition line-clamp-2">
                                                {article.headline}
                                            </div>
                                            <div className="text-xs text-slate-500">{formatRelativeTime(article.datetime)}</div>
                                        </div>
                                    ))}
                                    {newsArticles.length === 0 && !isLoadingNews && (
                                        <p className="text-xs text-slate-400">No articles available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personalize Modal */}
            <Modal
                isOpen={isPersonalizeModalOpen}
                onClose={() => setIsPersonalizeModalOpen(false)}
                title="Personalize Your Feed"
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-400">Select topics and regions to customize your news feed.</p>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Topics</label>
                        <div className="flex flex-wrap gap-2">
                            {["Technology", "Finance", "Crypto", "Energy", "Healthcare"].map(topic => (
                                <button key={topic} className="px-3 py-1 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 rounded-full text-xs text-slate-300 transition">
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsPersonalizeModalOpen(false)}>Cancel</Button>
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => {
                            alert("Preferences saved!");
                            setIsPersonalizeModalOpen(false);
                        }}>Save Preferences</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
