"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple area chart"

const chartData = [
  { month: "January", desktop: 43000000 },
  { month: "February", desktop: 47500000 },
  { month: "March", desktop: 64000000 },
  { month: "April", desktop: 73000000 },
  { month: "May", desktop: 23000000 },
  { month: "June", desktop: 41000000 },
  { month: "July", desktop: 49000000 },
  { month: "Augost", desktop: 51000000 },
  { month: "September", desktop: 61000000 },
  { month: "November", desktop: 71000000 },
  { month: "December", desktop: 61000000 },
]

const chartConfig = {
  desktop: {
    label: "Bitcoin",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ChartCrypto() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bitcoin 12 month statistic</CardTitle>
        <CardDescription>
          Showing total price for the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig} className="h-full " >
          <AreaChart 
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}
