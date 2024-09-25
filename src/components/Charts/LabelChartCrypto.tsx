"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function LabelChartCrypto() {
  const { data: chartDataHistory } = useCryptoDataHistory();
  const [chartData, setChartData] = useState<{ price: string; timestamp: number; }[]>([]);
  useEffect(() => {
    if (chartDataHistory) {
      // Создаем объект для хранения уникальных записей по месяцам
      const uniqueMonths: { [key: string]: { price: string; timestamp: number; } } = {};

      // Итерируем по данным и добавляем только одну запись для каждого месяца
      chartDataHistory.forEach((item) => {
        const date = new Date(item.timestamp * 1000);
        const monthYearKey = `${date.getFullYear()}-${date.getMonth()}`; // Генерируем ключ на основе года и месяца

        // Если запись за этот месяц еще не добавлена, добавляем
        if (!uniqueMonths[monthYearKey]) {
          uniqueMonths[monthYearKey] = item;
        }
      });

      // Преобразуем объект обратно в массив
      const filteredData = Object.values(uniqueMonths).sort(
        (a, b) => a.timestamp - b.timestamp
      );

      setChartData(filteredData);
    }
  }, [chartDataHistory]);

  // Функция для форматирования timestamp в месяц и год
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // timestamp в секундах, поэтому умножаем на 1000
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Функция для форматирования цены
  const formatPrice = (price: string) => {
    const parsedPrice = parseFloat(price); // Преобразуем строку в число
    return new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parsedPrice);
  };


  return (
    //!!!
    <Card>
      <CardHeader>
        <CardTitle>Bitcoin 12 month statistic</CardTitle>
        <CardDescription>Showing total price for the last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"  //dataKey="price"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // tickFormatter={(value) => value.slice(0, 3)}
              // Используем функцию для форматирования timestamp
              tickFormatter={(timestamp) => formatDate(timestamp)}
            />
            <ChartTooltip
              cursor={false}
              // content={<ChartTooltipContent hideLabel />}
              content={<ChartTooltipContent
                indicator="line"
                formatter={(value) => formatPrice(value as string)} // Форматируем цену в подсказке
              />}
            />
            <Line
              dataKey="price"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
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
