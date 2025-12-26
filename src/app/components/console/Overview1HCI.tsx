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
  TrendingUp,
  TrendingDown,
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

// Sparkline 组件 - 24h 趋势
function Sparkline({ data, color = '#3B82F6', trend }: { data: number[]; color?: string; trend?: 'up' | 'down' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 20;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="flex items-center gap-1.5">
      <svg width={width} height={height} className="flex-shrink-0">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>
      {trend && (
        trend === 'up' ? (
          <TrendingUp className="w-3 h-3 text-green-600" strokeWidth={2} />
        ) : (
          <TrendingDown className="w-3 h-3 text-red-600" strokeWidth={2} />
        )
      )}
    </div>
  );
}

// KPI 卡片组件
function KPICard({
  title,
  value,
  subtitle,
  sparklineData,
  color = '#3B82F6',
  trend,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  sparklineData: number[];
  color?: string;
  trend?: 'up' | 'down';
}) {
  return (
    <div className="bg-white rounded-[10px] border border-[#E6ECF5] shadow-[0_2px_12px_rgba(15,23,42,0.06)] p-4 flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="text-xs leading-[18px] text-[#64748B] font-medium mb-1">{title}</div>
          <div className="text-[28px] leading-8 font-bold text-[#0F172A] tabular-nums">{value}</div>
          {subtitle && <div className="text-[11px] leading-4 text-[#64748B] mt-0.5">{subtitle}</div>}
        </div>
      </div>
      <div className="mt-auto pt-2 border-t border-[#E6ECF5]/50">
        <Sparkline data={sparklineData} color={color} trend={trend} />
      </div>
    </div>
  );
}

// 健康度环形图 - 四环分维度
function HealthRingChart({ 
  score, 
  dimensions,
  selectedDomain,
}: { 
  score: number; 
  dimensions: { name: string; score: number; color: string; key: string }[];
  selectedDomain: string | null;
}) {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.15) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const radius = 80;
  const centerX = 120;
  const centerY = 120;
  
  return (
    <svg width="240" height="240" viewBox="0 0 240 240">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* 呼吸光环 */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius + 35}
        fill="none"
        stroke="#E6ECF5"
        strokeWidth="1"
        opacity="0.4"
      >
        <animate attributeName="r" values={`${radius + 33};${radius + 37};${radius + 33}`} dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      
      {/* 四个维度环 */}
      {dimensions.map((dim, index) => {
        const ringRadius = radius - index * 15;
        const circumference = 2 * Math.PI * ringRadius;
        const scorePercentage = dim.score / 100;
        const strokeDasharray = `${circumference * scorePercentage} ${circumference}`;
        const isSelected = selectedDomain === dim.key;
        
        return (
          <g key={dim.key}>
            {/* 背景环 */}
            <circle
              cx={centerX}
              cy={centerY}
              r={ringRadius}
              fill="none"
              stroke="#E6ECF5"
              strokeWidth="8"
            />
            {/* 进度环 */}
            <circle
              cx={centerX}
              cy={centerY}
              r={ringRadius}
              fill="none"
              stroke={dim.color}
              strokeWidth={isSelected ? "10" : "8"}
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              transform={`rotate(-90 ${centerX} ${centerY})`}
              opacity={isSelected ? "0.9" : "0.7"}
              filter={isSelected ? "url(#glow)" : ""}
            >
              {isSelected && (
                <animate attributeName="stroke-width" values="8;11;8" dur="2s" repeatCount="indefinite" />
              )}
            </circle>
          </g>
        );
      })}
      
      {/* 中心总分 */}
      <circle cx={centerX} cy={centerY} r="35" fill="white" opacity="0.98" />
      <text
        x={centerX}
        y={centerY - 5}
        textAnchor="middle"
        fontSize="32"
        fontWeight="700"
        fill="#0F172A"
        className="tabular-nums"
      >
        {score}
      </text>
      <text
        x={centerX}
        y={centerY + 12}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="#64748B"
      >
        健康度
      </text>
      
      {/* 旋转指示器 */}
      <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
        <circle cx={centerX} cy={centerY - radius - 25} r="3" fill="#3B82F6" opacity="0.5">
          <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

// 域节点组件 - 带语义标签
function DomainNode({
  x,
  y,
  domain,
  total,
  normal,
  warning,
  error,
  color,
  isHighlighted,
  onClick,
}: {
  x: number;
  y: number;
  domain: string;
  total: number;
  normal: number;
  warning: number;
  error: number;
  color: string;
  isHighlighted: boolean;
  onClick: () => void;
}) {
  return (
    <g 
      transform={`translate(${x}, ${y})`} 
      className="cursor-pointer transition-all"
      onClick={onClick}
    >
      {/* 高亮光晕 */}
      {isHighlighted && (
        <circle cx="0" cy="0" r="65" fill={color} opacity="0.15">
          <animate attributeName="r" values="60;70;60" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2.5s" repeatCount="indefinite" />
        </circle>
      )}
      
      {/* 主节点圆 */}
      <circle
        cx="0"
        cy="0"
        r="45"
        fill="white"
        stroke={color}
        strokeWidth={isHighlighted ? "3" : "2"}
        opacity="0.98"
      />
      
      {/* 内圈装饰 */}
      <circle
        cx="0"
        cy="0"
        r="35"
        fill={color}
        opacity="0.08"
      />
      
      {/* 域名 */}
      <text
        x="0"
        y="-8"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="#334155"
      >
        {domain}
      </text>
      
      {/* 总数 */}
      <text
        x="0"
        y="8"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#0F172A"
        className="tabular-nums"
      >
        {total}
      </text>
      
      {/* 异常提示 */}
      {(warning > 0 || error > 0) && (
        <g>
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fontSize="9"
            fill="#EF4444"
          >
            {error > 0 ? `${error} 异常` : `${warning} 告警`}
          </text>
        </g>
      )}
      
      {/* 状态指示点 */}
      {error > 0 && (
        <circle cx="35" cy="-35" r="6" fill="#EF4444">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      {warning > 0 && error === 0 && (
        <circle cx="35" cy="-35" r="6" fill="#F59E0B">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      
      {/* 正常数量小标签 */}
      <text
        x="0"
        y="68"
        textAnchor="middle"
        fontSize="10"
        fill="#64748B"
      >
        {normal} 正常
      </text>
    </g>
  );
}

// 连接线组件 - 只在高亮时显示流动
function DomainConnection({
  x1, y1, x2, y2,
  isActive,
  color = '#E6ECF5',
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isActive: boolean;
  color?: string;
}) {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, [isActive]);
  
  const pulseProgress = phase / 100;
  const pulseX = x1 + (x2 - x1) * pulseProgress;
  const pulseY = y1 + (y2 - y1) * pulseProgress;
  
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isActive ? color : '#E6ECF5'}
        strokeWidth={isActive ? "2" : "1"}
        strokeDasharray={isActive ? "0" : "4 4"}
        opacity={isActive ? "0.6" : "0.3"}
      />
      {isActive && (
        <circle cx={pulseX} cy={pulseY} r="5" fill={color} opacity="0.8">
          <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

export function Overview1({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [highlightedDomain, setHighlightedDomain] = useState<string | null>(null);

  // KPI 数据
  const kpiData = [
    { 
      title: '集群数', 
      value: '3', 
      subtitle: '1 生产 / 2 测试',
      sparklineData: [2, 2, 2, 3, 3, 3, 3, 3],
      color: '#3B82F6',
    },
    { 
      title: '节点数', 
      value: '12', 
      subtitle: '10 就绪 / 2 调度中',
      sparklineData: [10, 10, 11, 11, 12, 12, 12, 12],
      color: '#3B82F6',
      trend: 'up' as const,
    },
    { 
      title: '虚拟机', 
      value: '48', 
      subtitle: '42 运行 / 3 关机',
      sparklineData: [45, 46, 45, 47, 48, 48, 48, 48],
      color: '#3B82F6',
    },
    { 
      title: '存储池', 
      value: '6', 
      subtitle: '5 正常 / 1 容量紧张',
      sparklineData: [6, 6, 6, 6, 6, 6, 6, 6],
      color: '#22C55E',
    },
    { 
      title: '卷数', 
      value: '85', 
      subtitle: '已使用 5.2 TiB',
      sparklineData: [78, 80, 82, 83, 84, 84, 85, 85],
      color: '#22C55E',
      trend: 'up' as const,
    },
    { 
      title: '告警（未确认）', 
      value: '4', 
      subtitle: '2 严重 / 2 主要',
      sparklineData: [3, 4, 5, 4, 4, 3, 4, 4],
      color: '#EF4444',
    },
    { 
      title: '24h 事件', 
      value: '127', 
      subtitle: '119 成功 / 8 失败',
      sparklineData: [100, 105, 110, 115, 120, 122, 125, 127],
      color: '#F59E0B',
      trend: 'up' as const,
    },
  ];

  // 健康度维度
  const healthDimensions = [
    { name: 'Compute', score: 95, color: '#3B82F6', key: 'compute' },
    { name: 'Storage', score: 85, color: '#22C55E', key: 'storage' },
    { name: 'Network', score: 92, color: '#8B5CF6', key: 'network' },
    { name: 'Control Plane', score: 98, color: '#06B6D4', key: 'cp' },
  ];

  // 域节点数据
  const domainNodes = [
    {
      key: 'compute',
      domain: '计算节点',
      total: 12,
      normal: 10,
      warning: 0,
      error: 2,
      color: '#3B82F6',
      x: 150,
      y: 180,
    },
    {
      key: 'vm',
      domain: '虚拟机',
      total: 48,
      normal: 42,
      warning: 3,
      error: 1,
      color: '#3B82F6',
      x: 150,
      y: 320,
    },
    {
      key: 'storage-pool',
      domain: '存储池',
      total: 6,
      normal: 5,
      warning: 1,
      error: 0,
      color: '#22C55E',
      x: 650,
      y: 180,
    },
    {
      key: 'volume',
      domain: '卷',
      total: 85,
      normal: 82,
      warning: 3,
      error: 0,
      color: '#22C55E',
      x: 650,
      y: 320,
    },
    {
      key: 'network',
      domain: 'VPC/子网',
      total: 8,
      normal: 8,
      warning: 0,
      error: 0,
      color: '#8B5CF6',
      x: 400,
      y: 420,
    },
  ];

  // 告警数据
  const alerts = [
    {
      id: 'alert-001',
      severity: 'critical',
      object: 'node-prod-02',
      summary: 'CPU 使用率持续超过 90%',
      duration: '15 分钟',
      domain: 'compute',
      domainLabel: 'Compute',
      time: '5 分钟前',
    },
    {
      id: 'alert-002',
      severity: 'critical',
      object: 'pv-data-01',
      summary: '存储卷空间不足（剩余 8%）',
      duration: '32 分钟',
      domain: 'storage-pool',
      domainLabel: 'Storage',
      time: '12 分钟前',
    },
    {
      id: 'alert-003',
      severity: 'major',
      object: 'etcd-cluster',
      summary: '响应延迟增加至 250ms',
      duration: '1 小时 5 分钟',
      domain: 'cp',
      domainLabel: 'Control Plane',
      time: '35 分钟前',
    },
    {
      id: 'alert-004',
      severity: 'major',
      object: 'node-prod-08',
      summary: '网络丢包率 1.2%（阈值 1%）',
      duration: '2 小时 15 分钟',
      domain: 'network',
      domainLabel: 'Network',
      time: '1 小时前',
    },
  ];

  // 近期任务
  const tasks = [
    {
      id: 'task-001',
      type: 'create',
      name: '创建虚拟机 dev-test-vm',
      status: 'running',
      progress: 65,
      time: '2 分钟前',
    },
    {
      id: 'task-002',
      type: 'migrate',
      name: '迁移 vm-web-03 到 node-prod-05',
      status: 'running',
      progress: 40,
      time: '8 分钟前',
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
    },
  ];

  // 变更事件
  const changes = [
    {
      id: 'change-001',
      type: 'config',
      action: '修改存储池副本数',
      user: '张三',
      status: 'completed',
      time: '30 分钟前',
    },
    {
      id: 'change-002',
      type: 'scale',
      action: '扩容虚拟机 vm-web-01 (2C4G → 4C8G)',
      user: '李四',
      status: 'completed',
      time: '1 小时前',
    },
    {
      id: 'change-003',
      type: 'network',
      action: '创建 VPC vpc-test-02',
      user: '王五',
      status: 'completed',
      time: '2 小时前',
    },
  ];

  const handleAlertClick = (alertId: string, domain: string) => {
    setSelectedAlert(alertId);
    setHighlightedDomain(domain);
  };

  const handleDomainClick = (domainKey: string) => {
    if (highlightedDomain === domainKey) {
      setHighlightedDomain(null);
      setSelectedAlert(null);
    } else {
      setHighlightedDomain(domainKey);
      setSelectedAlert(null);
    }
  };

  const centerX = 400;
  const centerY = 250;

  return (
    <div className="min-h-screen" style={{ background: '#F6F8FC' }}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs leading-[18px] mb-3">
        <span className="text-[#334155] font-medium">运维指挥舱</span>
      </div>

      {/* Page Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-[22px] leading-7 font-semibold text-[#0F172A] mb-1">HCI 运维指挥舱</h1>
          <p className="text-xs leading-5 text-[#64748B] font-normal">
            实时态势感知 · 三域拓扑 · 可决策联动
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-8 w-[110px] text-xs border-[#E6ECF5] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">近 1 小时</SelectItem>
              <SelectItem value="24h">近 24 小时</SelectItem>
              <SelectItem value="7d">近 7 天</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs border-[#E6ECF5] bg-white text-[#334155] hover:bg-gray-50"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
            刷新
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs border-[#E6ECF5] bg-white text-[#334155] hover:bg-gray-50"
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
                  批量创建
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* 顶部 KPI 带 */}
      <div className="grid grid-cols-7 gap-4 mb-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* 主内容区域 */}
      <div className="flex gap-4">
        {/* 左侧：三域拓扑 + 中央健康度 */}
        <div className="flex-1">
          <div className="bg-white rounded-[12px] border border-[#E6ECF5] shadow-[0_2px_12px_rgba(15,23,42,0.06)] p-6">
            {/* 标题 */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[15px] font-semibold text-[#0F172A] mb-1">三域拓扑 · Control Plane 健康度</h2>
                <p className="text-xs text-[#64748B]">
                  {highlightedDomain ? '已选中域节点 - 点击空白处取消' : '点击域节点或告警查看详情'}
                </p>
              </div>
              {highlightedDomain && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs border-[#E6ECF5]"
                  onClick={() => {
                    setHighlightedDomain(null);
                    setSelectedAlert(null);
                  }}
                >
                  清除选中
                </Button>
              )}
            </div>

            {/* SVG 拓扑视图 */}
            <div className="relative w-full" style={{ height: '520px' }}>
              <svg width="100%" height="520" viewBox="0 0 800 520">
                <defs>
                  <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="#E6ECF5" opacity="0.4" />
                  </pattern>
                </defs>
                
                {/* 背景网格 */}
                <rect width="800" height="520" fill="url(#dotGrid)" />
                
                {/* 连接线 */}
                {domainNodes.map(node => (
                  <DomainConnection
                    key={node.key}
                    x1={centerX}
                    y1={centerY}
                    x2={node.x}
                    y2={node.y}
                    isActive={highlightedDomain === node.key}
                    color={node.color}
                  />
                ))}
                
                {/* 中央健康度 */}
                <g transform={`translate(${centerX - 120}, ${centerY - 120})`}>
                  <HealthRingChart 
                    score={92} 
                    dimensions={healthDimensions}
                    selectedDomain={highlightedDomain}
                  />
                </g>
                
                {/* 维度标签 */}
                {healthDimensions.map((dim, index) => {
                  const angle = (index * 90 - 90) * Math.PI / 180;
                  const labelRadius = 140;
                  const labelX = centerX + Math.cos(angle) * labelRadius;
                  const labelY = centerY + Math.sin(angle) * labelRadius;
                  
                  return (
                    <g key={dim.key} transform={`translate(${labelX}, ${labelY})`}>
                      <rect
                        x="-35"
                        y="-12"
                        width="70"
                        height="24"
                        rx="8"
                        fill={dim.color}
                        opacity="0.1"
                      />
                      <text
                        x="0"
                        y="0"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="600"
                        fill={dim.color}
                        dy="4"
                      >
                        {dim.name}
                      </text>
                    </g>
                  );
                })}
                
                {/* 域节点 */}
                {domainNodes.map(node => {
                  const { key, ...nodeProps } = node;
                  return (
                    <DomainNode
                      key={key}
                      {...nodeProps}
                      isHighlighted={highlightedDomain === key}
                      onClick={() => handleDomainClick(key)}
                    />
                  );
                })}
                
                {/* 域标签背景 */}
                <g transform="translate(60, 100)">
                  <text fontSize="11" fontWeight="600" fill="#3B82F6" opacity="0.6">
                    Compute 域
                  </text>
                </g>
                <g transform="translate(650, 100)">
                  <text fontSize="11" fontWeight="600" fill="#22C55E" opacity="0.6" textAnchor="end">
                    Storage 域
                  </text>
                </g>
                <g transform="translate(400, 490)">
                  <text fontSize="11" fontWeight="600" fill="#8B5CF6" opacity="0.6" textAnchor="middle">
                    Network 域
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* 右侧面板 */}
        <div className="w-[420px] flex-shrink-0">
          <Tabs defaultValue="alerts" className="w-full">
            <div
              className="bg-white rounded-[12px] border border-[#E6ECF5] shadow-[0_2px_12px_rgba(15,23,42,0.06)] overflow-hidden flex flex-col"
              style={{ height: '700px' }}
            >
              {/* Tab Header */}
              <div className="px-4 py-3 border-b border-[#E6ECF5] flex-shrink-0">
                <TabsList className="h-8 bg-[#F6F8FC] p-0.5">
                  <TabsTrigger value="alerts" className="text-xs">
                    告警
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="text-xs">
                    近期任务
                  </TabsTrigger>
                  <TabsTrigger value="changes" className="text-xs">
                    变更事件
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content - 告警 */}
              <TabsContent value="alerts" className="m-0 flex-1 flex flex-col min-h-0">
                <div className="px-4 py-2.5 border-b border-[#E6ECF5] flex items-center justify-between flex-shrink-0">
                  <span className="text-xs text-[#64748B]">未确认 4 项 · 点击联动主视图</span>
                </div>
                <div className="flex-1 overflow-y-auto relative min-h-0 scroll-smooth custom-scrollbar">
                  <style>{`
                    .custom-scrollbar::-webkit-scrollbar {
                      width: 5px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background-color: #E6ECF5;
                      border-radius: 3px;
                    }
                    .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                      background-color: #cbd5e1;
                    }
                  `}</style>
                  <div className="divide-y divide-[#E6ECF5]">
                    {alerts.map((alert) => (
                      <button
                        key={alert.id}
                        className={`w-full px-4 py-3 transition text-left ${
                          selectedAlert === alert.id
                            ? 'bg-blue-50/50 border-l-2 border-blue-500'
                            : 'hover:bg-[#F6F8FC] border-l-2 border-transparent'
                        }`}
                        onClick={() => handleAlertClick(alert.id, alert.domain)}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-[8px] text-[10px] leading-4 font-semibold ${
                              alert.severity === 'critical'
                                ? 'bg-[#FEE2E2] text-[#EF4444]'
                                : 'bg-[#FED7AA] text-[#F97316]'
                            }`}
                          >
                            {alert.severity === 'critical' ? '严重' : '主要'}
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-[8px] text-[10px] leading-4 font-medium bg-[#E6ECF5] text-[#334155]">
                            {alert.domainLabel}
                          </span>
                        </div>
                        <p className="text-sm leading-5 text-[#0F172A] font-medium mb-1.5">{alert.summary}</p>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-[#64748B]">对象:</span>
                          <span className="text-xs text-[#334155] font-mono font-medium">{alert.object}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#64748B]">持续 {alert.duration}</span>
                          <span className="text-[#94a3b8]">{alert.time}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
              </TabsContent>

              {/* Tab Content - 近期任务 */}
              <TabsContent value="tasks" className="m-0 flex-1 flex flex-col min-h-0">
                <div className="px-4 py-2.5 border-b border-[#E6ECF5] flex items-center justify-between flex-shrink-0">
                  <span className="text-xs text-[#64748B]">最近 4 条</span>
                </div>
                <div className="flex-1 overflow-y-auto relative min-h-0 scroll-smooth custom-scrollbar">
                  <div className="divide-y divide-[#E6ECF5]">
                    {tasks.map((task) => (
                      <div key={task.id} className="px-4 py-3 hover:bg-[#F6F8FC] transition">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-[8px] text-[10px] leading-4 font-semibold ${
                                task.type === 'create'
                                  ? 'bg-[#DBEAFE] text-[#3B82F6]'
                                  : task.type === 'migrate'
                                  ? 'bg-[#EDE9FE] text-[#8B5CF6]'
                                  : task.type === 'backup'
                                  ? 'bg-[#D1FAE5] text-[#22C55E]'
                                  : 'bg-[#E0E7FF] text-[#6366F1]'
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
                              className={`inline-flex items-center px-2 py-0.5 rounded-[8px] text-[10px] leading-4 font-semibold ${
                                task.status === 'running'
                                  ? 'bg-[#DBEAFE] text-[#3B82F6]'
                                  : task.status === 'failed'
                                  ? 'bg-[#FEE2E2] text-[#EF4444]'
                                  : 'bg-[#D1FAE5] text-[#22C55E]'
                              }`}
                            >
                              {task.status === 'running' ? '进行中' : task.status === 'failed' ? '失败' : '已完成'}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#94a3b8]">{task.time}</span>
                        </div>
                        <p className="text-sm leading-5 text-[#0F172A] mb-2 truncate">{task.name}</p>
                        {task.error && (
                          <p className="text-xs text-[#EF4444] mb-2">错误: {task.error}</p>
                        )}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-[#E6ECF5] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                task.status === 'completed'
                                  ? 'bg-[#22C55E]'
                                  : task.status === 'failed'
                                  ? 'bg-[#EF4444]'
                                  : 'bg-[#3B82F6]'
                              }`}
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-[#64748B] tabular-nums w-10 text-right">{task.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
              </TabsContent>

              {/* Tab Content - 变更事件 */}
              <TabsContent value="changes" className="m-0 flex-1 flex flex-col min-h-0">
                <div className="px-4 py-2.5 border-b border-[#E6ECF5] flex items-center justify-between flex-shrink-0">
                  <span className="text-xs text-[#64748B]">最近 3 条</span>
                </div>
                <div className="flex-1 overflow-y-auto relative min-h-0 scroll-smooth custom-scrollbar">
                  <div className="divide-y divide-[#E6ECF5]">
                    {changes.map((change) => (
                      <div key={change.id} className="px-4 py-3 hover:bg-[#F6F8FC] transition">
                        <div className="flex items-start justify-between mb-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-[8px] text-[10px] leading-4 font-semibold ${
                              change.type === 'config'
                                ? 'bg-[#E0E7FF] text-[#6366F1]'
                                : change.type === 'scale'
                                ? 'bg-[#DBEAFE] text-[#3B82F6]'
                                : 'bg-[#EDE9FE] text-[#8B5CF6]'
                            }`}
                          >
                            {change.type === 'config' ? '配置' : change.type === 'scale' ? '扩容' : '网络'}
                          </span>
                          <span className="text-[11px] text-[#94a3b8]">{change.time}</span>
                        </div>
                        <p className="text-sm leading-5 text-[#0F172A] mb-1.5">{change.action}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#64748B]">操作人:</span>
                          <span className="text-xs text-[#334155]">{change.user}</span>
                          <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-[8px] text-[10px] leading-4 font-semibold bg-[#D1FAE5] text-[#22C55E]">
                            已完成
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}