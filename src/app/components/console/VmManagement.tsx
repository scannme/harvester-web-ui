import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  MoreHorizontal,
  Server,
  Activity,
  Power,
  Clock,
  AlertTriangle,
  Pause,
  Settings2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { StatCard } from './StatCard';
import { StatusPill } from './StatusPill';
import { TooltipWithCopy } from './TooltipWithCopy';
import { Pagination } from './Pagination';

export function VmManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Mock 数据
  const vms = [
    {
      id: 'vm-001',
      name: 'web-server-prod-01',
      cpu: 4,
      memory: 8,
      storage: 100,
      ip: '192.168.1.101',
      os: 'Ubuntu 22.04',
      status: { text: '运行中', type: 'success' as const },
      uptime: '15天 3小时',
      updateTime: '2024-12-20 10:23:45',
    },
    {
      id: 'vm-002',
      name: 'database-master',
      cpu: 8,
      memory: 16,
      storage: 500,
      ip: '192.168.1.102',
      os: 'CentOS 7.9',
      status: { text: '运行中', type: 'success' as const },
      uptime: '30天 12小时',
      updateTime: '2024-12-19 14:15:22',
    },
    {
      id: 'vm-003',
      name: 'app-backend-test',
      cpu: 2,
      memory: 4,
      storage: 50,
      ip: '192.168.1.103',
      os: 'Debian 11',
      status: { text: '已关机', type: 'default' as const },
      uptime: '-',
      updateTime: '2024-12-18 16:30:11',
    },
    {
      id: 'vm-004',
      name: 'cache-redis-01',
      cpu: 4,
      memory: 16,
      storage: 100,
      ip: '192.168.1.104',
      os: 'Ubuntu 22.04',
      status: { text: '运行中', type: 'success' as const },
      uptime: '7天 18小时',
      updateTime: '2024-12-20 09:45:33',
    },
    {
      id: 'vm-005',
      name: 'dev-test-vm',
      cpu: 2,
      memory: 4,
      storage: 50,
      ip: '192.168.1.105',
      os: 'Ubuntu 20.04',
      status: { text: '创建中', type: 'info' as const },
      uptime: '-',
      updateTime: '2024-12-20 15:12:56',
    },
    {
      id: 'vm-006',
      name: 'monitoring-grafana',
      cpu: 2,
      memory: 8,
      storage: 100,
      ip: '192.168.1.106',
      os: 'Ubuntu 22.04',
      status: { text: '运行中', type: 'success' as const },
      uptime: '45天 6小时',
      updateTime: '2024-12-15 08:20:10',
    },
    {
      id: 'vm-007',
      name: 'backup-service',
      cpu: 2,
      memory: 4,
      storage: 1000,
      ip: '192.168.1.107',
      os: 'CentOS 8',
      status: { text: '已暂停', type: 'warning' as const },
      uptime: '-',
      updateTime: '2024-12-19 12:00:00',
    },
    {
      id: 'vm-008',
      name: 'api-gateway',
      cpu: 4,
      memory: 8,
      storage: 100,
      ip: '192.168.1.108',
      os: 'Ubuntu 22.04',
      status: { text: '异常', type: 'error' as const },
      uptime: '-',
      updateTime: '2024-12-20 14:30:22',
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs leading-[18px] mb-2">
        <span className="text-gray-500">计算资源</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">虚拟机</span>
      </div>

      {/* Page Title & Description */}
      <div className="mb-4">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-8 h-8 bg-[#3b82f6]/6 border border-[#3b82f6]/12 rounded flex items-center justify-center flex-shrink-0">
            <Server className="w-[15px] h-[15px] text-[#3b82f6]/70" strokeWidth={1.5} />
          </div>
          <h1 className="text-[20px] leading-7 font-semibold text-gray-900">虚拟机</h1>
        </div>
        <p className="text-xs leading-5 text-gray-500 font-normal">
          管理和监控集群中的所有虚拟机实例，支持创建、启动、停止、迁移等操作
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <StatCard title="总数" value="48" subtitle="全部虚拟机" icon={Server} statusColor="gray" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <StatCard title="运行中" value="42" subtitle="状态正常" icon={Activity} statusColor="green" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <StatCard title="已关机" value="3" subtitle="待启动" icon={Power} statusColor="gray" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <StatCard title="已暂停" value="1" subtitle="暂时停止" icon={Pause} statusColor="warning" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <StatCard title="创建中" value="1" subtitle="正在初始化" icon={Clock} statusColor="blue" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <StatCard title="异常" value="1" subtitle="需要处理" icon={AlertTriangle} statusColor="red" />
        </div>
      </div>

      {/* List Card */}
      <div className="border border-gray-200/60 rounded bg-white shadow-sm min-h-[calc(100vh-420px)] flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="px-4 py-2.5 border-b border-gray-100/80 flex items-center justify-between gap-4">
          {/* Left: Search */}
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <Search
                className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                strokeWidth={1.5}
              />
              <Input
                placeholder="搜索虚拟机..."
                className="pl-8 h-8 text-sm bg-white border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Filter className="w-3.5 h-3.5 mr-1" strokeWidth={1.5} />
              筛选
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Settings2 className="w-3.5 h-3.5 mr-1" strokeWidth={1.5} />
              批量操作
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Download className="w-3.5 h-3.5 mr-1" strokeWidth={1.5} />
              导出
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Button>
            <Button size="sm" className="h-8 text-xs bg-[#1e40af] hover:bg-[#1e3a8a]">
              <Plus className="w-3.5 h-3.5 mr-1" strokeWidth={1.5} />
              创建虚拟机
            </Button>
          </div>
        </div>

        {/* Table */}
        <div style={{ padding: '0 16px' }} className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="w-10 px-3 py-3">
                  <Checkbox />
                </th>
                <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">名称</th>
                <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">规格</th>
                <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">IP 地址</th>
                <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">操作系统</th>
                <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">状态</th>
                <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">运行时长</th>
                <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">更新时间</th>
                <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {vms.map((vm) => (
                <tr key={vm.id} className="hover:bg-gray-50/30 transition">
                  <td className="px-3 py-3">
                    <Checkbox />
                  </td>
                  <td className="px-3 py-3">
                    <TooltipWithCopy text={vm.name}>
                      <div className="text-sm leading-[22px] text-gray-900 font-mono truncate max-w-[180px]">
                        {vm.name}
                      </div>
                    </TooltipWithCopy>
                  </td>
                  <td className="px-3 py-3">
                    <div className="text-sm leading-[22px] text-gray-600">
                      {vm.cpu}C / {vm.memory}G / {vm.storage}G
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <TooltipWithCopy text={vm.ip} alwaysShow={true}>
                      <div className="font-mono text-sm leading-[22px] text-gray-600">{vm.ip}</div>
                    </TooltipWithCopy>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm leading-[22px] text-gray-600">{vm.os}</span>
                  </td>
                  <td className="px-3 py-3">
                    <StatusPill status={vm.status.text} type={vm.status.type} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="text-sm leading-[22px] text-gray-600 tabular-nums">{vm.uptime}</div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="text-sm leading-[22px] text-gray-600">{vm.updateTime}</div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="link"
                        size="sm"
                        className="h-6 p-0 text-sm leading-6 text-blue-600 hover:text-blue-700"
                      >
                        详情
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded"
                          >
                            <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-28">
                          <DropdownMenuItem className="text-xs">编辑</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs">启动</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs">停止</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs">重启</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs">迁移</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs">克隆</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs text-red-600">删除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={1}
          pageSize={pageSize}
          totalItems={8}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </>
  );
}
