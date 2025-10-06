'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ChartData = {
  time: string;
  'Gemini 1.5': number;
  'Other Models': number;
};

const generateInitialData = (): ChartData[] => {
  const data: ChartData[] = [];
  const now = new Date();
  for (let i = 9; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      'Gemini 1.5': Math.floor(Math.random() * (150 - 50 + 1)) + 50,
      'Other Models': Math.floor(Math.random() * (120 - 30 + 1)) + 30,
    });
  }
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Time
            </span>
            <span className="font-bold text-muted-foreground">{label}</span>
          </div>
          {payload.map((item: any) => (
            <div key={item.name} className="flex flex-col space-y-1">
              <span className="text-[0.70rem] uppercase" style={{ color: item.color }}>
                {item.name}
              </span>
              <span className="font-bold" style={{ color: item.color }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function StatsChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    setData(generateInitialData());
    const interval = setInterval(() => {
      setData(prevData => {
        const now = new Date();
        const newDataPoint: ChartData = {
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          'Gemini 1.5': Math.floor(Math.random() * (150 - 50 + 1)) + 50,
          'Other Models': Math.floor(Math.random() * (120 - 30 + 1)) + 30,
        };
        return [...prevData.slice(1), newDataPoint];
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);
  
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorGemini" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorOther" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
        <XAxis
          dataKey="time"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value, index) => index % 2 === 0 ? value : ''}
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={value => `${value}`}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
        />
        <Area
          type="monotone"
          dataKey="Gemini 1.5"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorGemini)"
        />
        <Area
          type="monotone"
          dataKey="Other Models"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorOther)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
