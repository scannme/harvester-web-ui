import React from 'react';

interface StatusPillProps {
  status: string;
  type?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

const statusStyles = {
  success: 'bg-emerald-50/80 text-emerald-700 border-emerald-100/50',
  warning: 'bg-amber-50/80 text-amber-700 border-amber-100/50',
  error: 'bg-rose-50/80 text-rose-700 border-rose-100/50',
  info: 'bg-sky-50/80 text-sky-700 border-sky-100/50',
  default: 'bg-gray-50/80 text-gray-600 border-gray-100/50',
};

const dotStyles = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-rose-500',
  info: 'bg-sky-500',
  default: 'bg-gray-400',
};

export function StatusPill({ status, type = 'default' }: StatusPillProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs leading-[18px] font-medium h-6 ${statusStyles[type]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[type]}`}></span>
      {status}
    </span>
  );
}