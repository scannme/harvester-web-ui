import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  statusColor?: 'gray' | 'green' | 'yellow' | 'red' | 'blue';
}

const dotColorMap = {
  gray: 'bg-gray-400',
  green: 'bg-emerald-500',
  yellow: 'bg-amber-500',
  red: 'bg-rose-500',
  blue: 'bg-sky-500',
};

const iconColorMap = {
  gray: 'text-gray-400',
  green: 'text-emerald-500',
  yellow: 'text-amber-500',
  red: 'text-rose-500',
  blue: 'text-sky-500',
};

const iconBgMap = {
  gray: 'bg-gray-100',
  green: 'bg-emerald-50',
  yellow: 'bg-amber-50',
  red: 'bg-rose-50',
  blue: 'bg-sky-50',
};

export function StatCard({ title, value, subtitle, icon: Icon, statusColor = 'gray' }: StatCardProps) {
  return (
    <div className="border border-gray-200/60 bg-white px-3 py-2.5 hover:border-gray-300/60 transition-colors rounded shadow-sm">
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-xs leading-[18px] font-medium text-gray-500">{title}</div>
        <div className={`w-6 h-6 ${iconBgMap[statusColor]} rounded flex items-center justify-center`}>
          <Icon className={`w-3.5 h-3.5 ${iconColorMap[statusColor]}`} strokeWidth={1.5} />
        </div>
      </div>
      <div className="text-[24px] leading-7 font-semibold text-gray-900 mb-1">{value}</div>
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${dotColorMap[statusColor]}`}></div>
        <span className="text-xs leading-[18px] text-gray-500">{subtitle}</span>
      </div>
    </div>
  );
}