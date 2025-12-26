import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Filter, Download, RefreshCw, Plus } from 'lucide-react';

interface TableToolbarProps {
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
  onExportClick?: () => void;
  onRefreshClick?: () => void;
  onCreateClick?: () => void;
  createButtonText?: string;
  showFilter?: boolean;
  showExport?: boolean;
  showRefresh?: boolean;
  showCreate?: boolean;
  additionalActions?: React.ReactNode;
}

/**
 * TableToolbar - 表格工具栏组件
 * 
 * 基于"安全虚拟交换机"页面规范封装的标准表格操作栏
 * 包含：搜索框、筛选、导出、刷新、创建按钮
 * 
 * @example
 * <TableToolbar
 *   searchPlaceholder="搜索实例..."
 *   onSearchChange={(value) => console.log(value)}
 *   onCreateClick={() => console.log('创建')}
 *   createButtonText="创建实例"
 * />
 */
export function TableToolbar({
  searchPlaceholder = '搜索...',
  onSearchChange,
  onFilterClick,
  onExportClick,
  onRefreshClick,
  onCreateClick,
  createButtonText = '创建',
  showFilter = true,
  showExport = true,
  showRefresh = true,
  showCreate = true,
  additionalActions,
}: TableToolbarProps) {
  return (
    <div className="px-4 py-2.5 border-b border-gray-100/80 flex items-center justify-between gap-4">
      {/* Left: Search - 前移到左侧 */}
      <div className="flex-1 max-w-xs">
        <div className="relative">
          <Search
            className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            strokeWidth={1.5}
          />
          <Input
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-8 h-8 text-sm bg-white border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>
      </div>

      {/* Right: Actions - 32px height */}
      <div className="flex items-center gap-2">
        {showFilter && (
          <Button
            variant="outline"
            size="sm"
            onClick={onFilterClick}
            className="h-8 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Filter className="w-3.5 h-3.5 mr-1" strokeWidth={1.5} />
            筛选
          </Button>
        )}

        {showExport && (
          <Button
            variant="outline"
            size="sm"
            onClick={onExportClick}
            className="h-8 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Download className="w-3.5 h-3.5 mr-1" strokeWidth={1.5} />
            导出
          </Button>
        )}

        {additionalActions}

        {showRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefreshClick}
            className="h-8 w-8 p-0 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Button>
        )}

        {showCreate && (
          <Button
            size="sm"
            onClick={onCreateClick}
            className="h-8 text-xs bg-[#1e40af] hover:bg-[#1e3a8a]"
          >
            <Plus className="w-3.5 h-3.5 mr-1" strokeWidth={1.5} />
            {createButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
