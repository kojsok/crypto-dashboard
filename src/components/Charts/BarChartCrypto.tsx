
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
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
import { useCryptoDataHistory } from "../Api/useCryptoData"
import { useEffect, useState } from "react"
export const description = "A bar chart with a label"
// const chartData = [
//   { month: "January", desktop: 43000000 },
//   { month: "February", desktop: 47500000 },
//   { month: "March", desktop: 64000000 },
//   { month: "April", desktop: 73000000 },
//   { month: "May", desktop: 23000000 },
//   { month: "June", desktop: 41000000 },
//   { month: "July", desktop: 49000000 },
//   { month: "Augost", desktop: 51000000 },
//   { month: "September", desktop: 61000000 },
//   { month: "November", desktop: 71000000 },
//   { month: "December", desktop: 61000000 },
// ]
const chartConfig = {
  desktop: {
    label: "Bitcoin",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function BarChartCrytpo() {
  const { data: chartDataHistory } = useCryptoDataHistory();
  const [chartData, setChartData] = useState<{ price: string; timestamp: number; }[]>([]);

  useEffect(() => {
    // Проверяем, если данные есть, тогда обновляем состояние
    if (chartDataHistory) {
      setChartData(chartDataHistory);
    }
  }, [chartDataHistory]); // Добавляем зависимость


  return (
   
      //!!!
      <Card>
      <CardHeader>
        <CardTitle>Bitcoin 12 month statistic</CardTitle>
        <CardDescription>Showing total price for the last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="price"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="price" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>


      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}