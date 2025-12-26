import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Search,
  Download,
  Plus,
  MoreHorizontal,
  ChevronDown,
  LayoutDashboard,
  Copy,
  Server,
  Image,
  Disc,
  Network,
  Terminal,
  ListTodo,
  ExternalLink,
  AlertCircle,
  Activity,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { StatusPill } from "./StatusPill";
import { TooltipWithCopy } from "./TooltipWithCopy";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";

// 环形健康分组件
function CircularHealth({
  score,
  size = 72,
}: {
  score: number;
  size?: number;
}) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const strokeWidth = 7;

  const color =
    score >= 90
      ? "#10b981"
      : score >= 70
        ? "#f59e0b"
        : score >= 50
          ? "#ef4444"
          : "#dc2626";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* 背景圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* 进度圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[24px] leading-none font-semibold text-gray-900 tabular-nums">
          {score}
        </span>
      </div>
    </div>
  );
}

// 告警环图组件
function AlertDonut({
  critical,
  important,
  warning,
}: {
  critical: number;
  important: number;
  warning: number;
}) {
  const total = critical + important + warning;
  if (total === 0) return null;

  const size = 64;
  const radius = 24;
  const circumference = 2 * Math.PI * radius;

  const criticalPercent = (critical / total) * 100;
  const importantPercent = (important / total) * 100;

  const criticalDash = (criticalPercent / 100) * circumference;
  const importantDash =
    (importantPercent / 100) * circumference;
  const warningDash =
    (((warning / total) * 100) / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="transform -rotate-90"
    >
      {/* 背景 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#f3f4f6"
        strokeWidth={6}
        fill="none"
      />
      {/* 严重 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#ef4444"
        strokeWidth={6}
        fill="none"
        strokeDasharray={`${criticalDash} ${circumference - criticalDash}`}
        strokeDashoffset={0}
        strokeLinecap="round"
      />
      {/* 重要 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#f97316"
        strokeWidth={6}
        fill="none"
        strokeDasharray={`${importantDash} ${circumference - importantDash}`}
        strokeDashoffset={-criticalDash}
        strokeLinecap="round"
      />
      {/* 一般 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#f59e0b"
        strokeWidth={6}
        fill="none"
        strokeDasharray={`${warningDash} ${circumference - warningDash}`}
        strokeDashoffset={-(criticalDash + importantDash)}
        strokeLinecap="round"
      />
    </svg>
  );
}

// Sparkline 组件
function Sparkline({
  data,
  width = 56,
  height = 16,
}: {
  data: number[];
  width?: number;
  height?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Overview({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [timeRange, setTimeRange] = useState("24h");
  const [vmFilter, setVmFilter] = useState<
    "all" | "running" | "creating" | "error" | "stopped"
  >("all");
  const [hotspotTab, setHotspotTab] = useState<
    "nodes" | "vms" | "volumes"
  >("nodes");

  // Mock 数据
  const clusterHealth = {
    score: 92,
    status: "健康",
    components: [
      {
        name: "API",
        status: "healthy",
        detail: "API Server 响应正常",
      },
      {
        name: "调度",
        status: "healthy",
        detail: "Scheduler 运行正常",
      },
      {
        name: "网络",
        status: "healthy",
        detail: "CNI 插件正常",
      },
      {
        name: "存储",
        status: "warning",
        detail: "Storage 有1个卷降级",
      },
      {
        name: "监控",
        status: "healthy",
        detail: "监控服务正常",
      },
    ],
    lastUpdate: "2024-12-23 14:25:33",
  };

  const resources = {
    cpu: {
      used: 136,
      reserved: 24,
      total: 200,
      sparkline: [
        58, 62, 65, 68, 72, 70, 68, 71, 74, 72, 69, 68,
      ],
    },
    memory: {
      used: 576,
      reserved: 64,
      total: 800,
      sparkline: [
        65, 68, 70, 72, 75, 73, 71, 72, 74, 76, 74, 72,
      ],
    },
    storage: {
      used: 4500,
      reserved: 500,
      total: 10000,
      health: "正常",
      sparkline: [
        42, 43, 44, 45, 46, 45, 44, 45, 46, 47, 45, 45,
      ],
    },
  };

  const alerts = {
    critical: 2,
    important: 3,
    warning: 3,
    unconfirmed: 4,
    newInHour: 2,
    recoveredInHour: 1,
    list: [
      {
        id: "alert-001",
        severity: "critical",
        title: "node-prod-02 CPU 使用率持续超过 90%",
        source: "node-prod-02",
        time: "5 分钟前",
      },
      {
        id: "alert-002",
        severity: "critical",
        title: "存储卷 pv-data-01 空间不足",
        source: "Storage",
        time: "12 分钟前",
      },
      {
        id: "alert-003",
        severity: "important",
        title: "etcd 集群响应延迟增加",
        source: "Control Plane",
        time: "35 分钟前",
      },
      {
        id: "alert-004",
        severity: "warning",
        title: "node-prod-08 网络丢包率上升",
        source: "node-prod-08",
        time: "1 小时前",
      },
    ],
    events: [
      {
        type: "error",
        text: "node-prod-11 离线",
        time: "15 分钟前",
      },
      {
        type: "warning",
        text: "存储池 pool-02 降级",
        time: "42 分钟前",
      },
    ],
  };

  const hotspots = {
    nodes: {
      cpu: [
        { name: "node-prod-01", value: 87, unit: "%" },
        { name: "node-prod-05", value: 82, unit: "%" },
        { name: "node-prod-03", value: 78, unit: "%" },
        { name: "node-prod-07", value: 75, unit: "%" },
        { name: "node-prod-02", value: 71, unit: "%" },
      ],
      memory: [
        { name: "node-prod-02", value: 92, unit: "%" },
        { name: "node-prod-01", value: 88, unit: "%" },
        { name: "node-prod-05", value: 85, unit: "%" },
        { name: "node-prod-03", value: 78, unit: "%" },
        { name: "node-prod-07", value: 72, unit: "%" },
      ],
    },
    vms: [
      { name: "web-server-01", value: 89, unit: "% CPU" },
      { name: "database-master", value: 85, unit: "% CPU" },
      { name: "app-backend-01", value: 78, unit: "% CPU" },
      { name: "cache-redis-01", value: 72, unit: "% CPU" },
      { name: "monitoring-grafana", value: 68, unit: "% CPU" },
    ],
    volumes: [
      { name: "pv-data-01", value: 95, unit: "% 已用" },
      { name: "pv-logs-02", value: 88, unit: "% 已用" },
      { name: "pv-backup-03", value: 82, unit: "% 已用" },
      { name: "pv-cache-01", value: 75, unit: "% 已用" },
      { name: "pv-temp-05", value: 68, unit: "% 已用" },
    ],
  };

  const vms = [
    {
      id: "vm-001",
      name: "web-server-01",
      status: "running",
      node: "node-prod-01",
      cpu: "4 核",
      memory: "8 GB",
      ip: "10.0.1.100",
      updateTime: "2024-12-23 10:23",
    },
    {
      id: "vm-002",
      name: "database-master",
      status: "running",
      node: "node-prod-02",
      cpu: "8 核",
      memory: "16 GB",
      ip: "10.0.2.50",
      updateTime: "2024-12-23 09:15",
    },
    {
      id: "vm-003",
      name: "app-backend-01",
      status: "running",
      node: "node-prod-03",
      cpu: "4 核",
      memory: "8 GB",
      ip: "10.0.3.120",
      updateTime: "2024-12-22 16:30",
    },
    {
      id: "vm-004",
      name: "test-env-server",
      status: "stopped",
      node: "node-prod-04",
      cpu: "2 核",
      memory: "4 GB",
      ip: "10.0.4.80",
      updateTime: "2024-12-22 14:22",
    },
    {
      id: "vm-005",
      name: "cache-redis-01",
      status: "error",
      node: "node-prod-01",
      cpu: "2 核",
      memory: "8 GB",
      ip: "10.0.1.150",
      updateTime: "2024-12-23 11:45",
    },
    {
      id: "vm-006",
      name: "monitoring-grafana",
      status: "creating",
      node: "node-prod-05",
      cpu: "2 核",
      memory: "4 GB",
      ip: "-",
      updateTime: "2024-12-23 14:18",
    },
  ];

  const tasks = [
    {
      id: "task-001",
      type: "create",
      name: "创建虚拟机 dev-test-vm",
      status: "running",
      progress: 65,
      time: "2 分钟前",
      error: null,
    },
    {
      id: "task-002",
      type: "migrate",
      name: "迁移 vm-web-03 到 node-prod-05",
      status: "running",
      progress: 40,
      time: "8 分钟前",
      error: null,
    },
    {
      id: "task-003",
      type: "backup",
      name: "备份数据库 vm-db-master",
      status: "failed",
      progress: 45,
      time: "25 分钟前",
      error: "存储不可用",
    },
    {
      id: "task-004",
      type: "upgrade",
      name: "升级 K8s 集群到 v1.28.4",
      status: "completed",
      progress: 100,
      time: "1 小时前",
      error: null,
    },
  ];

  const filteredVms =
    vmFilter === "all"
      ? vms
      : vms.filter((vm) => vm.status === vmFilter);

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs leading-[18px] mb-2">
        <span className="text-gray-700 font-medium">总览</span>
      </div>

      {/* Page Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 bg-[#3b82f6]/6 border border-[#3b82f6]/12 rounded flex items-center justify-center flex-shrink-0">
              <LayoutDashboard
                className="w-[15px] h-[15px] text-[#3b82f6]/70"
                strokeWidth={1.5}
              />
            </div>
            <h1 className="text-[20px] leading-7 font-semibold text-gray-900">
              总览
            </h1>
          </div>
          <p className="text-xs leading-5 text-gray-500 font-normal">
            查看集群健康、资源压力、告警态势与虚拟机状态
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
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
            <Download
              className="w-3.5 h-3.5 mr-1.5"
              strokeWidth={1.5}
            />
            导出
          </Button>

          {/* Split Button - 主入口 */}
          <div className="flex items-center">
            <Button
              size="sm"
              className="h-10 text-sm bg-[#1e40af] hover:bg-[#1e3a8a] rounded-r-none"
            >
              <Plus
                className="w-4 h-4 mr-1.5"
                strokeWidth={1.5}
              />
              创建虚拟机
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="h-10 w-9 p-0 bg-[#1e40af] hover:bg-[#1e3a8a] rounded-l-none border-l border-white/20"
                >
                  <ChevronDown
                    className="w-4 h-4"
                    strokeWidth={1.5}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[300px]"
              >
                {/* 最近使用 */}
                <DropdownMenuLabel className="text-xs text-gray-500 font-medium">
                  最近使用
                </DropdownMenuLabel>
                <DropdownMenuItem className="text-sm py-2">
                  <Copy
                    className="w-4 h-4 mr-2 text-gray-500"
                    strokeWidth={1.5}
                  />
                  <div className="flex-1">
                    <div className="text-sm">
                      从模板：Ubuntu-2C4G
                    </div>
                    <div className="text-xs text-gray-500">
                      最常使用的模板
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm py-2">
                  <Server
                    className="w-4 h-4 mr-2 text-gray-500"
                    strokeWidth={1.5}
                  />
                  <div className="flex-1">
                    <div className="text-sm">
                      批量创建：网段+偏移
                    </div>
                    <div className="text-xs text-gray-500">
                      快速创建多个实例
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm py-2">
                  <Image
                    className="w-4 h-4 mr-2 text-gray-500"
                    strokeWidth={1.5}
                  />
                  <div className="flex-1">
                    <div className="text-sm">最近镜像</div>
                    <div className="text-xs text-gray-500">
                      Debian 11 Docker
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {/* 创建虚拟机 */}
                <DropdownMenuLabel className="text-xs text-gray-500 font-medium">
                  创建虚拟机
                </DropdownMenuLabel>
                <DropdownMenuItem 
                  className="text-sm"
                  onClick={() => onNavigate?.('vm')}
                >
                  <Plus
                    className="w-4 h-4 mr-2 text-gray-500"
                    strokeWidth={1.5}
                  />
                  空白创建
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Copy
                    className="w-4 h-4 mr-2 text-gray-500"
                    strokeWidth={1.5}
                  />
                  从模板创建
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Server
                    className="w-4 h-4 mr-2 text-gray-500"
                    strokeWidth={1.5}
                  />
                  批量创建（网段+偏移）
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {/* 准备资源 */}
                <DropdownMenuLabel className="text-xs text-gray-500 font-medium">
                  准备资源
                </DropdownMenuLabel>
                <DropdownMenuItem className="text-sm">
                  <Image
                    className="w-4 h-4 mr-2 text-gray-500"
                    strokeWidth={1.5}
                  />
                  导入镜像
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Disc
                    className="w-4 h-4 mr-2 text-gray-500"
                    strokeWidth={1.5}
                  />
                  创建磁盘/卷
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Network
                    className="w-4 h-4 mr-2 text-gray-500"
                    strokeWidth={1.5}
                  />
                  创建网络
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {/* 常用工具 */}
                <DropdownMenuLabel className="text-xs text-gray-500 font-medium">
                  常用工具
                </DropdownMenuLabel>
                <DropdownMenuItem className="text-sm">
                  <ListTodo
                    className="w-4 h-4 mr-2 text-gray-500"
                    strokeWidth={1.5}
                  />
                  查看创建任务
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Terminal
                    className="w-4 h-4 mr-2 text-gray-500"
                    strokeWidth={1.5}
                  />
                  打开控制台（最近异常 VM）
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Row 1 - 5秒态势区 (高度 140px) */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        {/* 集群健康 Hero Card - 5 cols */}
        <div className="col-span-5 border border-gray-200/60 rounded-lg bg-white shadow-sm p-4">
          <div className="flex items-start gap-4">
            <CircularHealth
              score={clusterHealth.score}
              size={72}
            />
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">
                集群健康度
              </div>
              <div className="text-sm font-semibold text-gray-900 mb-2">
                {clusterHealth.status}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {clusterHealth.components.map((comp) => (
                  <span
                    key={comp.name}
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer transition-colors ${
                      comp.status === "healthy"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                        : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                    }`}
                    title={comp.detail}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full mr-1 ${
                        comp.status === "healthy"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      }`}
                    ></div>
                    {comp.name}
                  </span>
                ))}
              </div>
              <div className="text-[11px] text-gray-400">
                更新: {clusterHealth.lastUpdate}
              </div>
            </div>
          </div>
        </div>

        {/* 资源压力 Card - 4 cols */}
        <div className="col-span-4 border border-gray-200/60 rounded-lg bg-white shadow-sm p-4">
          <div className="text-sm font-medium text-gray-900 mb-3">
            资源压力
          </div>
          <div className="space-y-3">
            {/* CPU */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-600">
                  CPU
                </span>
                <div className="flex items-center gap-2">
                  <Sparkline
                    data={resources.cpu.sparkline}
                    width={56}
                    height={16}
                  />
                  <span className="text-xs text-gray-500 tabular-nums">
                    {resources.cpu.used}/
                    {resources.cpu.reserved}/
                    {resources.cpu.total} 核
                  </span>
                </div>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                <div
                  className="bg-amber-500"
                  style={{
                    width: `${(resources.cpu.used / resources.cpu.total) * 100}%`,
                  }}
                ></div>
                <div
                  className="bg-amber-300"
                  style={{
                    width: `${(resources.cpu.reserved / resources.cpu.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Memory */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-600">
                  内存
                </span>
                <div className="flex items-center gap-2">
                  <Sparkline
                    data={resources.memory.sparkline}
                    width={56}
                    height={16}
                  />
                  <span className="text-xs text-gray-500 tabular-nums">
                    {resources.memory.used}/
                    {resources.memory.reserved}/
                    {resources.memory.total} GB
                  </span>
                </div>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                <div
                  className="bg-purple-500"
                  style={{
                    width: `${(resources.memory.used / resources.memory.total) * 100}%`,
                  }}
                ></div>
                <div
                  className="bg-purple-300"
                  style={{
                    width: `${(resources.memory.reserved / resources.memory.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Storage */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-600">
                  存储
                </span>
                <div className="flex items-center gap-2">
                  <Sparkline
                    data={resources.storage.sparkline}
                    width={56}
                    height={16}
                  />
                  <span className="text-xs text-gray-500 tabular-nums">
                    {resources.storage.used}/
                    {resources.storage.reserved}/
                    {resources.storage.total} GB
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700">
                    {resources.storage.health}
                  </span>
                </div>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                <div
                  className="bg-indigo-500"
                  style={{
                    width: `${(resources.storage.used / resources.storage.total) * 100}%`,
                  }}
                ></div>
                <div
                  className="bg-indigo-300"
                  style={{
                    width: `${(resources.storage.reserved / resources.storage.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 告警态势 Card - 3 cols */}
        <div className="col-span-3 border border-gray-200/60 rounded-lg bg-white shadow-sm p-4">
          <div className="text-sm font-medium text-gray-900 mb-3">
            告警态势
          </div>
          <div className="flex items-start gap-3 mb-3">
            <AlertDonut
              critical={alerts.critical}
              important={alerts.important}
              warning={alerts.warning}
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  严重
                </span>
                <span className="text-sm font-semibold text-red-600 tabular-nums">
                  {alerts.critical}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  重要
                </span>
                <span className="text-sm font-semibold text-orange-600 tabular-nums">
                  {alerts.important}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  一般
                </span>
                <span className="text-sm font-semibold text-amber-600 tabular-nums">
                  {alerts.warning}
                </span>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">
                未确认
              </span>
              <span className="text-sm font-semibold text-blue-600 tabular-nums">
                {alerts.unconfirmed}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-500">
                近1h新增 {alerts.newInHour}
              </span>
              <span className="text-green-600">
                恢复 {alerts.recoveredInHour}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 - 定位区与处置区 (使用 Tabs 承载，高度 520px) */}
      <div className="grid grid-cols-12 gap-4">
        {/* 左侧 8 列：Tab Card「资源热点 / 虚拟机」 */}
        <div className="col-span-8">
          <Tabs defaultValue="hotspot" className="w-full">
            <div
              className="border border-gray-200/60 rounded-lg bg-white shadow-sm overflow-hidden flex flex-col"
              style={{ height: "500px" }}
            >
              {/* Tab Header */}
              <div className="px-4 py-2.5 border-b border-gray-100 flex-shrink-0">
                <TabsList className="h-8 bg-gray-50 p-0.5">
                  <TabsTrigger
                    value="hotspot"
                    className="text-xs"
                  >
                    资源热点
                  </TabsTrigger>
                  <TabsTrigger value="vms" className="text-xs">
                    虚拟机
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content - 资源热点 */}
              <TabsContent
                value="hotspot"
                className="m-0 p-4 flex-1 overflow-y-auto custom-scrollbar"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    Top 5
                  </h3>
                  <div className="flex items-center gap-1 bg-gray-50 p-0.5 rounded">
                    <button
                      onClick={() => setHotspotTab("nodes")}
                      className={`px-2.5 py-1 text-xs rounded transition-colors ${
                        hotspotTab === "nodes"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      节点
                    </button>
                    <button
                      onClick={() => setHotspotTab("vms")}
                      className={`px-2.5 py-1 text-xs rounded transition-colors ${
                        hotspotTab === "vms"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      虚拟机
                    </button>
                    <button
                      onClick={() => setHotspotTab("volumes")}
                      className={`px-2.5 py-1 text-xs rounded transition-colors ${
                        hotspotTab === "volumes"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      卷
                    </button>
                  </div>
                </div>

                {hotspotTab === "nodes" && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* CPU Top */}
                    <div>
                      <div className="text-xs text-gray-500 mb-2">
                        CPU 使用率
                      </div>
                      <div className="space-y-2">
                        {hotspots.nodes.cpu.map((node, idx) => (
                          <button
                            key={idx}
                            className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors"
                          >
                            <span className="text-xs text-gray-500 w-4 tabular-nums">
                              {idx + 1}
                            </span>
                            <span className="text-xs text-gray-700 font-mono flex-1 truncate text-left">
                              {node.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-amber-500 rounded-full"
                                  style={{
                                    width: `${node.value}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600 tabular-nums w-8 text-right">
                                {node.value}
                                {node.unit}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Memory Top */}
                    <div>
                      <div className="text-xs text-gray-500 mb-2">
                        内存使用率
                      </div>
                      <div className="space-y-2">
                        {hotspots.nodes.memory.map(
                          (node, idx) => (
                            <button
                              key={idx}
                              className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors"
                            >
                              <span className="text-xs text-gray-500 w-4 tabular-nums">
                                {idx + 1}
                              </span>
                              <span className="text-xs text-gray-700 font-mono flex-1 truncate text-left">
                                {node.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-purple-500 rounded-full"
                                    style={{
                                      width: `${node.value}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-600 tabular-nums w-8 text-right">
                                  {node.value}
                                  {node.unit}
                                </span>
                              </div>
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {hotspotTab === "vms" && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2">
                      虚拟机 CPU 使用率
                    </div>
                    <div className="space-y-2">
                      {hotspots.vms.map((vm, idx) => (
                        <button
                          key={idx}
                          className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors"
                        >
                          <span className="text-xs text-gray-500 w-4 tabular-nums">
                            {idx + 1}
                          </span>
                          <span className="text-xs text-gray-700 font-mono flex-1 truncate text-left">
                            {vm.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{
                                  width: `${vm.value}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 tabular-nums w-16 text-right">
                              {vm.value} {vm.unit}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {hotspotTab === "volumes" && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2">
                      存储卷使用率
                    </div>
                    <div className="space-y-2">
                      {hotspots.volumes.map((vol, idx) => (
                        <button
                          key={idx}
                          className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors"
                        >
                          <span className="text-xs text-gray-500 w-4 tabular-nums">
                            {idx + 1}
                          </span>
                          <span className="text-xs text-gray-700 font-mono flex-1 truncate text-left">
                            {vol.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{
                                  width: `${vol.value}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 tabular-nums w-16 text-right">
                              {vol.value} {vol.unit}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Tab Content - 虚拟机 */}
              <TabsContent
                value="vms"
                className="m-0 flex-1 flex flex-col min-h-0"
              >
                {/* Header */}
                <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between gap-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {(
                        [
                          "all",
                          "running",
                          "creating",
                          "error",
                          "stopped",
                        ] as const
                      ).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setVmFilter(filter)}
                          className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                            vmFilter === filter
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {filter === "all"
                            ? "全部"
                            : filter === "running"
                              ? "运行中"
                              : filter === "creating"
                                ? "创建中"
                                : filter === "error"
                                  ? "异常"
                                  : "已关机"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search
                        className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                        strokeWidth={1.5}
                      />
                      <Input
                        placeholder="搜索虚拟机..."
                        className="pl-8 h-7 w-40 text-xs bg-white border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500"
                      />
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-6 p-0 text-xs text-blue-600 hover:text-blue-700"
                    >
                      查看全部
                      <ExternalLink
                        className="w-3 h-3 ml-1"
                        strokeWidth={1.5}
                      />
                    </Button>
                  </div>
                </div>

                {/* Table - Scrollable */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <div
                    style={{ padding: "0 10px" }}
                    className="overflow-x-auto"
                  >
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-100">
                          <th className="w-10 px-3 py-2.5">
                            <Checkbox />
                          </th>
                          <th className="px-3 py-2.5 text-left text-xs leading-[18px] font-medium text-gray-500">
                            名称
                          </th>
                          <th className="px-3 py-2.5 text-left text-xs leading-[18px] font-medium text-gray-500">
                            状态
                          </th>
                          <th className="px-3 py-2.5 text-left text-xs leading-[18px] font-medium text-gray-500">
                            节点
                          </th>
                          <th className="px-3 py-2.5 text-left text-xs leading-[18px] font-medium text-gray-500">
                            CPU
                          </th>
                          <th className="px-3 py-2.5 text-left text-xs leading-[18px] font-medium text-gray-500">
                            内存
                          </th>
                          <th className="px-3 py-2.5 text-left text-xs leading-[18px] font-medium text-gray-500">
                            IP
                          </th>
                          <th className="px-3 py-2.5 text-left text-xs leading-[18px] font-medium text-gray-500">
                            更新
                          </th>
                          <th className="px-3 py-2.5 text-left text-xs leading-[18px] font-medium text-gray-500">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {filteredVms.slice(0, 6).map((vm) => (
                          <tr
                            key={vm.id}
                            className={`hover:bg-gray-50/30 transition ${
                              vm.status === "error"
                                ? "bg-red-50/30"
                                : ""
                            }`}
                          >
                            <td className="px-3 py-2.5">
                              <Checkbox />
                            </td>
                            <td className="px-3 py-2.5">
                              <TooltipWithCopy text={vm.name}>
                                <div className="text-sm leading-[20px] text-gray-900 font-mono truncate max-w-[100px]">
                                  {vm.name}
                                </div>
                              </TooltipWithCopy>
                            </td>
                            <td className="px-3 py-2.5">
                              <StatusPill
                                status={
                                  vm.status === "running"
                                    ? "success"
                                    : vm.status === "stopped"
                                      ? "default"
                                      : vm.status === "creating"
                                        ? "warning"
                                        : "error"
                                }
                                label={
                                  vm.status === "running"
                                    ? "运行中"
                                    : vm.status === "stopped"
                                      ? "已关机"
                                      : vm.status === "creating"
                                        ? "创建中"
                                        : "异常"
                                }
                              />
                            </td>
                            <td className="px-3 py-2.5">
                              <span className="text-sm leading-[20px] text-gray-700 font-mono">
                                {vm.node}
                              </span>
                            </td>
                            <td className="px-3 py-2.5">
                              <span className="text-sm leading-[20px] text-gray-700">
                                {vm.cpu}
                              </span>
                            </td>
                            <td className="px-3 py-2.5">
                              <span className="text-sm leading-[20px] text-gray-700">
                                {vm.memory}
                              </span>
                            </td>
                            <td className="px-3 py-2.5">
                              <TooltipWithCopy text={vm.ip}>
                                <span className="text-sm leading-[20px] text-gray-700 font-mono">
                                  {vm.ip}
                                </span>
                              </TooltipWithCopy>
                            </td>
                            <td className="px-3 py-2.5">
                              <span className="text-xs leading-[18px] text-gray-500">
                                {vm.updateTime}
                              </span>
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="flex items-center gap-1.5">
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-6 p-0 text-xs leading-6 text-blue-600 hover:text-blue-700"
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
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-24"
                                  >
                                    <DropdownMenuItem className="text-xs">
                                      启动
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-xs">
                                      重启
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
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
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* 右侧 4 列：Tab Card「告警 / 近期任务」 */}
        <div className="col-span-4">
          <Tabs defaultValue="alerts" className="w-full">
            <div
              className="border border-gray-200/60 rounded-lg bg-white shadow-sm overflow-hidden flex flex-col"
              style={{ height: "500px" }}
            >
              {/* Tab Header */}
              <div className="px-4 py-2.5 border-b border-gray-100 flex-shrink-0">
                <TabsList className="h-8 bg-gray-50 p-0.5">
                  <TabsTrigger
                    value="alerts"
                    className="text-xs"
                  >
                    告警
                  </TabsTrigger>
                  <TabsTrigger
                    value="tasks"
                    className="text-xs"
                  >
                    近期任务
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content - 告警 */}
              <TabsContent
                value="alerts"
                className="m-0 flex-1 flex flex-col min-h-0"
              >
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                  <span className="text-xs text-gray-600">
                    {alerts.unconfirmed} 未确认
                  </span>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-6 p-0 text-xs text-blue-600 hover:text-blue-700"
                  >
                    查看全部
                  </Button>
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
                    {alerts.list.slice(0, 4).map((alert) => (
                      <button
                        key={alert.id}
                        className="w-full px-4 py-3 hover:bg-gray-50/50 transition text-left"
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] leading-3 font-medium ${
                              alert.severity === "critical"
                                ? "bg-red-100 text-red-700"
                                : alert.severity === "important"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {alert.severity === "critical"
                              ? "严重"
                              : alert.severity === "important"
                                ? "重要"
                                : "一般"}
                          </span>
                        </div>
                        <p className="text-xs leading-[18px] text-gray-900 mb-1 line-clamp-1">
                          {alert.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-gray-500">
                            {alert.source}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {alert.time}
                          </span>
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
                    <div className="text-xs font-medium text-gray-700">
                      关键事件
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {alerts.events.map((event, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 flex items-center gap-2"
                      >
                        {event.type === "error" ? (
                          <AlertCircle
                            className="w-3.5 h-3.5 text-red-500 flex-shrink-0"
                            strokeWidth={1.5}
                          />
                        ) : (
                          <Activity
                            className="w-3.5 h-3.5 text-amber-500 flex-shrink-0"
                            strokeWidth={1.5}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-900 truncate">
                            {event.text}
                          </div>
                          <div className="text-[11px] text-gray-400">
                            {event.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Tab Content - 近期任务 */}
              <TabsContent
                value="tasks"
                className="m-0 flex-1 flex flex-col min-h-0"
              >
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                  <span className="text-xs text-gray-600">
                    Top 4
                  </span>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-6 p-0 text-xs text-blue-600 hover:text-blue-700"
                  >
                    查看全部
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto relative min-h-0 scroll-smooth custom-scrollbar">
                  <div className="divide-y divide-gray-100">
                    {tasks.map((task) => (
                      <button
                        key={task.id}
                        className="w-full px-4 py-3 hover:bg-gray-50/30 transition text-left"
                      >
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] leading-3 font-medium ${
                                task.type === "create"
                                  ? "bg-blue-100 text-blue-700"
                                  : task.type === "migrate"
                                    ? "bg-purple-100 text-purple-700"
                                    : task.type === "backup"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-indigo-100 text-indigo-700"
                              }`}
                            >
                              {task.type === "create"
                                ? "创建"
                                : task.type === "migrate"
                                  ? "迁移"
                                  : task.type === "backup"
                                    ? "备份"
                                    : "升级"}
                            </span>
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] leading-3 font-medium ${
                                task.status === "running"
                                  ? "bg-blue-100 text-blue-700"
                                  : task.status === "failed"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              {task.status === "running"
                                ? "进行中"
                                : task.status === "failed"
                                  ? "失败"
                                  : "已完成"}
                            </span>
                            {task.error && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] leading-3 font-medium bg-red-50 text-red-600">
                                {task.error}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400">
                            {task.time}
                          </span>
                        </div>
                        <p className="text-xs leading-[18px] text-gray-900 mb-2 truncate">
                          {task.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                task.status === "completed"
                                  ? "bg-green-500"
                                  : task.status === "failed"
                                    ? "bg-red-500"
                                    : "bg-blue-500"
                              }`}
                              style={{
                                width: `${task.progress}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-[11px] text-gray-500 tabular-nums w-8 text-right">
                            {task.progress}%
                          </span>
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