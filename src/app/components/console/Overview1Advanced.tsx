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

// 3D 等距建筑节点组件
function IsometricBuilding({ 
  x, 
  y, 
  width = 60, 
  height = 80, 
  floors = 4,
  color = '#3b82f6',
  label,
  value,
  status = 'normal'
}: { 
  x: number; 
  y: number; 
  width?: number; 
  height?: number; 
  floors?: number;
  color?: string;
  label?: string;
  value?: string | number;
  status?: 'normal' | 'warning' | 'error';
}) {
  const floorHeight = height / floors;
  
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* 光晕效果 */}
      <ellipse
        cx="0"
        cy={height + 8}
        rx={width * 0.7}
        ry="10"
        fill={color}
        opacity="0.15"
        filter="blur(6px)"
      />
      
      {/* 建筑主体 - 分层 */}
      {Array.from({ length: floors }).map((_, i) => {
        const floorY = height - (i + 1) * floorHeight;
        const floorWidth = width - i * 2;
        const alpha = Math.max(0.6, 1 - i * 0.1);
        
        return (
          <g key={i}>
            {/* 顶面 */}
            <path
              d={`
                M 0 ${floorY}
                L ${-floorWidth * 0.5} ${floorY + floorWidth * 0.289}
                L 0 ${floorY + floorWidth * 0.577}
                L ${floorWidth * 0.5} ${floorY + floorWidth * 0.289}
                Z
              `}
              fill={color}
              opacity={alpha * 0.9}
            />
            
            {/* 左侧面 */}
            <path
              d={`
                M ${-floorWidth * 0.5} ${floorY + floorWidth * 0.289}
                L ${-floorWidth * 0.5} ${floorY + floorWidth * 0.289 + floorHeight}
                L 0 ${floorY + floorWidth * 0.577 + floorHeight}
                L 0 ${floorY + floorWidth * 0.577}
                Z
              `}
              fill={color}
              opacity={alpha * 0.65}
            />
            
            {/* 右侧面 */}
            <path
              d={`
                M 0 ${floorY + floorWidth * 0.577}
                L 0 ${floorY + floorWidth * 0.577 + floorHeight}
                L ${floorWidth * 0.5} ${floorY + floorWidth * 0.289 + floorHeight}
                L ${floorWidth * 0.5} ${floorY + floorWidth * 0.289}
                Z
              `}
              fill={color}
              opacity={alpha * 0.8}
            />
            
            {/* 窗户 */}
            {i < floors - 1 && (
              <>
                <rect
                  x={-floorWidth * 0.18}
                  y={floorY + floorWidth * 0.433 + floorHeight * 0.25}
                  width={floorWidth * 0.12}
                  height={floorHeight * 0.5}
                  fill="#93c5fd"
                  opacity="0.7"
                />
              </>
            )}
          </g>
        );
      })}
      
      {/* 状态指示器 */}
      {status !== 'normal' && (
        <circle
          cx={width * 0.35}
          cy={height - floors * floorHeight - 8}
          r="5"
          fill={status === 'error' ? '#ef4444' : '#f59e0b'}
        >
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

// 3D 数据中心核心 - 多层彩色环
function DataCenterCore({ x, y }: { x: number; y: number }) {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        <radialGradient id="coreGlow2">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="ring2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="ring3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* 外层光晕 */}
      <circle cx="0" cy="0" r="130" fill="url(#coreGlow2)">
        <animate attributeName="r" values="120;140;120" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite" />
      </circle>
      
      {/* 旋转光环 - 外层 (红橙黄) */}
      <g transform={`rotate(${rotation})`}>
        <circle
          cx="0"
          cy="0"
          r="105"
          fill="none"
          stroke="url(#ring1)"
          strokeWidth="8"
          strokeDasharray="25 15"
          opacity="0.7"
          filter="url(#glow)"
        />
      </g>
      
      {/* 旋转光环 - 中层 (紫蓝青) */}
      <g transform={`rotate(${-rotation * 1.3})`}>
        <circle
          cx="0"
          cy="0"
          r="85"
          fill="none"
          stroke="url(#ring2)"
          strokeWidth="10"
          strokeDasharray="20 12"
          opacity="0.75"
          filter="url(#glow)"
        />
      </g>
      
      {/* 旋转光环 - 内层 (粉紫蓝) */}
      <g transform={`rotate(${rotation * 1.8})`}>
        <circle
          cx="0"
          cy="0"
          r="65"
          fill="none"
          stroke="url(#ring3)"
          strokeWidth="7"
          strokeDasharray="15 10"
          opacity="0.8"
          filter="url(#glow)"
        />
      </g>
      
      {/* 核心平台 3D 效果 */}
      {/* 底部阴影 */}
      <ellipse cx="0" cy="15" rx="50" ry="12" fill="#1e293b" opacity="0.25" />
      
      {/* 核心圆柱 - 底层 */}
      <ellipse cx="0" cy="10" rx="52" ry="14" fill="#6366f1" opacity="0.5" />
      
      {/* 核心圆柱 - 中层 */}
      <ellipse cx="0" cy="5" rx="51" ry="13" fill="#8b5cf6" opacity="0.6" />
      
      {/* 核心圆柱 - 顶层 */}
      <ellipse cx="0" cy="0" rx="50" ry="12" fill="#c7d2fe" opacity="0.8" />
      
      {/* 核心顶面 */}
      <circle cx="0" cy="0" r="45" fill="#ffffff" opacity="0.95" />
      
      {/* 内圈渐变 */}
      <circle cx="0" cy="0" r="40" fill="url(#coreGlow2)" opacity="0.3" />
      
      {/* 数据流动点 */}
      <g transform={`rotate(${rotation * 2.5})`}>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const radius = 30;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#3b82f6"
              opacity="0.8"
            >
              <animate
                attributeName="r"
                values="2;4.5;2"
                dur="1.5s"
                begin={`${i * 0.25}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </g>
      
      {/* 中心文字 */}
      <text
        x="0"
        y="-5"
        textAnchor="middle"
        fontSize="32"
        fontWeight="700"
        fill="#1e40af"
        className="tabular-nums"
      >
        92
      </text>
      <text
        x="0"
        y="10"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="#6366f1"
      >
        集群健康度
      </text>
    </g>
  );
}

// 连接线组件
function ConnectionLine({ 
  x1, y1, x2, y2, 
  pulsePhase,
  color = '#cbd5e1'
}: { 
  x1: number; 
  y1: number; 
  x2: number; 
  y2: number; 
  pulsePhase: number;
  color?: string;
}) {
  const pulseProgress = (pulsePhase % 100) / 100;
  const pulseX = x1 + (x2 - x1) * pulseProgress;
  const pulseY = y1 + (y2 - y1) * pulseProgress;
  
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="8 4"
        opacity="0.35"
      />
      <circle cx={pulseX} cy={pulseY} r="4" fill="#3b82f6" opacity="0.7">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

// 数据浮标卡片
function FloatingDataCard({
  x,
  y,
  label,
  value,
  unit = '',
  color = '#3b82f6'
}: {
  x: number;
  y: number;
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* 卡片阴影 */}
      <rect
        x="-40"
        y="-22"
        width="80"
        height="44"
        rx="5"
        fill="#1e293b"
        opacity="0.08"
        transform="translate(2, 2)"
      />
      
      {/* 卡片主体 */}
      <rect
        x="-40"
        y="-22"
        width="80"
        height="44"
        rx="5"
        fill="white"
        opacity="0.97"
        stroke="#e2e8f0"
        strokeWidth="1"
      />
      
      {/* 顶部色条 */}
      <rect
        x="-40"
        y="-22"
        width="80"
        height="2.5"
        rx="5"
        fill={color}
        opacity="0.7"
      />
      
      {/* 图标背景 */}
      <circle
        cx="-22"
        cy="-4"
        r="8"
        fill={color}
        opacity="0.1"
      />
      
      {/* 标签 */}
      <text
        x="0"
        y="-6"
        textAnchor="middle"
        fontSize="8.5"
        fill="#64748b"
      >
        {label}
      </text>
      
      {/* 数值 */}
      <text
        x="0"
        y="10"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill="#0f172a"
        className="tabular-nums"
      >
        {value}
      </text>
      
      {/* 单位 */}
      {unit && (
        <text
          x="0"
          y="18"
          textAnchor="middle"
          fontSize="7.5"
          fill="#94a3b8"
        >
          {unit}
        </text>
      )}
    </g>
  );
}

export function Overview1({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [timeRange, setTimeRange] = useState('24h');
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // 节点数据
  const nodes = [
    { id: 1, x: 180, y: 80, label: '用户总数', value: '1', unit: '台', color: '#3b82f6' },
    { id: 2, x: 320, y: 60, label: '24小时事件数', value: '0', unit: '台', color: '#8b5cf6' },
    { id: 3, x: 100, y: 200, label: '告警总数', value: '85', unit: '台', color: '#10b981' },
    { id: 4, x: 250, y: 220, label: '24小时告警数', value: '0', unit: '台', color: '#f59e0b' },
    { id: 5, x: 520, y: 80, label: '资产总数', value: '18', unit: '台', color: '#06b6d4' },
  ];

  const buildings = [
    { x: 150, y: 350, color: '#3b82f6', floors: 5, label: '计算节点', value: '12', status: 'normal' as const },
    { x: 320, y: 380, color: '#8b5cf6', floors: 4, label: '存储池', value: '2', status: 'warning' as const },
    { x: 500, y: 360, color: '#10b981', floors: 6, label: '网络', value: '正常', status: 'normal' as const },
    { x: 650, y: 340, color: '#f59e0b', floors: 4, label: '虚拟机', value: '48', status: 'normal' as const },
    { x: 580, y: 200, color: '#06b6d4', floors: 3, label: '容器', value: '156', status: 'normal' as const },
    { x: 680, y: 180, color: '#ec4899', floors: 3, label: '服务', value: '24', status: 'normal' as const },
  ];

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

  const centerX = 400;
  const centerY = 250;

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
            <h1 className="text-[20px] leading-7 font-semibold text-gray-900">运维指挥舱</h1>
            <span className="text-xs text-gray-400 font-normal">3D Topology Dashboard</span>
          </div>
          <p className="text-xs leading-5 text-gray-500 font-normal">
            3D 等距拓扑视图 - 全景态势感知与智能监控
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

          {/* Split Button */}
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
                <DropdownMenuLabel className="text-xs text-gray-500 font-medium">最近使用</DropdownMenuLabel>
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

      {/* 主视图区域 */}
      <div className="relative flex gap-4">
        {/* 左侧：3D 等距拓扑主视图 */}
        <div className="flex-1 relative">
          <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 rounded-lg overflow-hidden border border-gray-200/40 shadow-sm">
            {/* 背景装饰 */}
            <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.3 }}>
              <defs>
                <pattern id="isoGrid2" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill="#94a3b8" opacity="0.2" />
                  <line x1="0" y1="20" x2="40" y2="20" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.15" />
                  <line x1="20" y1="0" x2="20" y2="40" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.15" />
                </pattern>
                <radialGradient id="bgGlow1" cx="20%" cy="30%">
                  <stop offset="0%" stopColor="#ddd6fe" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ddd6fe" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="bgGlow2" cx="80%" cy="70%">
                  <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#isoGrid2)" />
              <ellipse cx="20%" cy="30%" rx="400" ry="300" fill="url(#bgGlow1)" />
              <ellipse cx="80%" cy="70%" rx="350" ry="250" fill="url(#bgGlow2)" />
            </svg>

            <svg width="100%" height="100%" viewBox="0 0 800 600" className="absolute inset-0">
              {/* 连接线 */}
              {nodes.map(node => (
                <ConnectionLine
                  key={node.id}
                  x1={centerX}
                  y1={centerY}
                  x2={node.x}
                  y2={node.y}
                  pulsePhase={pulsePhase}
                />
              ))}
              
              {buildings.map((building, idx) => (
                <ConnectionLine
                  key={`building-${idx}`}
                  x1={centerX}
                  y1={centerY}
                  x2={building.x}
                  y2={building.y}
                  pulsePhase={(pulsePhase + idx * 20) % 100}
                />
              ))}

              {/* 数据中心核心 */}
              <DataCenterCore x={centerX} y={centerY} />

              {/* 3D 建筑节点 */}
              {buildings.map((building, idx) => (
                <IsometricBuilding
                  key={idx}
                  x={building.x}
                  y={building.y}
                  color={building.color}
                  floors={building.floors}
                  label={building.label}
                  value={building.value}
                  status={building.status}
                />
              ))}

              {/* 数据浮标卡片 */}
              {nodes.map(node => (
                <FloatingDataCard
                  key={node.id}
                  x={node.x}
                  y={node.y}
                  label={node.label}
                  value={node.value}
                  unit={node.unit}
                  color={node.color}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* 右侧 Dock */}
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
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/90 to-transparent pointer-events-none"></div>
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
