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
  GitBranch,
  Shield,
  Box,
  ShieldCheck,
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

export function SecurityProtection() {
  const [activeTab, setActiveTab] = useState<'assets' | 'serviceChain'>('assets');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 安全资产 Mock 数据
  const securityAssets = [
    {
      id: 'asset-001',
      objectName: 'fw',
      objectType: '自定义',
      protectionScope: { type: 'ip', value: '3.3.3.3' },
      businessDomain: '边界防护域',
      hasTrafficLog: true,
      threatLevel: { high: 0, medium: 0, low: 0 },
    },
    {
      id: 'asset-002',
      objectName: 'web-server-01',
      objectType: '私网服务',
      protectionScope: { type: 'ip', value: '10.0.1.0/24' },
      businessDomain: '生产环境',
      hasTrafficLog: true,
      threatLevel: { high: 3, medium: 7, low: 12 },
    },
    {
      id: 'asset-003',
      objectName: 'database-master',
      objectType: '私网服务',
      protectionScope: { type: 'ip', value: '10.0.2.100' },
      businessDomain: '核心数据域',
      hasTrafficLog: false,
      threatLevel: { high: 8, medium: 15, low: 3 },
    },
    {
      id: 'asset-004',
      objectName: 'api-gateway',
      objectType: '公网域名',
      protectionScope: { type: 'domain', domain: 'api.example.com', ip: '203.0.113.25' },
      businessDomain: 'DMZ区',
      hasTrafficLog: true,
      threatLevel: { high: 0, medium: 2, low: 8 },
    },
    {
      id: 'asset-005',
      objectName: 'file-storage',
      objectType: '私网服务',
      protectionScope: { type: 'ip', value: '10.0.3.50' },
      businessDomain: '内网区域',
      hasTrafficLog: true,
      threatLevel: { high: 1, medium: 5, low: 15 },
    },
  ];

  // 安全服务链 Mock 数据
  const serviceChains = [
    {
      id: 'chain-001',
      name: '南北向流量防护链',
      chainType: '串行',
      protectionTarget: '1',
      securityServices: [
        { name: 'DDoS防护', order: 1 },
        { name: 'WAF', order: 2 },
      ],
      serialStatus: 'normal',
      bypassStatus: 'manual-bypass',
      targetTraffic: '1.2 Gbps',
      sourceTraffic: '1.5 Gbps',
      updateTime: '2024-12-20 10:23:45',
    },
    {
      id: 'chain-002',
      name: '东西向流量检测链',
      chainType: '旁路',
      protectionTarget: '1',
      securityServices: [
        { name: 'IDS', order: 1 },
      ],
      serialStatus: 'manual-bypass',
      bypassStatus: 'normal',
      targetTraffic: '800 Mbps',
      sourceTraffic: '850 Mbps',
      updateTime: '2024-12-20 09:15:22',
    },
    {
      id: 'chain-003',
      name: '应用层防护链',
      chainType: '串行 + 旁路',
      protectionTarget: '1',
      securityServices: [
        { name: 'WAF', order: 1 },
        { name: 'IPS', order: 2 },
      ],
      serialStatus: 'warning',
      bypassStatus: 'normal',
      targetTraffic: '2.5 Gbps',
      sourceTraffic: '2.8 Gbps',
      updateTime: '2024-12-19 16:30:11',
    },
    {
      id: 'chain-004',
      name: '数据中心边界防护链',
      chainType: '串行',
      protectionTarget: '2',
      securityServices: [
        { name: 'DDoS防护', order: 1 },
        { name: 'WAF', order: 2 },
        { name: 'IPS', order: 3 },
      ],
      serialStatus: 'error-bypass',
      bypassStatus: 'manual-bypass',
      targetTraffic: '3.2 Gbps',
      sourceTraffic: '3.5 Gbps',
      updateTime: '2024-12-20 08:45:33',
    },
    {
      id: 'chain-005',
      name: '云原生应用防护链',
      chainType: '串行',
      protectionTarget: '1',
      securityServices: [
        { name: 'WAF', order: 1 },
      ],
      serialStatus: 'normal',
      bypassStatus: 'manual-bypass',
      targetTraffic: '1.8 Gbps',
      sourceTraffic: '2.0 Gbps',
      updateTime: '2024-12-20 11:12:56',
    },
  ];

  // 计算统计数据
  const assetStats = {
    total: securityAssets.length,
    threatCounts: {
      high: securityAssets.reduce((sum, a) => sum + a.threatLevel.high, 0),
      medium: securityAssets.reduce((sum, a) => sum + a.threatLevel.medium, 0),
      low: securityAssets.reduce((sum, a) => sum + a.threatLevel.low, 0),
    },
    trafficCoverage: {
      hasLog: securityAssets.filter((a) => a.hasTrafficLog).length,
      total: securityAssets.length,
    },
    typeDistribution: {
      custom: securityAssets.filter((a) => a.objectType === '自定义').length,
      private: securityAssets.filter((a) => a.objectType === '私网服务').length,
      public: securityAssets.filter((a) => a.objectType === '公网域名').length,
    },
  };

  const chainStats = {
    total: serviceChains.length,
    typeDistribution: {
      serial: serviceChains.filter((c) => c.chainType === '串行').length,
      bypass: serviceChains.filter((c) => c.chainType === '旁路').length,
      mixed: serviceChains.filter((c) => c.chainType === '串行 + 旁路').length,
    },
    serialStatus: {
      normal: serviceChains.filter((c) => c.serialStatus === 'normal').length,
      warning: serviceChains.filter((c) => c.serialStatus === 'warning').length,
      errorBypass: serviceChains.filter((c) => c.serialStatus === 'error-bypass').length,
      manualBypass: serviceChains.filter((c) => c.serialStatus === 'manual-bypass').length,
    },
    bypassStatus: {
      normal: serviceChains.filter((c) => c.bypassStatus === 'normal').length,
      warning: serviceChains.filter((c) => c.bypassStatus === 'warning').length,
      errorBypass: serviceChains.filter((c) => c.bypassStatus === 'error-bypass').length,
      manualBypass: serviceChains.filter((c) => c.bypassStatus === 'manual-bypass').length,
    },
    totalTargetTraffic: serviceChains.reduce((sum, c) => {
      const match = c.targetTraffic.match(/([\d.]+)\s*(Gbps|Mbps)/);
      if (match) {
        const value = parseFloat(match[1]);
        return sum + (match[2] === 'Gbps' ? value : value / 1000);
      }
      return sum;
    }, 0).toFixed(2),
    totalSourceTraffic: serviceChains.reduce((sum, c) => {
      const match = c.sourceTraffic.match(/([\d.]+)\s*(Gbps|Mbps)/);
      if (match) {
        const value = parseFloat(match[1]);
        return sum + (match[2] === 'Gbps' ? value : value / 1000);
      }
      return sum;
    }, 0).toFixed(2),
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs leading-[18px] mb-2">
        <span className="text-gray-500">安全服务</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">安全防护</span>
      </div>

      {/* Page Title & Description */}
      <div className="mb-4">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-8 h-8 bg-[#3b82f6]/6 border border-[#3b82f6]/12 rounded flex items-center justify-center flex-shrink-0">
            <ShieldCheck
              className="w-[15px] h-[15px] text-[#3b82f6]/70"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-[20px] leading-7 font-semibold text-gray-900">
            安全防护
          </h1>
        </div>
        <p className="text-[13px] leading-5 text-gray-600 font-normal">
          安全防护是企业级云平台的核心安全能力,通过统管理安全资产和编排安全服务链，实现从边界防护到应用层安全的全方位防御体系，为业务提供纵深防御和动态安全策略编排能力。
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-5 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('assets')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === 'assets'
              ? 'text-[#1e40af]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          安全资产
          {activeTab === 'assets' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1e40af]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('serviceChain')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === 'serviceChain'
              ? 'text-[#1e40af]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          安全服务链
          {activeTab === 'serviceChain' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1e40af]"></div>
          )}
        </button>
      </div>

      {/* 安全态势统计栏 - 替代传统KPI卡片 */}
      {activeTab === 'assets' ? (
        // 安全资产态势统计 - 横向信息栏
        <div className="border border-gray-200/60 rounded bg-white shadow-sm mb-4">
          <div className="px-5 py-4 flex items-center justify-between">
            {/* 总资产数 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded flex items-center justify-center">
                <Server className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs leading-[18px] text-gray-500">总资产数</span>
                <span className="text-[24px] leading-7 font-semibold text-gray-900 tabular-nums">
                  {assetStats.total}
                </span>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="h-12 w-px bg-gray-200"></div>

            {/* 威胁分布 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-50 border border-red-100 rounded flex items-center justify-center">
                <Shield className="w-4 h-4 text-red-600" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs leading-[18px] text-gray-500">近7天威胁</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[20px] leading-6 font-semibold text-red-600 tabular-nums">
                      {assetStats.threatCounts.high}
                    </span>
                    <span className="text-xs leading-[18px] text-gray-400">高</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[20px] leading-6 font-semibold text-orange-600 tabular-nums">
                      {assetStats.threatCounts.medium}
                    </span>
                    <span className="text-xs leading-[18px] text-gray-400">中</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[20px] leading-6 font-semibold text-green-600 tabular-nums">
                      {assetStats.threatCounts.low}
                    </span>
                    <span className="text-xs leading-[18px] text-gray-400">低</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="h-12 w-px bg-gray-200"></div>

            {/* 已防护资产 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-50 border border-emerald-100 rounded-[5px] flex items-center justify-center">
                <div className="relative w-2.5 h-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs leading-[18px] text-gray-500">已防护资产</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[20px] leading-6 font-semibold text-gray-900 tabular-nums">
                    {assetStats.trafficCoverage.hasLog}
                  </span>
                  <span className="text-sm leading-[18px] text-gray-400">/</span>
                  <span className="text-sm leading-[18px] text-gray-500 tabular-nums">
                    {assetStats.trafficCoverage.total}
                  </span>
                  <span className="text-xs leading-[18px] text-gray-400 ml-0.5">
                    ({Math.round((assetStats.trafficCoverage.hasLog / assetStats.trafficCoverage.total) * 100)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="h-12 w-px bg-gray-200"></div>

            {/* 对象类型分布 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-50 border border-purple-100 rounded-[5px] flex items-center justify-center">
                <Box className="w-4 h-4 text-purple-600" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs leading-[18px] text-gray-500">对象类型</span>
                <div className="flex items-center gap-3 text-xs leading-[18px]">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-500">自定义</span>
                    <span className="font-semibold text-gray-900 tabular-nums ml-0.5">
                      {assetStats.typeDistribution.custom}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-500">私网</span>
                    <span className="font-semibold text-gray-900 tabular-nums ml-0.5">
                      {assetStats.typeDistribution.private}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-500">公网</span>
                    <span className="font-semibold text-gray-900 tabular-nums ml-0.5">
                      {assetStats.typeDistribution.public}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 安全服务链态势统计 - 紧凑单行布局
        <div className="border border-gray-200/60 rounded-lg bg-white shadow-sm mb-4">
          <div className="px-5 py-3 flex items-center justify-between">
            {/* 总服务链 */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-[5px] flex items-center justify-center">
                <GitBranch className="w-3.5 h-3.5 text-blue-600" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs leading-[18px] text-gray-500">总服务链</span>
                <span className="text-[22px] leading-6 font-semibold text-gray-900 tabular-nums">
                  {chainStats.total}
                </span>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="h-10 w-px bg-gray-200"></div>

            {/* 类型分布 */}
            <div className="flex flex-col gap-1">
              <span className="text-xs leading-[18px] text-gray-500">类型分布</span>
              <div className="flex items-center gap-3 text-xs leading-[18px]">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-500">串行</span>
                  <span className="font-semibold text-gray-900 tabular-nums ml-0.5">
                    {chainStats.typeDistribution.serial}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-500">旁路</span>
                  <span className="font-semibold text-gray-900 tabular-nums ml-0.5">
                    {chainStats.typeDistribution.bypass}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  <span className="text-gray-500">混合</span>
                  <span className="font-semibold text-gray-900 tabular-nums ml-0.5">
                    {chainStats.typeDistribution.mixed}
                  </span>
                </div>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="h-10 w-px bg-gray-200"></div>

            {/* 串行状态 */}
            <div className="flex flex-col gap-1">
              <span className="text-xs leading-[18px] text-gray-500">串行状态</span>
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] leading-5 font-semibold text-green-600 tabular-nums">
                    {chainStats.serialStatus.normal}
                  </span>
                  <span className="text-xs leading-[18px] text-gray-400">正常</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] leading-5 font-semibold text-orange-600 tabular-nums">
                    {chainStats.serialStatus.warning}
                  </span>
                  <span className="text-xs leading-[18px] text-gray-400">警告</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] leading-5 font-semibold text-red-600 tabular-nums">
                    {chainStats.serialStatus.errorBypass}
                  </span>
                  <span className="text-xs leading-[18px] text-gray-400">异常旁路</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] leading-5 font-semibold text-gray-600 tabular-nums">
                    {chainStats.serialStatus.manualBypass}
                  </span>
                  <span className="text-xs leading-[18px] text-gray-400">手动旁路</span>
                </div>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="h-10 w-px bg-gray-200"></div>

            {/* 旁路状态 */}
            <div className="flex flex-col gap-1">
              <span className="text-xs leading-[18px] text-gray-500">旁路状态</span>
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] leading-5 font-semibold text-green-600 tabular-nums">
                    {chainStats.bypassStatus.normal}
                  </span>
                  <span className="text-xs leading-[18px] text-gray-400">正常</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] leading-5 font-semibold text-orange-600 tabular-nums">
                    {chainStats.bypassStatus.warning}
                  </span>
                  <span className="text-xs leading-[18px] text-gray-400">警告</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] leading-5 font-semibold text-red-600 tabular-nums">
                    {chainStats.bypassStatus.errorBypass}
                  </span>
                  <span className="text-xs leading-[18px] text-gray-400">异常旁路</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] leading-5 font-semibold text-gray-600 tabular-nums">
                    {chainStats.bypassStatus.manualBypass}
                  </span>
                  <span className="text-xs leading-[18px] text-gray-400">手动旁路</span>
                </div>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="h-10 w-px bg-gray-200"></div>

            {/* 流量统计 */}
            <div className="flex flex-col gap-1">
              <span className="text-xs leading-[18px] text-gray-500">总流量（Gbps）</span>
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs leading-[18px] text-gray-400">目标</span>
                  <span className="text-[18px] leading-5 font-semibold text-gray-900 tabular-nums">
                    {chainStats.totalTargetTraffic}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs leading-[18px] text-gray-400">来源</span>
                  <span className="text-[18px] leading-5 font-semibold text-gray-900 tabular-nums">
                    {chainStats.totalSourceTraffic}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List Card - 表格容器4px圆角 */}
      <div className="border border-gray-200/60 rounded bg-white shadow-sm min-h-[calc(100vh-360px)] flex flex-col overflow-hidden">
        {/* Toolbar - 搜索框前移 */}
        <div className="px-4 py-2.5 border-b border-gray-100/80 flex items-center justify-between gap-4">
          {/* Left: Search - 前移到左侧 */}
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <Search
                className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                strokeWidth={1.5}
              />
              <Input
                placeholder={activeTab === 'assets' ? '搜索资产名称、IP地址...' : '搜索服务链名称...'}
                className="pl-8 h-8 text-sm bg-white border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* Right: Actions - 32px height */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Filter
                className="w-3.5 h-3.5 mr-1"
                strokeWidth={1.5}
              />
              筛选
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Settings2
                className="w-3.5 h-3.5 mr-1"
                strokeWidth={1.5}
              />
              批量配置
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Download
                className="w-3.5 h-3.5 mr-1"
                strokeWidth={1.5}
              />
              导出
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <RefreshCw
                className="w-3.5 h-3.5"
                strokeWidth={1.5}
              />
            </Button>
            <Button
              size="sm"
              className="h-8 text-xs bg-[#1e40af] hover:bg-[#1e3a8a]"
            >
              <Plus
                className="w-3.5 h-3.5 mr-1"
                strokeWidth={1.5}
              />
              {activeTab === 'assets' ? '添加资产' : '创建服务链'}
            </Button>
          </div>
        </div>

        {/* Table - 52px row height, 12px header */}
        <div style={{ padding: '0 10px' }} className="overflow-x-auto">{activeTab === 'assets' ? (
            // 安全资产表格
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="w-10 px-3 py-3">
                    <Checkbox />
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[140px]">
                    对象名称
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[110px]">
                    对象类型
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[180px]">
                    防护范围
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[130px]">
                    所在业务域
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[160px]">
                    是否有流量日志（近7天）
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[180px]">
                    威胁等级（近7天）
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[120px]">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {securityAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-gray-50/30 transition"
                  >
                    <td className="px-3 py-3">
                      <Checkbox />
                    </td>
                    <td className="px-3 py-3">
                      <TooltipWithCopy text={asset.objectName}>
                        <div className="text-sm leading-[22px] text-gray-900 font-mono truncate max-w-[120px]">
                          {asset.objectName}
                        </div>
                      </TooltipWithCopy>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-sm leading-[22px] text-gray-700">
                        {asset.objectType}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      {asset.protectionScope.type === 'domain' ? (
                        <TooltipWithCopy text={`${asset.protectionScope.domain} (${asset.protectionScope.ip})`} maxWidth={25}>
                          <div className="font-mono text-sm leading-[22px] text-gray-600 truncate max-w-[160px]">
                            {asset.protectionScope.domain} ({asset.protectionScope.ip})
                          </div>
                        </TooltipWithCopy>
                      ) : (
                        <TooltipWithCopy text={asset.protectionScope.value}>
                          <div className="font-mono text-sm leading-[22px] text-gray-600">
                            {asset.protectionScope.value}
                          </div>
                        </TooltipWithCopy>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <TooltipWithCopy text={asset.businessDomain}>
                        <div className="text-sm leading-[22px] text-gray-700 truncate max-w-[110px]">
                          {asset.businessDomain}
                        </div>
                      </TooltipWithCopy>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="relative flex items-center justify-center">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              asset.hasTrafficLog ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            {asset.hasTrafficLog && (
                              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
                            )}
                          </div>
                        </div>
                        <span className={`text-sm leading-[22px] ${
                          asset.hasTrafficLog ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {asset.hasTrafficLog ? '有流量' : '无流量'}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-xs leading-[18px] text-gray-500">高:</span>
                          <span className="text-xs leading-[18px] font-medium text-red-600 tabular-nums">
                            {asset.threatLevel.high}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs leading-[18px] text-gray-500">中:</span>
                          <span className="text-xs leading-[18px] font-medium text-orange-600 tabular-nums">
                            {asset.threatLevel.medium}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs leading-[18px] text-gray-500">低:</span>
                          <span className="text-xs leading-[18px] font-medium text-green-600 tabular-nums">
                            {asset.threatLevel.low}
                          </span>
                        </div>
                      </div>
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
                              <MoreHorizontal
                                className="w-3.5 h-3.5"
                                strokeWidth={1.5}
                              />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-28">
                            <DropdownMenuItem className="text-xs">编辑</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs">配置</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs text-red-600">
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // 安全服务链表格
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="w-10 px-3 py-3">
                    <Checkbox />
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[160px]">
                    名称
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[120px]">
                    服务链类型
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[100px]">
                    防护对象
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[200px]">
                    安全服务（网元组）
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[110px]">
                    串行状态
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[110px]">
                    旁路状态
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[120px]">
                    目标流量
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[120px]">
                    来源流量
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500 w-[140px]">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {serviceChains.map((chain) => (
                  <tr
                    key={chain.id}
                    className="hover:bg-gray-50/30 transition"
                  >
                    <td className="px-3 py-3">
                      <Checkbox />
                    </td>
                    <td className="px-3 py-3">
                      <TooltipWithCopy text={chain.name}>
                        <div className="text-sm leading-[22px] text-gray-900 truncate max-w-[140px]">
                          {chain.name}
                        </div>
                      </TooltipWithCopy>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs leading-[18px] border ${
                          chain.chainType === '串行'
                            ? 'bg-blue-50 text-blue-700 border-blue-100'
                            : chain.chainType === '旁路'
                            ? 'bg-purple-50 text-purple-700 border-purple-100'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                        }`}
                      >
                        {chain.chainType}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-sm leading-[22px] text-gray-700 text-center">
                        {chain.protectionTarget} 项
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1 flex-wrap">
                        {chain.securityServices.map((service, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs leading-[18px] bg-amber-50 text-amber-700 border border-amber-100"
                          >
                            {service.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      {chain.serialStatus === 'normal' ? (
                        <div className="flex items-center gap-1.5">
                          <div className="relative w-2 h-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
                          </div>
                          <span className="text-xs leading-[18px] text-gray-700">正常</span>
                        </div>
                      ) : chain.serialStatus === 'warning' ? (
                        <div className="flex items-center gap-1.5">
                          <div className="relative w-2 h-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75"></div>
                          </div>
                          <span className="text-xs leading-[18px] text-gray-700">告警</span>
                        </div>
                      ) : chain.serialStatus === 'error-bypass' ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-xs leading-[18px] text-gray-700">异常Bypass</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-xs leading-[18px] text-gray-500">手动Bypass</span>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      {chain.bypassStatus === 'normal' ? (
                        <div className="flex items-center gap-1.5">
                          <div className="relative w-2 h-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
                          </div>
                          <span className="text-xs leading-[18px] text-gray-700">正常</span>
                        </div>
                      ) : chain.bypassStatus === 'warning' ? (
                        <div className="flex items-center gap-1.5">
                          <div className="relative w-2 h-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75"></div>
                          </div>
                          <span className="text-xs leading-[18px] text-gray-700">告警</span>
                        </div>
                      ) : chain.bypassStatus === 'error-bypass' ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-xs leading-[18px] text-gray-700">异常Bypass</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-xs leading-[18px] text-gray-500">手动Bypass</span>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-mono text-sm leading-[22px] text-gray-700 tabular-nums">
                        {chain.targetTraffic}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-mono text-sm leading-[22px] text-gray-700 tabular-nums">
                        {chain.sourceTraffic}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="link"
                          size="sm"
                          className="h-6 p-0 text-sm leading-6 text-blue-600 hover:text-blue-700"
                        >
                          服务链详情
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded"
                            >
                              <MoreHorizontal
                                className="w-3.5 h-3.5"
                                strokeWidth={1.5}
                              />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-28">
                            <DropdownMenuItem className="text-xs">编辑链路</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs">配置策略</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs text-red-600">
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={1}
          pageSize={pageSize}
          totalItems={activeTab === 'assets' ? securityAssets.length : serviceChains.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </>
  );
}