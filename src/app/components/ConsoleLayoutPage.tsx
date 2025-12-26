import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import {
  Bell,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronRight,
  Home,
  Server,
  Network,
  Shield,
  BarChart3,
  Users,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  MoreHorizontal,
  Database,
  Layers,
  GitBranch,
  Box,
  Activity,
  Power,
  Clock,
  AlertTriangle,
  Settings2,
  Cpu,
  Hexagon,
  Boxes,
  ShieldCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { StatCard } from "./console/StatCard";
import { StatusPill } from "./console/StatusPill";
import { TooltipWithCopy } from "./console/TooltipWithCopy";
import { Pagination } from "./console/Pagination";
import { SecurityProtection } from "./console/SecurityProtection";
import { Overview } from "./console/Overview";
import { Overview1 } from "./console/Overview1HCI";
import { SceneDashboard } from "./console/SceneDashboard";
import { VmManagement } from "./console/VmManagement";

interface ConsoleLayoutPageProps {
  onNavigate?: (
    page: "design-system" | "console" | "sidenav",
  ) => void;
}

export function ConsoleLayoutPage({
  onNavigate,
}: ConsoleLayoutPageProps) {
  const [logoutDialogOpen, setLogoutDialogOpen] =
    useState(false);
  const [securityExpanded, setSecurityExpanded] =
    useState(true);
  const [computeExpanded, setComputeExpanded] = useState(false);
  const [systemExpanded, setSystemExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activePage, setActivePage] = useState<
    "overview" | "overview1" | "scene" | "vm" | "vswitch" | "protection"
  >("overview");

  // Mock data - 5条数据
  const instances = [
    {
      id: "vsw-001",
      name: "生产环境-主交换机-01",
      mode: "L2",
      prefix: "240e:ffc00:0003::1/80",
      threads: 8,
      version: "v2.4.1-enterprise-20241215",
      instanceStatus: {
        text: "运行中",
        type: "success" as const,
      },
      serviceStatus: { text: "正常", type: "success" as const },
      updateTime: "2024-12-19 10:23:45",
    },
    {
      id: "vsw-002",
      name: "测试环境交换机",
      mode: "L3",
      prefix: "240e:ffc00:0004::1/80",
      threads: 4,
      version: "v2.4.0",
      instanceStatus: { text: "创建中", type: "info" as const },
      serviceStatus: { text: "初始化", type: "info" as const },
      updateTime: "2024-12-19 11:15:22",
    },
    {
      id: "vsw-003",
      name: "开发环境-备用交换机-A区",
      mode: "L2",
      prefix: "240e:ffc00:0005::1/80",
      threads: 8,
      version: "v2.3.8",
      instanceStatus: {
        text: "已关机",
        type: "default" as const,
      },
      serviceStatus: {
        text: "已停止",
        type: "default" as const,
      },
      updateTime: "2024-12-18 16:30:11",
    },
    {
      id: "vsw-004",
      name: "灾备中心交换机",
      mode: "L2",
      prefix: "240e:ffc00:0006::1/80",
      threads: 16,
      version: "v2.4.1",
      instanceStatus: { text: "异常", type: "error" as const },
      serviceStatus: {
        text: "连接失败",
        type: "error" as const,
      },
      updateTime: "2024-12-19 09:45:33",
    },
    {
      id: "vsw-005",
      name: "预发布环境交换机",
      mode: "L3",
      prefix: "240e:ffc00:0007::1/80",
      threads: 8,
      version: "v2.4.1",
      instanceStatus: {
        text: "运行中",
        type: "success" as const,
      },
      serviceStatus: { text: "正常", type: "success" as const },
      updateTime: "2024-12-19 08:12:56",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* TopBar - 56px height, Stable Blue */}
      <div className="h-14 bg-[#1e40af] px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded flex items-center justify-center backdrop-blur-md border border-white/30 shadow-[0_0_32px_rgba(34,211,238,0.5),0_0_16px_rgba(59,130,246,0.4),inset_0_0_20px_rgba(34,211,238,0.2)] relative overflow-hidden">
            {/* 内部强光层 */}
            <div className="absolute inset-0 rounded bg-gradient-to-br from-cyan-300/20 via-blue-400/15 to-transparent"></div>
            <div className="absolute inset-0 rounded bg-gradient-to-tl from-white/10 to-transparent"></div>

            {/* 3D立方体组合 - 放大填充整个空间 */}
            <svg
              viewBox="0 0 48 48"
              className="w-full h-full relative z-10 p-0.5"
              style={{
                filter:
                  "drop-shadow(0 0 12px rgba(34,211,238,0.9)) drop-shadow(0 0 6px rgba(125,211,252,0.7))",
              }}
            >
              {/* 后方左立方体 - 放大 */}
              <g opacity="0.75">
                {/* 顶面 */}
                <path
                  d="M 8 10 L 16 4 L 24 10 L 16 16 Z"
                  fill="rgba(96, 165, 250, 0.5)"
                  stroke="rgba(125, 211, 252, 1)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {/* 左侧面 */}
                <path
                  d="M 8 10 L 8 26 L 16 32 L 16 16 Z"
                  fill="rgba(59, 130, 246, 0.6)"
                  stroke="rgba(125, 211, 252, 1)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {/* 右侧面 */}
                <path
                  d="M 16 16 L 16 32 L 24 26 L 24 10 Z"
                  fill="rgba(34, 211, 238, 0.5)"
                  stroke="rgba(125, 211, 252, 1)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </g>

              {/* 后方右立方体 - 放大 */}
              <g opacity="0.75">
                {/* 顶面 */}
                <path
                  d="M 24 10 L 32 4 L 40 10 L 32 16 Z"
                  fill="rgba(96, 165, 250, 0.5)"
                  stroke="rgba(125, 211, 252, 1)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {/* 左侧面 */}
                <path
                  d="M 24 10 L 24 26 L 32 32 L 32 16 Z"
                  fill="rgba(59, 130, 246, 0.6)"
                  stroke="rgba(125, 211, 252, 1)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {/* 右侧面 */}
                <path
                  d="M 32 16 L 32 32 L 40 26 L 40 10 Z"
                  fill="rgba(34, 211, 238, 0.5)"
                  stroke="rgba(125, 211, 252, 1)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </g>

              {/* 前方中心主立方体 - 最大化 */}
              <g>
                {/* 顶面 - 超亮 */}
                <path
                  d="M 12 24 L 24 16 L 36 24 L 24 32 Z"
                  fill="rgba(165, 243, 252, 0.8)"
                  stroke="rgba(255, 255, 255, 1)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* 左侧面 */}
                <path
                  d="M 12 24 L 12 42 L 24 48 L 24 32 Z"
                  fill="rgba(34, 211, 238, 0.85)"
                  stroke="rgba(165, 243, 252, 1)"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                {/* 右侧面 */}
                <path
                  d="M 24 32 L 24 48 L 36 42 L 36 24 Z"
                  fill="rgba(56, 189, 248, 0.8)"
                  stroke="rgba(165, 243, 252, 1)"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </g>

              {/* 强化高光 */}
              <circle
                cx="16"
                cy="30"
                r="2.5"
                fill="rgba(255, 255, 255, 0.9)"
              />
              <circle
                cx="28"
                cy="36"
                r="2"
                fill="rgba(255, 255, 255, 0.8)"
              />
              <circle
                cx="20"
                cy="26"
                r="1.5"
                fill="rgba(255, 255, 255, 0.7)"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-[17px] leading-5 font-bold tracking-tight">
              HCI 超融合
            </span>
            <span className="text-cyan-200 text-[11px] leading-4 font-semibold tracking-wide">
              Hyper-Converged Infrastructure
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* 时间标签 - 玻璃态融合式 */}
          <div className="h-6 px-3 rounded-full bg-white/[0.14] border border-white/[0.20] text-white/90 text-xs leading-6 font-medium backdrop-blur-sm">
            2024-12-19 14:32
          </div>
          <button className="text-white/80 hover:text-white transition-colors">
            <HelpCircle
              className="w-[18px] h-[18px]"
              strokeWidth={1.5}
            />
          </button>
          <button className="text-white/80 hover:text-white relative transition-colors">
            <Bell
              className="w-[18px] h-[18px]"
              strokeWidth={1.5}
            />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[10px] leading-none flex items-center justify-center font-semibold text-white">
              3
            </span>
          </button>
          <button className="text-white/80 hover:text-white transition-colors">
            <Settings
              className="w-[18px] h-[18px]"
              strokeWidth={1.5}
            />
          </button>
          <div className="w-px h-5 bg-white/20"></div>
          <button
            className="flex items-center gap-2.5 text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
            onClick={() => setLogoutDialogOpen(true)}
          >
            <div className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-xs font-semibold">张</span>
            </div>
            <span className="text-[14px] leading-5">张三</span>
            <ChevronDown
              className="w-3.5 h-3.5 text-white/60"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* SideNav - 240px width, Light */}
        <div className="w-60 bg-white border-r border-gray-200 h-[calc(100vh-56px)] sticky top-14 overflow-y-auto">
          <nav className="p-2">
            {/* 总览 */}
            <div className="mb-0.5">
              <button
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors group ${
                  activePage === "overview"
                    ? "bg-blue-50/50 text-blue-700 relative"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActivePage("overview")}
              >
                {activePage === "overview" && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#1e40af] rounded-r"></div>
                )}
                <Home
                  className="w-4 h-4 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span
                  className={`text-sm leading-5 ${
                    activePage === "overview" ? "font-medium" : "font-medium"
                  }`}
                >
                  总览
                </span>
              </button>
            </div>

            {/* 总览1 - 运维指挥舱 */}
            <div className="mb-0.5">
              <button
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors group ${
                  activePage === "overview1"
                    ? "bg-blue-50/50 text-blue-700 relative"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActivePage("overview1")}
              >
                {activePage === "overview1" && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#1e40af] rounded-r"></div>
                )}
                <Layers
                  className="w-4 h-4 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span
                  className={`text-sm leading-5 ${
                    activePage === "overview1" ? "font-medium" : "font-medium"
                  }`}
                >
                  运维指挥舱
                </span>
              </button>
            </div>

            {/* 场景仪表盘 */}
            <div className="mb-0.5">
              <button
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors group ${
                  activePage === "scene"
                    ? "bg-blue-50/50 text-blue-700 relative"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActivePage("scene")}
              >
                {activePage === "scene" && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#1e40af] rounded-r"></div>
                )}
                <Hexagon
                  className="w-4 h-4 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span
                  className={`text-sm leading-5 ${
                    activePage === "scene" ? "font-medium" : "font-medium"
                  }`}
                >
                  场景仪表盘
                </span>
              </button>
            </div>

            {/* 计算资源 - Expanded */}
            <div className="mb-0.5">
              <button
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-gray-900 hover:bg-gray-50 transition-colors group"
                onClick={() =>
                  setComputeExpanded(!computeExpanded)
                }
              >
                <Server
                  className="w-4 h-4 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-sm leading-5 font-medium flex-1 text-left">
                  计算资源
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-gray-400 transition-transform ${computeExpanded ? "" : "-rotate-90"}`}
                  strokeWidth={1.5}
                />
              </button>
              {computeExpanded && (
                <div className="mt-0.5 space-y-0.5">
                  <button
                    className={`w-full flex items-center gap-2.5 pl-7 pr-3 py-2 rounded transition-colors group ${
                      activePage === "vm"
                        ? "bg-blue-50/50 text-blue-700 relative"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                    onClick={() => setActivePage("vm")}
                  >
                    {activePage === "vm" && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#1e40af] rounded-r"></div>
                    )}
                    <Boxes
                      className="w-4 h-4 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className={`text-[13px] leading-[18px] ${activePage === "vm" ? "font-medium" : ""}`}>
                      虚拟机管理
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* 存储管理 */}
            <div className="mb-0.5">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-gray-700 hover:bg-gray-50 transition-colors group">
                <Database
                  className="w-4 h-4 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-sm leading-5 font-medium flex-1 text-left">
                  存储管理
                </span>
                <ChevronRight
                  className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* 网络管理 */}
            <div className="mb-0.5">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-gray-700 hover:bg-gray-50 transition-colors group">
                <Network
                  className="w-4 h-4 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-sm leading-5 font-medium flex-1 text-left">
                  网络管理
                </span>
                <ChevronRight
                  className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* 安全服务 - Expanded */}
            <div className="mb-0.5">
              <button
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-gray-900 hover:bg-gray-50 transition-colors group"
                onClick={() =>
                  setSecurityExpanded(!securityExpanded)
                }
              >
                <Shield
                  className="w-4 h-4 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-sm leading-5 font-semibold flex-1 text-left">
                  安全服务
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-gray-400 transition-transform ${securityExpanded ? "" : "-rotate-90"}`}
                  strokeWidth={1.5}
                />
              </button>
              {securityExpanded && (
                <div className="mt-0.5 space-y-0.5">
                  {/* 1. 安全防护 */}
                  <button
                    className={`w-full flex items-center gap-2.5 pl-7 pr-3 py-2 rounded transition-colors group ${
                      activePage === "protection"
                        ? "bg-blue-50/50 text-blue-700 relative"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                    onClick={() => setActivePage("protection")}
                  >
                    {activePage === "protection" && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#1e40af] rounded-r"></div>
                    )}
                    <ShieldCheck
                      className="w-4 h-4 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span
                      className={`text-[13px] leading-[18px] ${activePage === "protection" ? "font-medium" : ""}`}
                    >
                      安全防护
                    </span>
                  </button>
                  {/* 2. 安全网元组 */}
                  <button className="w-full flex items-center gap-2.5 pl-7 pr-3 py-2 rounded hover:bg-gray-50 text-gray-600 transition-colors group">
                    <Box
                      className="w-4 h-4 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-[13px] leading-[18px]">
                      安全网元组
                    </span>
                  </button>
                  {/* 3. 安全网元 */}
                  <button className="w-full flex items-center gap-2.5 pl-7 pr-3 py-2 rounded hover:bg-gray-50 text-gray-600 transition-colors group">
                    <Layers
                      className="w-4 h-4 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-[13px] leading-[18px]">
                      安全网元
                    </span>
                  </button>
                  {/* 4. 安全虚拟交换机 */}
                  <button
                    className={`w-full flex items-center gap-2.5 pl-7 pr-3 py-2 rounded transition-colors group ${
                      activePage === "vswitch"
                        ? "bg-blue-50/50 text-blue-700 relative"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                    onClick={() => setActivePage("vswitch")}
                  >
                    {activePage === "vswitch" && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#1e40af] rounded-r"></div>
                    )}
                    <Shield
                      className="w-4 h-4 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span
                      className={`text-[13px] leading-[18px] ${activePage === "vswitch" ? "font-medium" : ""}`}
                    >
                      安全虚拟交换机
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* 可观测 */}
            <div className="mb-0.5">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-gray-700 hover:bg-gray-50 transition-colors group">
                <BarChart3
                  className="w-4 h-4 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-sm leading-5 font-medium flex-1 text-left">
                  可观测
                </span>
                <ChevronRight
                  className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* 系统 */}
            <div className="mb-0.5">
              <button
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-gray-900 hover:bg-gray-50 transition-colors group"
                onClick={() =>
                  setSystemExpanded(!systemExpanded)
                }
              >
                <Users
                  className="w-4 h-4 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-sm leading-5 font-medium flex-1 text-left">
                  系统
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-gray-400 transition-transform ${systemExpanded ? "" : "-rotate-90"}`}
                  strokeWidth={1.5}
                />
              </button>
              {systemExpanded && (
                <div className="mt-0.5 space-y-0.5">
                  <button className="w-full flex items-center gap-2.5 pl-7 pr-3 py-2 rounded hover:bg-gray-50 text-gray-600 transition-colors group">
                    <Settings2
                      className="w-4 h-4 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-[13px] leading-[18px]">
                      系统设置
                    </span>
                  </button>
                  <button
                    className="w-full flex items-center gap-2.5 pl-7 pr-3 py-2 rounded hover:bg-gray-50 text-gray-600 transition-colors group"
                    onClick={() =>
                      onNavigate?.("design-system")
                    }
                  >
                    <Box
                      className="w-4 h-4 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-[13px] leading-[18px]">
                      Design System
                    </span>
                  </button>
                  <button
                    className="w-full flex items-center gap-2.5 pl-7 pr-3 py-2 rounded hover:bg-gray-50 text-gray-600 transition-colors group"
                    onClick={() => onNavigate?.("sidenav")}
                  >
                    <Layers
                      className="w-4 h-4 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-[13px] leading-[18px]">
                      SideNav Demo
                    </span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Main Content Area - Fluid Width 左对齐宽内容容器 */}
        <div className="flex-1 bg-white min-w-0">
          <div className="w-full max-w-[1680px] px-8 py-6">
            {activePage === "overview" ? (
              <Overview onNavigate={(page) => setActivePage(page as any)} />
            ) : activePage === "overview1" ? (
              <Overview1 onNavigate={(page) => setActivePage(page as any)} />
            ) : activePage === "scene" ? (
              <SceneDashboard onNavigate={(page) => setActivePage(page as any)} />
            ) : activePage === "vswitch" ? (
              <>
                {/* 安全虚拟交换机页面 */}
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs leading-[18px] mb-2">
                  <span className="text-gray-500">
                    安全服务
                  </span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-700 font-medium">
                    安全虚拟交换机
                  </span>
                </div>

                {/* Page Title & Description - 更克制专业 */}
                <div className="mb-4">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 bg-[#3b82f6]/6 border border-[#3b82f6]/12 rounded-[5px] flex items-center justify-center flex-shrink-0">
                      <Shield
                        className="w-[15px] h-[15px] text-[#3b82f6]/70"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h1 className="text-[20px] leading-7 font-semibold text-gray-900">
                      安全虚拟交换机
                    </h1>
                  </div>
                  <p className="text-[13px] leading-5 text-gray-600 font-normal">
                    安全虚拟交换机（VSW）是虚拟化环境中模拟物理交换机功能的高性能网络组件，用于实现虚拟机之间的通信以及与物理网络的连接。
                  </p>
                </div>

                {/* Statistics Cards - Flex布局撑满一行 */}
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 min-w-[240px]">
                    <StatCard
                      title="总实例数"
                      value="5"
                      subtitle="全部实例数"
                      icon={Server}
                      statusColor="gray"
                    />
                  </div>
                  <div className="flex-1 min-w-[240px]">
                    <StatCard
                      title="运行中"
                      value="2"
                      subtitle="状态正常"
                      icon={Activity}
                      statusColor="green"
                    />
                  </div>
                  <div className="flex-1 min-w-[240px]">
                    <StatCard
                      title="已关机"
                      value="1"
                      subtitle="待开机"
                      icon={Power}
                      statusColor="gray"
                    />
                  </div>
                  <div className="flex-1 min-w-[240px]">
                    <StatCard
                      title="创建中"
                      value="1"
                      subtitle="正在初始化"
                      icon={Clock}
                      statusColor="blue"
                    />
                  </div>
                  <div className="flex-1 min-w-[240px]">
                    <StatCard
                      title="异常"
                      value="1"
                      subtitle="运行异常"
                      icon={AlertTriangle}
                      statusColor="red"
                    />
                  </div>
                </div>

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
                          placeholder="搜索实例..."
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
                        批量后置配置
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
                        创建实例
                      </Button>
                    </div>
                  </div>

                  {/* Table - 52px row height, 12px header */}
                  <div
                    style={{ padding: "0 16px" }}
                    className="overflow-x-auto"
                  >
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-100">
                          <th className="w-10 px-3 py-3">
                            <Checkbox />
                          </th>
                          <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                            名称
                          </th>
                          <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                            模式
                          </th>
                          <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                            引流前缀
                          </th>
                          <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                            工作线程数
                          </th>
                          <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                            版本
                          </th>
                          <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                            实例状态
                          </th>
                          <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                            服务状态
                          </th>
                          <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                            更新时间
                          </th>
                          <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {instances.map((instance, index) => (
                          <tr
                            key={instance.id}
                            className="hover:bg-gray-50/30 transition"
                          >
                            <td className="px-3 py-3">
                              <Checkbox />
                            </td>
                            <td className="px-3 py-3">
                              <TooltipWithCopy
                                text={instance.name}
                              >
                                <div className="text-sm leading-[22px] text-gray-900 truncate max-w-[180px]">
                                  {instance.name}
                                </div>
                              </TooltipWithCopy>
                            </td>
                            <td className="px-3 py-3">
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-100 text-xs leading-[18px] font-mono font-medium text-gray-700">
                                {instance.mode}
                              </span>
                            </td>
                            <td className="px-3 py-3">
                              <TooltipWithCopy
                                text={instance.prefix}
                                alwaysShow={true}
                              >
                                <div className="font-mono text-sm leading-[22px] text-gray-600 truncate max-w-[160px]">
                                  {instance.prefix}
                                </div>
                              </TooltipWithCopy>
                            </td>
                            <td className="px-3 py-3">
                              <span className="text-sm leading-[22px] text-gray-900">
                                {instance.threads}
                              </span>
                            </td>
                            <td className="px-3 py-3">
                              <TooltipWithCopy
                                text={instance.version}
                                maxWidth={15}
                              >
                                <div className="font-mono text-sm leading-[22px] text-gray-600 truncate max-w-[100px]">
                                  {instance.version}
                                </div>
                              </TooltipWithCopy>
                            </td>
                            <td className="px-3 py-3">
                              <StatusPill
                                status={
                                  instance.instanceStatus.text
                                }
                                type={
                                  instance.instanceStatus.type
                                }
                              />
                            </td>
                            <td className="px-3 py-3">
                              <StatusPill
                                status={
                                  instance.serviceStatus.text
                                }
                                type={
                                  instance.serviceStatus.type
                                }
                              />
                            </td>
                            <td className="px-3 py-3">
                              <div className="text-sm leading-[22px] text-gray-600">
                                {instance.updateTime}
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
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-28"
                                  >
                                    <DropdownMenuItem className="text-xs">
                                      编辑
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-xs">
                                      重启
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-xs">
                                      停止
                                    </DropdownMenuItem>
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
                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={1}
                    pageSize={pageSize}
                    totalItems={5}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  />
                </div>
              </>
            ) : activePage === "vm" ? (
              // 虚拟机管理页面
              <VmManagement />
            ) : (
              // 安全防护页面
              <SecurityProtection />
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认退出</DialogTitle>
            <DialogDescription>
              退出后需要重新登录
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
            >
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={() => setLogoutDialogOpen(false)}
            >
              退出登录
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}