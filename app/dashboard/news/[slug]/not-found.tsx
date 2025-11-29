'use client'

export default function NotFound() {
    return (
        <div className="min-h-screenbg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-white mb-2">404</h1>
                    <h2 className="text-2xl font-semibold text-slate-300 mb-4">Article Not Found</h2>
                    <p className="text-slate-400 mb-8">
                        The article you're looking for doesn't exist or has been removed.
                    </p>
                </div>

                <div className="space-y-3">
                    <a
                        href="/dashboard/news"
                        className="block w-full px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-500/90 transition"
                    >
                        Back to News
                    </a>
                    <a
                        href="/dashboard"
                        className="block w-full px-6 py-3 border border-white/10 text-slate-300 rounded-lg font-medium hover:bg-white/5 transition"
                    >
                        Go to Dashboard
                    </a>
                </div>
            </div>
        </div>
    )
}
