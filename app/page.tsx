"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"

// Данные для линейного графика
const lineData = [
  { month: "Янв", продажи: 4000, расходы: 2400 },
  { month: "Фев", продажи: 3000, расходы: 1398 },
  { month: "Мар", продажи: 2000, расходы: 9800 },
  { month: "Апр", продажи: 2780, расходы: 3908 },
  { month: "Май", продажи: 1890, расходы: 4800 },
  { month: "Июн", продажи: 2390, расходы: 3800 },
  { month: "Июл", продажи: 3490, расходы: 4300 },
]

// Данные для столбчатой диаграммы
const barData = [
  { name: "Desktop", value: 45, color: "#8884d8" },
  { name: "Mobile", value: 30, color: "#82ca9d" },
  { name: "Tablet", value: 15, color: "#ffc658" },
  { name: "Other", value: 10, color: "#ff7c7c" },
]

// Данные для круговой диаграммы
const pieData = [
  { name: "React", value: 35, color: "#61DAFB" },
  { name: "Vue", value: 25, color: "#4FC08D" },
  { name: "Angular", value: 20, color: "#DD0031" },
  { name: "Svelte", value: 15, color: "#FF3E00" },
  { name: "Other", value: 5, color: "#888888" },
]

// Данные для радарной диаграммы
const radarData = [
  { skill: "JavaScript", A: 120, B: 110, fullMark: 150 },
  { skill: "TypeScript", A: 98, B: 130, fullMark: 150 },
  { skill: "React", A: 86, B: 130, fullMark: 150 },
  { skill: "Node.js", A: 99, B: 100, fullMark: 150 },
  { skill: "Python", A: 85, B: 90, fullMark: 150 },
  { skill: "SQL", A: 65, B: 85, fullMark: 150 },
]

// Данные для area chart
const areaData = [
  { time: "00:00", users: 200 },
  { time: "04:00", users: 100 },
  { time: "08:00", users: 400 },
  { time: "12:00", users: 800 },
  { time: "16:00", users: 600 },
  { time: "20:00", users: 900 },
  { time: "24:00", users: 300 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Dashboard EMC2
          </h1>
          <p className="text-muted-foreground">
            Визуализация данных с помощью shadcn/ui и Recharts
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">Real-time</Badge>
            <Badge variant="outline">Interactive</Badge>
            <Badge>Beautiful</Badge>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Продажи и Расходы</CardTitle>
              <CardDescription>Динамика за последние 7 месяцев</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="продажи" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="расходы" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Устройства пользователей</CardTitle>
              <CardDescription>Распределение по типам устройств</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Технологический стек</CardTitle>
              <CardDescription>Популярность фреймворков</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Навыки команды</CardTitle>
              <CardDescription>Сравнение компетенций</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 150]} />
                  <Radar name="Team A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Team B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Full Width Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Активность пользователей</CardTitle>
            <CardDescription>Распределение нагрузки в течение дня</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#8884d8" 
                  fill="url(#colorGradient)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Создано с помощью shadcn/ui • Next.js 15 • TypeScript • Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}