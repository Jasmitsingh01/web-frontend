"use client"

import dynamic from "next/dynamic"
import { Props as ChartProps } from "react-apexcharts"

// Dynamically import Chart with SSR disabled
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

interface ChartCardProps {
    title: string
    options: ChartProps["options"]
    series: ChartProps["series"]
    type: ChartProps["type"]
    height?: number
    actions?: React.ReactNode
}

export function ChartCard({ title, options, series, type, height = 250, actions }: ChartCardProps) {
    return (
        <div className="border border-white/5 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                {actions && (
                    <div className="flex gap-1">
                        {actions}
                    </div>
                )}
            </div>
            <Chart options={options} series={series} type={type} height={height} />
        </div>
    )
}
