import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface TrendDataPoint {
  date: string;
  newVideos: number;
  newAnalyses: number;
  events: number;
  newUsers: number;
}

interface TrendChartProps {
  data: TrendDataPoint[];
}

const LINE_COLORS = {
  newVideos: 'var(--color-accent)',
  newAnalyses: 'var(--color-success)',
  events: 'var(--color-warning)',
  newUsers: 'var(--color-text-tertiary)',
};

function formatDateLabel(val: string): string {
  const d = new Date(val);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function formatTooltipLabel(val: unknown): string {
  if (typeof val !== 'string') return '';
  const d = new Date(val);
  return d.toLocaleDateString();
}

export default function TrendChart({ data }: TrendChartProps) {
  const { t } = useTranslation();

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
        >
          <CartesianGrid stroke="var(--color-border-subtle)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatDateLabel}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--card-radius)',
              fontSize: 13,
            }}
            labelFormatter={formatTooltipLabel as (label: unknown) => ReactNode}
          />
          <Legend
            wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
          />
          <Line
            type="monotone"
            dataKey="newVideos"
            name={t('report.trendNewVideos')}
            stroke={LINE_COLORS.newVideos}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="newAnalyses"
            name={t('report.trendNewAnalyses')}
            stroke={LINE_COLORS.newAnalyses}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="events"
            name={t('report.trendEvents')}
            stroke={LINE_COLORS.events}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="newUsers"
            name={t('report.trendNewUsers')}
            stroke={LINE_COLORS.newUsers}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
