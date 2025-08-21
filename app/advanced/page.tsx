"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { 
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Label, 
  LabelList, Line, LineChart, Pie, PieChart, PolarGrid, PolarRadiusAxis, 
  RadialBar, RadialBarChart, Sector, XAxis, YAxis, Tooltip, Legend, 
  ResponsiveContainer, PolarAngleAxis, Radar, RadarChart
} from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Данные для интерактивного Line Chart
const interactiveLineData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
]

// Данные для радиальной диаграммы
const radialData = [
  { browser: "Chrome", visitors: 275, fill: "#61DAFB" },
  { browser: "Safari", visitors: 200, fill: "#4FC08D" },
  { browser: "Firefox", visitors: 187, fill: "#FF3E00" },
  { browser: "Edge", visitors: 173, fill: "#DD0031" },
  { browser: "Other", visitors: 90, fill: "#888888" },
]

// Данные для стековой радиальной диаграммы
const stackedRadialData = [{ month: "january", desktop: 1260, mobile: 570 }]

// Данные для интерактивной Pie Chart
const pieMonthlyData = [
  { month: "january", value: 186, fill: "#8884d8" },
  { month: "february", value: 305, fill: "#82ca9d" },
  { month: "march", value: 237, fill: "#ffc658" },
  { month: "april", value: 173, fill: "#ff7c7c" },
  { month: "may", value: 209, fill: "#61DAFB" },
]

export default function AdvancedDashboard() {
  const [activeChart, setActiveChart] = React.useState<"desktop" | "mobile">("desktop")
  const [activeMonth, setActiveMonth] = React.useState(pieMonthlyData[0].month)
  
  const activeIndex = React.useMemo(
    () => pieMonthlyData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  )
  
  const total = React.useMemo(
    () => ({
      desktop: interactiveLineData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: interactiveLineData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  const totalVisitors = stackedRadialData[0].desktop + stackedRadialData[0].mobile

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-muted p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Advanced Charts
          </h1>
          <p className="text-lg text-muted-foreground">
            Интерактивные визуализации с помощью shadcn/ui
          </p>
          <div className="flex justify-center gap-2">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">Interactive</Badge>
            <Badge variant="outline">Real-time</Badge>
            <Badge variant="secondary">Beautiful</Badge>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Interactive Line Chart with Toggle */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Interactive Line Chart</CardTitle>
              <CardDescription>
                Сравнение трафика Desktop vs Mobile
              </CardDescription>
            </div>
            <div className="flex">
              {["desktop", "mobile"].map((key) => {
                const chart = key as "desktop" | "mobile"
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-muted-foreground text-xs capitalize">
                      {chart}
                    </span>
                    <span className="text-2xl leading-none font-bold">
                      {total[chart].toLocaleString()}
                    </span>
                  </button>
                )
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={interactiveLineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
                  }}
                />
                <YAxis />
                <Tooltip />
                <Line
                  dataKey={activeChart}
                  type="monotone"
                  stroke={activeChart === "desktop" ? "#8884d8" : "#82ca9d"}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radial Chart with Labels */}
          <Card>
            <CardHeader>
              <CardTitle>Browser Usage</CardTitle>
              <CardDescription>Радиальная диаграмма с метками</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadialBarChart
                  data={radialData}
                  startAngle={-90}
                  endAngle={270}
                  innerRadius={30}
                  outerRadius={110}
                >
                  <Tooltip />
                  <RadialBar dataKey="visitors" background>
                    <LabelList
                      position="insideStart"
                      dataKey="browser"
                      className="fill-white mix-blend-luminosity"
                      fontSize={11}
                    />
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 leading-none font-medium">
                Top browser: Chrome <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                Based on last 30 days
              </div>
            </CardFooter>
          </Card>

          {/* Interactive Pie Chart */}
          <Card>
            <CardHeader className="flex-row items-start space-y-0 pb-0">
              <div className="grid gap-1">
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Интерактивная круговая диаграмма</CardDescription>
              </div>
              <Select value={activeMonth} onValueChange={setActiveMonth}>
                <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent align="end" className="rounded-xl">
                  {pieMonthlyData.map((item) => (
                    <SelectItem key={item.month} value={item.month} className="rounded-lg">
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className="flex h-3 w-3 shrink-0 rounded-sm"
                          style={{ backgroundColor: item.fill }}
                        />
                        {item.month.charAt(0).toUpperCase() + item.month.slice(1)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="flex justify-center pb-0">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={pieMonthlyData}
                    dataKey="value"
                    nameKey="month"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    strokeWidth={5}
                    activeIndex={activeIndex}
                    activeShape={({
                      outerRadius = 0,
                      ...props
                    }: PieSectorDataItem) => (
                      <g>
                        <Sector {...props} outerRadius={outerRadius + 10} />
                        <Sector
                          {...props}
                          outerRadius={outerRadius + 25}
                          innerRadius={outerRadius + 12}
                        />
                      </g>
                    )}
                  >
                    {pieMonthlyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {pieMonthlyData[activeIndex].value}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Visitors
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Stacked Radial Chart */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>Desktop vs Mobile стековая радиальная диаграмма</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart
                data={stackedRadialData}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
              >
                <Tooltip />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground"
                            >
                              Total Visitors
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="desktop"
                  stackId="a"
                  cornerRadius={5}
                  fill="#8884d8"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="mobile"
                  fill="#82ca9d"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#8884d8]" />
                <span className="text-sm">Desktop: 1,260</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#82ca9d]" />
                <span className="text-sm">Mobile: 570</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Advanced Charts • shadcn/ui • Recharts • Next.js 15</p>
        </div>
      </div>
    </div>
  )
}