import React, { ReactNode } from 'react';
import { TableToolbar } from './TableToolbar';
import { Pagination } from './Pagination';

interface DataTableProps {
  // Toolbar props
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
  additionalActions?: ReactNode;

  // Pagination props
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;

  // Table content
  children: ReactNode;

  // Container props
  className?: string;
  minHeight?: string;
}

/**
 * DataTable - 数据表格容器组件
 * 
 * 基于"安全虚拟交换机"页面规范封装的完整表格容器
 * 包含：工具栏（搜索、筛选、导出、刷新、创建）+ 表格内容 + 分页
 * 
 * @example
 * <DataTable
 *   searchPlaceholder="搜索实例..."
 *   createButtonText="创建实例"
 *   currentPage={1}
 *   totalPages={5}
 *   pageSize={10}
 *   totalItems={50}
 *   onPageChange={setCurrentPage}
 *   onPageSizeChange={setPageSize}
 *   onCreateClick={() => console.log('创建')}
 * >
 *   <table className="w-full">
 *     <thead>...</thead>
 *     <tbody>...</tbody>
 *   </table>
 * </DataTable>
 */
export function DataTable({
  searchPlaceholder,
  onSearchChange,
  onFilterClick,
  onExportClick,
  onRefreshClick,
  onCreateClick,
  createButtonText,
  showFilter = true,
  showExport = true,
  showRefresh = true,
  showCreate = true,
  additionalActions,
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  children,
  className = '',
  minHeight = 'calc(100vh-360px)',
}: DataTableProps) {
  return (
    <div
      className={`border border-gray-200/60 rounded bg-white shadow-sm flex flex-col overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {/* Toolbar */}
      <TableToolbar
        searchPlaceholder={searchPlaceholder}
        onSearchChange={onSearchChange}
        onFilterClick={onFilterClick}
        onExportClick={onExportClick}
        onRefreshClick={onRefreshClick}
        onCreateClick={onCreateClick}
        createButtonText={createButtonText}
        showFilter={showFilter}
        showExport={showExport}
        showRefresh={showRefresh}
        showCreate={showCreate}
        additionalActions={additionalActions}
      />

      {/* Table Content */}
      <div style={{ padding: '0 10px' }} className="overflow-x-auto">
        {children}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
