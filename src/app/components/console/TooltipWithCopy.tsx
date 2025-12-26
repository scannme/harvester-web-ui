import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';

interface TooltipWithCopyProps {
  text: string;
  children: React.ReactNode;
  maxWidth?: number;
  alwaysShow?: boolean;  // 新增：是否总是显示tooltip
}

export function TooltipWithCopy({ text, children, maxWidth = 50, alwaysShow = false }: TooltipWithCopyProps) {
  const [copied, setCopied] = useState(false);
  const needsTruncate = alwaysShow || text.length > maxWidth;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!needsTruncate) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help">{children}</span>
        </TooltipTrigger>
        <TooltipContent className="max-w-md" sideOffset={8}>
          <div className="flex items-center gap-2.5">
            <p className="text-[13px] leading-[18px] flex-1 select-text break-all font-mono text-gray-700">
              {text}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 flex-shrink-0 hover:bg-gray-100 rounded-md transition-colors"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />
              ) : (
                <Copy className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.5} />
              )}
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}