import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
  Download,
  Plus,
  RefreshCw,
  ChevronDown,
  Copy,
  Server,
  Image,
  Disc,
  Network,
  Terminal,
  ListTodo,
  AlertCircle,
  Activity,
  Layers,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui/tabs';

// Sparkline 迷你图
function MiniSparkline({ data, width = 32, height = 12 }: { data: number[]; width?: number; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 主视图：等距拓扑指挥舱
function IsometricCommandCenter() {
  const [pulsePhase, setPulsePhase] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // 核心数据
  const core = {
    health: 92,
    status: '健康',
    cpu: { used: 68, reserved: 12, total: 100, sparkline: [58, 62, 65, 68, 72, 70] },
    memory: { used: 72, reserved: 8, total: 100, sparkline: [65, 68, 70, 72, 75, 73] },
    storage: { used: 45, reserved: 5, total: 100, sparkline: [42, 43, 44, 45, 46, 45] },
    alerts: { critical: 2, important: 3, warning: 3, unconfirmed: 4 },
  };

  // 四个域节点
  const domains = [
    {
      id: 'compute',
      name: '计算域',
      x: 200,
      y: 120,
      health: 95,
      color: '#3b82f6',
      icon: Server,
      alerts: 0,
      kpis: [
        { label: '节点', value: '12/12', status: 'good' },
        { label: '在线', value: '11', status: 'good' },
        { label: '离线', value: '1', status: 'warning' },
      ],
    },
    {
      id: 'storage',
      name: '存储域',
      x: 560,
      y: 120,
      health: 85,
      color: '#8b5cf6',
      icon: Disc,
      alerts: 1,
      kpis: [
        { label: '存储池', value: '2', status: 'good' },
        { label: '正常', value: '1', status: 'good' },
        { label: '降级', value: '1', status: 'warning' },
      ],
    },
    {
      id: 'network',
      name: '网络域',
      x: 200,
      y: 380,
      health: 98,
      color: '#10b981',
      icon: Network,
      alerts: 0,
      kpis: [
        { label: '交换机', value: '4', status: 'good' },
        { label: '网关', value: '2', status: 'good' },
        { label: '丢包率', value: '0.2%', status: 'good' },
      ],
    },
    {
      id: 'vms',
      name: '虚拟机域',
      x: 560,
      y: 380,
      health: 88,
      color: '#f59e0b',
      icon: Layers,
      alerts: 1,
      kpis: [
        { label: '总数', value: '48', status: 'good' },
        { label: '运行', value: '45', status: 'good' },
        { label: '异常', value: '3', status: 'error' },
      ],
    },
  ];

  const centerX = 380;
  const centerY = 250;
  const coreRadius = 85;

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 rounded-lg overflow-hidden">
      {/* 背景网格与噪点 */}
      <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.4 }}>
        <defs>
          <pattern id="isoGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="0.8" fill="#94a3b8" opacity="0.15" />
          </pattern>
          <radialGradient id="cornerGlow1" cx="0%" cy="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cornerGlow2" cx="100%" cy="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="alertGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#isoGrid)" />
        <ellipse cx="0" cy="0" rx="300" ry="300" fill="url(#cornerGlow1)" />
        <ellipse cx="100%" cy="100%" rx="300" ry="300" fill="url(#cornerGlow2)" />
      </svg>

      <svg width="100%" height="100%" viewBox="0 0 760 600" className="absolute inset-0">
        {/* 连接线与脉冲 */}
        {domains.map((domain) => {
          const start = { x: centerX, y: centerY };
          const end = { x: domain.x, y: domain.y };
          const pulseProgress = (pulsePhase % 50) / 50;
          const pulseX = start.x + (end.x - start.x) * pulseProgress;
          const pulseY = start.y + (end.y - start.y) * pulseProgress;

          return (
            <g key={domain.id}>
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeDasharray="6 3"
                opacity="0.4"
              />
              <circle cx={pulseX} cy={pulseY} r="3" fill={domain.color} opacity="0.8">
                <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* 中心核心平台 */}
        <g transform={`translate(${centerX}, ${centerY})`}>
          {/* 外圈 - 告警刻度 */}
          <circle
            cx="0"
            cy="0"
            r={coreRadius + 15}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
            opacity="0.3"
          />
          
          {/* 告警段 - 严重 */}
          <circle
            cx="0"
            cy="0"
            r={coreRadius + 15}
            fill="none"
            stroke="#ef4444"
            strokeWidth="4"
            strokeDasharray={`${(core.alerts.critical / 8) * 2 * Math.PI * (coreRadius + 15)} ${2 * Math.PI * (coreRadius + 15)}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            opacity="0.8"
          />
          
          {/* 告警段 - 重要 */}
          <circle
            cx="0"
            cy="0"
            r={coreRadius + 15}
            fill="none"
            stroke="#f97316"
            strokeWidth="4"
            strokeDasharray={`${(core.alerts.important / 8) * 2 * Math.PI * (coreRadius + 15)} ${2 * Math.PI * (coreRadius + 15)}`}
            strokeDashoffset={-((core.alerts.critical / 8) * 2 * Math.PI * (coreRadius + 15))}
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* 告警脉冲点 */}
          {core.alerts.critical > 0 && (
            <g>
              <circle cx={coreRadius + 15} cy="0" r="8" fill="url(#alertGlow)">
                <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx={coreRadius + 15} cy="0" r="5" fill="#ef4444" />
            </g>
          )}

          {/* 内圈 - 资源水位三段弧 */}
          {/* CPU 弧 */}
          <circle
            cx="0"
            cy="0"
            r={coreRadius - 5}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="8"
            strokeDasharray={`${(core.cpu.used / 100) * 2 * Math.PI * (coreRadius - 5)} ${2 * Math.PI * (coreRadius - 5)}`}
            strokeDashoffset={2 * Math.PI * (coreRadius - 5) * 0.25}
            strokeLinecap="round"
            opacity="0.85"
            transform="rotate(-90)"
          />
          
          {/* Memory 弧 */}
          <circle
            cx="0"
            cy="0"
            r={coreRadius - 5}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="8"
            strokeDasharray={`${(core.memory.used / 100) * 2 * Math.PI * (coreRadius - 5)} ${2 * Math.PI * (coreRadius - 5)}`}
            strokeDashoffset={2 * Math.PI * (coreRadius - 5) * 0.25 - (core.cpu.used / 100) * 2 * Math.PI * (coreRadius - 5)}
            strokeLinecap="round"
            opacity="0.85"
            transform="rotate(-90)"
          />
          
          {/* Storage 弧 */}
          <circle
            cx="0"
            cy="0"
            r={coreRadius - 5}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeDasharray={`${(core.storage.used / 100) * 2 * Math.PI * (coreRadius - 5)} ${2 * Math.PI * (coreRadius - 5)}`}
            strokeDashoffset={2 * Math.PI * (coreRadius - 5) * 0.25 - ((core.cpu.used + core.memory.used) / 100) * 2 * Math.PI * (coreRadius - 5)}
            strokeLinecap="round"
            opacity="0.85"
            transform="rotate(-90)"
          />

          {/* 核心底座 - 等距圆形 */}
          <ellipse cx="0" cy="8" rx={coreRadius - 20} ry="18" fill="#e0e7ff" opacity="0.4" />
          <ellipse cx="0" cy="8" rx={coreRadius - 25} ry="14" fill="#c7d2fe" opacity="0.5" />
          
          {/* 核心平台主体 */}
          <circle cx="0" cy="0" r={coreRadius - 20} fill="url(#pulseGlow)" />
          <circle cx="0" cy="0" r={coreRadius - 20} fill="#ffffff" opacity="0.95" />
          <circle cx="0" cy="0" r={coreRadius - 20} fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />

          {/* 中心健康分数 */}
          <text
            x="0"
            y="-10"
            textAnchor="middle"
            fontSize="42"
            fontWeight="700"
            fill="#1e40af"
            className="tabular-nums"
          >
            {core.health}
          </text>
          <text x="0" y="15" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">
            {core.status}
          </text>
          <text x="0" y="32" textAnchor="middle" fontSize="10" fill="#64748b">
            集群核心
          </text>
        </g>

        {/* 四个域节点 */}
        {domains.map((domain) => (
          <g
            key={domain.id}
            transform={`translate(${domain.x}, ${domain.y})`}
            className="cursor-pointer transition-opacity"
            opacity={selectedDomain && selectedDomain !== domain.id ? 0.5 : 1}
            onMouseEnter={() => setSelectedDomain(domain.id)}
            onMouseLeave={() => setSelectedDomain(null)}
          >
            {/* 域健康环 */}
            <circle cx="0" cy="0" r="42" fill="none" stroke="#e5e7eb" strokeWidth="3" opacity="0.3" />
            <circle
              cx="0"
              cy="0"
              r="42"
              fill="none"
              stroke={domain.color}
              strokeWidth="4"
              strokeDasharray={`${(domain.health / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
              strokeDashoffset={2 * Math.PI * 42 * 0.25}
              strokeLinecap="round"
              opacity="0.7"
              transform="rotate(-90)"
            />

            {/* 域节点主体 */}
            <circle cx="0" cy="2" r="32" fill={domain.color} opacity="0.08" />
            <circle cx="0" cy="0" r="32" fill="#ffffff" opacity="0.98" />
            <circle cx="0" cy="0" r="32" fill="none" stroke={domain.color} strokeWidth="2" opacity="0.3" />
            
            {/* 微光圈 */}
            <circle cx="0" cy="0" r="38" fill="none" stroke={domain.color} strokeWidth="1" opacity="0.15">
              <animate attributeName="r" values="36;42;36" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.05;0.15" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* 告警脉冲点 */}
            {domain.alerts > 0 && (
              <g>
                <circle cx="25" cy="-25" r="10" fill="url(#alertGlow)">
                  <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="25" cy="-25" r="6" fill="#ef4444" />
                <text x="25" y="-22" textAnchor="middle" fontSize="9" fontWeight="700" fill="white">
                  {domain.alerts}
                </text>
              </g>
            )}

            {/* 域名称 */}
            <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="600" fill={domain.color}>
              {domain.name}
            </text>
            
            {/* 健康度小数字 */}
            <text x="0" y="18" textAnchor="middle" fontSize="9" fill="#64748b">
              {domain.health}%
            </text>
          </g>
        ))}
      </svg>

      {/* 域节点 KPI 浮标（绝对定位） */}
      {domains.map((domain) => (
        <div
          key={`kpi-${domain.id}`}
          className="absolute bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded shadow-sm p-2 transition-all"
          style={{
            left: domain.x + 45,
            top: domain.y - 30,
            width: '140px',
            opacity: selectedDomain === domain.id ? 1 : 0.9,
            transform: selectedDomain === domain.id ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          <div className="space-y-0.5">
            {domain.kpis.map((kpi, idx) => (
              <div key={idx} className="flex items-center justify-between text-[10px]">
                <span className="text-gray-600">{kpi.label}</span>
                <span
                  className={`font-semibold tabular-nums ${
                    kpi.status === 'good'
                      ? 'text-gray-900'
                      : kpi.status === 'warning'
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {kpi.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 核心资源浮标（绝对定位 - 在核心下方） */}
      <div
        className="absolute bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded shadow-sm p-2.5"
        style={{ left: centerX - 90, top: centerY + 100, width: '180px' }}
      >
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-[10px] text-gray-600">CPU</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="text-amber-600">
                <MiniSparkline data={core.cpu.sparkline} width={28} height={10} />
              </div>
              <span className="text-[10px] font-semibold text-gray-900 tabular-nums">
                {core.cpu.used}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-[10px] text-gray-600">内存</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="text-purple-600">
                <MiniSparkline data={core.memory.sparkline} width={28} height={10} />
              </div>
              <span className="text-[10px] font-semibold text-gray-900 tabular-nums">
                {core.memory.used}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-[10px] text-gray-600">存储</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="text-blue-600">
                <MiniSparkline data={core.storage.sparkline} width={28} height={10} />
              </div>
              <span className="text-[10px] font-semibold text-gray-900 tabular-nums">
                {core.storage.used}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 告警统计浮标（绝对定位 - 在核心右上） */}
      <div
        className="absolute bg-white/95 backdrop-blur-sm border border-red-200/60 rounded shadow-sm p-2"
        style={{ left: centerX + 100, top: centerY - 80, width: '100px' }}
      >
        <div className="text-[10px] text-gray-500 mb-1">告警态势</div>
        <div className="space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-gray-600">未确认</span>
            <span className="text-[11px] font-semibold text-blue-600 tabular-nums">
              {core.alerts.unconfirmed}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-gray-600">严重</span>
            <span className="text-[11px] font-semibold text-red-600 tabular-nums">
              {core.alerts.critical}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-gray-600">重要</span>
            <span className="text-[11px] font-semibold text-orange-600 tabular-nums">
              {core.alerts.important}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Top 热点浮层
function TopHotspotOverlay() {
  const [activeTab, setActiveTab] = useState<'nodes' | 'vms' | 'volumes'>('nodes');

  const hotspots = {
    nodes: {
      cpu: [
        { name: 'node-prod-01', value: 87 },
        { name: 'node-prod-05', value: 82 },
        { name: 'node-prod-03', value: 78 },
        { name: 'node-prod-07', value: 75 },
        { name: 'node-prod-02', value: 71 },
      ],
      memory: [
        { name: 'node-prod-02', value: 92 },
        { name: 'node-prod-01', value: 88 },
        { name: 'node-prod-05', value: 85 },
        { name: 'node-prod-03', value: 78 },
        { name: 'node-prod-07', value: 72 },
      ],
    },
    vms: [
      { name: 'web-server-01', value: 89 },
      { name: 'database-master', value: 85 },
      { name: 'app-backend-01', value: 78 },
      { name: 'cache-redis-01', value: 72 },
      { name: 'monitoring-grafana', value: 68 },
    ],
    volumes: [
      { name: 'pv-data-01', value: 95 },
      { name: 'pv-logs-02', value: 88 },
      { name: 'pv-backup-03', value: 82 },
      { name: 'pv-cache-01', value: 75 },
      { name: 'pv-temp-05', value: 68 },
    ],
  };

  return (
    <div className="absolute left-4 bottom-4 w-[500px] bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded shadow-lg">
      <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">Top 热点</span>
        <div className="flex items-center gap-1 bg-gray-50 p-0.5 rounded">
          <button
            onClick={() => setActiveTab('nodes')}
            className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
              activeTab === 'nodes' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            节点
          </button>
          <button
            onClick={() => setActiveTab('vms')}
            className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
              activeTab === 'vms' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            虚拟机
          </button>
          <button
            onClick={() => setActiveTab('volumes')}
            className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
              activeTab === 'volumes' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            卷
          </button>
        </div>
      </div>

      <div className="px-3 py-2.5">
        {activeTab === 'nodes' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] text-gray-500 mb-1.5">CPU 使用率</div>
              <div className="space-y-1">
                {hotspots.nodes.cpu.map((node, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center gap-1.5 hover:bg-gray-50 p-1 rounded transition-colors"
                  >
                    <span className="text-[10px] text-gray-500 w-3 tabular-nums">{idx + 1}</span>
                    <span className="text-[10px] text-gray-700 font-mono flex-1 truncate text-left">
                      {node.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${node.value}%` }}></div>
                      </div>
                      <span className="text-[10px] text-gray-600 tabular-nums w-6 text-right">{node.value}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 mb-1.5">内存使用率</div>
              <div className="space-y-1">
                {hotspots.nodes.memory.map((node, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center gap-1.5 hover:bg-gray-50 p-1 rounded transition-colors"
                  >
                    <span className="text-[10px] text-gray-500 w-3 tabular-nums">{idx + 1}</span>
                    <span className="text-[10px] text-gray-700 font-mono flex-1 truncate text-left">
                      {node.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${node.value}%` }}></div>
                      </div>
                      <span className="text-[10px] text-gray-600 tabular-nums w-6 text-right">{node.value}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vms' && (
          <div>
            <div className="text-[10px] text-gray-500 mb-1.5">虚拟机 CPU 使用率</div>
            <div className="space-y-1">
              {hotspots.vms.map((vm, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center gap-1.5 hover:bg-gray-50 p-1 rounded transition-colors"
                >
                  <span className="text-[10px] text-gray-500 w-3 tabular-nums">{idx + 1}</span>
                  <span className="text-[10px] text-gray-700 font-mono flex-1 truncate text-left">{vm.name}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${vm.value}%` }}></div>
                    </div>
                    <span className="text-[10px] text-gray-600 tabular-nums w-6 text-right">{vm.value}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'volumes' && (
          <div>
            <div className="text-[10px] text-gray-500 mb-1.5">存储卷使用率</div>
            <div className="space-y-1">
              {hotspots.volumes.map((vol, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center gap-1.5 hover:bg-gray-50 p-1 rounded transition-colors"
                >
                  <span className="text-[10px] text-gray-500 w-3 tabular-nums">{idx + 1}</span>
                  <span className="text-[10px] text-gray-700 font-mono flex-1 truncate text-left">{vol.name}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${vol.value}%` }}></div>
                    </div>
                    <span className="text-[10px] text-gray-600 tabular-nums w-6 text-right">{vol.value}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function SceneDashboard({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [timeRange, setTimeRange] = useState('24h');

  const alerts = [
    {
      id: 'alert-001',
      severity: 'critical',
      title: 'node-prod-02 CPU 使用率持续超过 90%',
      source: 'node-prod-02',
      time: '5 分钟前',
    },
    {
      id: 'alert-002',
      severity: 'critical',
      title: '存储卷 pv-data-01 空间不足',
      source: 'Storage',
      time: '12 分钟前',
    },
    {
      id: 'alert-003',
      severity: 'important',
      title: 'etcd 集群响应延迟增加',
      source: 'Control Plane',
      time: '35 分钟前',
    },
    {
      id: 'alert-004',
      severity: 'warning',
      title: 'node-prod-08 网络丢包率上升',
      source: 'node-prod-08',
      time: '1 小时前',
    },
    {
      id: 'alert-005',
      severity: 'important',
      title: 'vm-web-03 内存使用率超过 85%',
      source: 'vm-web-03',
      time: '1 小时前',
    },
    {
      id: 'alert-006',
      severity: 'warning',
      title: '备份任务执行延迟',
      source: 'Backup Service',
      time: '2 小时前',
    },
  ];

  const events = [
    { type: 'error', text: 'node-prod-11 离线', time: '15 分钟前' },
    { type: 'warning', text: '存储池 pool-02 降级', time: '42 分钟前' },
  ];

  const tasks = [
    {
      id: 'task-001',
      type: 'create',
      name: '创建虚拟机 dev-test-vm',
      status: 'running',
      progress: 65,
      time: '2 分钟前',
      error: null,
    },
    {
      id: 'task-002',
      type: 'migrate',
      name: '迁移 vm-web-03 到 node-prod-05',
      status: 'running',
      progress: 40,
      time: '8 分钟前',
      error: null,
    },
    {
      id: 'task-003',
      type: 'backup',
      name: '备份数据库 vm-db-master',
      status: 'failed',
      progress: 45,
      time: '25 分钟前',
      error: '存储不可用',
    },
    {
      id: 'task-004',
      type: 'upgrade',
      name: '升级 K8s 集群到 v1.28.4',
      status: 'completed',
      progress: 100,
      time: '1 小时前',
      error: null,
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs leading-[18px] mb-2">
        <span className="text-gray-700 font-medium">运维指挥舱</span>
      </div>

      {/* Page Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 bg-[#3b82f6]/6 border border-[#3b82f6]/12 rounded flex items-center justify-center flex-shrink-0">
              <Activity className="w-[15px] h-[15px] text-[#3b82f6]/70" strokeWidth={1.5} />
            </div>
            <h1 className="text-[20px] leading-7 font-semibold text-gray-900">总览</h1>
            <span className="text-xs text-gray-400 font-normal">Scene Dashboard</span>
          </div>
          <p className="text-xs leading-5 text-gray-500 font-normal">
            等距拓扑指挥舱 - 全局态势一屏可视
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-8 w-[110px] text-xs border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">近 15 分钟</SelectItem>
              <SelectItem value="1h">近 1 小时</SelectItem>
              <SelectItem value="24h">近 24 小时</SelectItem>
              <SelectItem value="7d">近 7 天</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
            刷新
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
            导出
          </Button>

          {/* Split Button - 唯一强入口 */}
          <div className="flex items-center">
            <Button size="sm" className="h-8 text-xs bg-[#1e40af] hover:bg-[#1e3a8a] rounded-r-none">
              <Plus className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
              创建虚拟机
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="h-8 w-8 p-0 bg-[#1e40af] hover:bg-[#1e3a8a] rounded-l-none border-l border-white/20"
                >
                  <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <DropdownMenuLabel className="text-xs text-gray-500 font-medium">最近��用</DropdownMenuLabel>
                <DropdownMenuItem className="text-sm py-2">
                  <Copy className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1.5} />
                  <div className="flex-1">
                    <div className="text-sm">从模板：Ubuntu-2C4G</div>
                    <div className="text-xs text-gray-500">最常使用的模板</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm py-2">
                  <Server className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1.5} />
                  <div className="flex-1">
                    <div className="text-sm">批量创建：网段+偏移</div>
                    <div className="text-xs text-gray-500">快速创建多个实例</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm py-2">
                  <Image className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1.5} />
                  <div className="flex-1">
                    <div className="text-sm">最近镜像</div>
                    <div className="text-xs text-gray-500">Debian 11 Docker</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-gray-500 font-medium">创建虚拟机</DropdownMenuLabel>
                <DropdownMenuItem 
                  className="text-sm"
                  onClick={() => onNavigate?.('vm')}
                >
                  <Plus className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1.5} />
                  空白创建
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Copy className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1.5} />
                  从模板创建
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Server className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1.5} />
                  批量创建（网段+偏移）
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-gray-500 font-medium">准备资源</DropdownMenuLabel>
                <DropdownMenuItem className="text-sm">
                  <Image className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1.5} />
                  导入镜像
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Disc className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1.5} />
                  创建磁盘/卷
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Network className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1.5} />
                  创建网络
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-gray-500 font-medium">常用工具</DropdownMenuLabel>
                <DropdownMenuItem className="text-sm">
                  <ListTodo className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1.5} />
                  查看创建任务
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Terminal className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1.5} />
                  打开控制台（最近异常 VM）
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* 主视图区域：等距拓扑指挥舱 + Top 热点浮层 + 右侧 Dock */}
      <div className="relative flex gap-4">
        {/* 左侧：主视图（占满剩余空间） */}
        <div className="flex-1 relative">
          <IsometricCommandCenter />
          <TopHotspotOverlay />
        </div>

        {/* 右侧 Dock：固定宽度，内部滚动 */}
        <div className="w-[380px] flex-shrink-0">
          <Tabs defaultValue="alerts" className="w-full">
            <div
              className="border border-gray-200/60 rounded bg-white shadow-sm overflow-hidden flex flex-col"
              style={{ height: '600px' }}
            >
              {/* Tab Header */}
              <div className="px-4 py-2.5 border-b border-gray-100 flex-shrink-0">
                <TabsList className="h-8 bg-gray-50 p-0.5">
                  <TabsTrigger value="alerts" className="text-xs">
                    告警
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="text-xs">
                    近期任务
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content - 告警 */}
              <TabsContent value="alerts" className="m-0 flex-1 flex flex-col min-h-0">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                  <span className="text-xs text-gray-600">未确认 4 项</span>
                </div>
                <div className="flex-1 overflow-y-auto relative min-h-0 scroll-smooth custom-scrollbar">
                  <style>{`
                    .custom-scrollbar::-webkit-scrollbar {
                      width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background-color: #e5e7eb;
                      border-radius: 3px;
                    }
                    .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                      background-color: #d1d5db;
                    }
                  `}</style>
                  <div className="divide-y divide-gray-100">
                    {alerts.map((alert) => (
                      <button key={alert.id} className="w-full px-4 py-3 hover:bg-gray-50/50 transition text-left">
                        <div className="flex items-start gap-2 mb-1">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] leading-3 font-medium ${
                              alert.severity === 'critical'
                                ? 'bg-red-100 text-red-700'
                                : alert.severity === 'important'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {alert.severity === 'critical' ? '严重' : alert.severity === 'important' ? '重要' : '一般'}
                          </span>
                        </div>
                        <p className="text-xs leading-[18px] text-gray-900 mb-1 line-clamp-2">{alert.title}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-gray-500">{alert.source}</span>
                          <span className="text-[11px] text-gray-400">{alert.time}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {/* 底部渐隐遮罩 */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/90 to-transparent pointer-events-none"></div>
                </div>

                {/* 关键事件 */}
                <div className="border-t-2 border-gray-100 flex-shrink-0">
                  <div className="px-4 py-2 bg-gray-50/50">
                    <div className="text-xs font-medium text-gray-700">关键事件</div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {events.map((event, idx) => (
                      <div key={idx} className="px-4 py-2 flex items-center gap-2">
                        {event.type === 'error' ? (
                          <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" strokeWidth={1.5} />
                        ) : (
                          <Activity className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" strokeWidth={1.5} />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-900 truncate">{event.text}</div>
                          <div className="text-[11px] text-gray-400">{event.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Tab Content - 近期任务 */}
              <TabsContent value="tasks" className="m-0 flex-1 flex flex-col min-h-0">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                  <span className="text-xs text-gray-600">Top 4</span>
                </div>
                <div className="flex-1 overflow-y-auto relative min-h-0 scroll-smooth custom-scrollbar">
                  <div className="divide-y divide-gray-100">
                    {tasks.map((task) => (
                      <button key={task.id} className="w-full px-4 py-3 hover:bg-gray-50/30 transition text-left">
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] leading-3 font-medium ${
                                task.type === 'create'
                                  ? 'bg-blue-100 text-blue-700'
                                  : task.type === 'migrate'
                                  ? 'bg-purple-100 text-purple-700'
                                  : task.type === 'backup'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-indigo-100 text-indigo-700'
                              }`}
                            >
                              {task.type === 'create'
                                ? '创建'
                                : task.type === 'migrate'
                                ? '迁移'
                                : task.type === 'backup'
                                ? '备份'
                                : '升级'}
                            </span>
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] leading-3 font-medium ${
                                task.status === 'running'
                                  ? 'bg-blue-100 text-blue-700'
                                  : task.status === 'failed'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {task.status === 'running' ? '进行中' : task.status === 'failed' ? '失败' : '已完成'}
                            </span>
                            {task.error && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] leading-3 font-medium bg-red-50 text-red-600">
                                {task.error}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400">{task.time}</span>
                        </div>
                        <p className="text-xs leading-[18px] text-gray-900 mb-2 truncate">{task.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                task.status === 'completed'
                                  ? 'bg-green-500'
                                  : task.status === 'failed'
                                  ? 'bg-red-500'
                                  : 'bg-blue-500'
                              }`}
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-[11px] text-gray-500 tabular-nums w-8 text-right">{task.progress}%</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {/* 底部渐隐遮罩 */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/90 to-transparent pointer-events-none"></div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
}
