'use client'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Article Not Found</h2>
                    <p className="text-gray-600 mb-8">
                        The article you're looking for doesn't exist or has been removed.
                    </p>
                </div>

                <div className="space-y-3">
                    <a
                        href="/dashboard/news"
                        className="block w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                        Back to News
                    </a>
                    <a
                        href="/dashboard"
                        className="block w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                    >
                        Go to Dashboard
                    </a>
                </div>
            </div>
        </div>
    )
}
