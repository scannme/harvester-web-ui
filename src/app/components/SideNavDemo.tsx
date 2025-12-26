import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  ChevronDown, 
  ChevronRight,
  Home,
  Server,
  Network,
  Shield,
  BarChart3,
  Users,
  Database,
  Layers,
  GitBranch,
  Box,
  ArrowLeft,
  Settings2
} from 'lucide-react';

interface SideNavDemoProps {
  onNavigate?: (page: 'design-system' | 'console' | 'sidenav') => void;
}

export function SideNavDemo({ onNavigate }: SideNavDemoProps) {
  const [securityExpanded, setSecurityExpanded] = useState(true);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate?.('console')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
            返回控制台
          </Button>
          <div className="h-4 w-px bg-gray-200"></div>
          <h1 className="text-base font-semibold text-gray-900">SideNav 组件规范</h1>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-6 mb-12">
          {/* Complete SideNav */}
          <div>
            <h2 className="mb-4 text-base font-semibold text-gray-900">完整导航（含展开二级）</h2>
            <Card className="shadow-sm overflow-hidden">
              <div className="w-60 bg-gray-100/40 border-r border-gray-200">
                <nav className="p-2">
                  {/* 总览 - Default */}
                  <div className="mb-0.5">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors group">
                      <Home className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm leading-5 font-medium">总览</span>
                    </button>
                  </div>

                  {/* 计算资源 - Default with Arrow */}
                  <div className="mb-0.5">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors group">
                      <Server className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm leading-5 font-medium flex-1 text-left">计算资源</span>
                      <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* 存储管理 */}
                  <div className="mb-0.5">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors group">
                      <Database className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm leading-5 font-medium flex-1 text-left">存储管理</span>
                      <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* 网络管理 */}
                  <div className="mb-0.5">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors group">
                      <Network className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm leading-5 font-medium flex-1 text-left">网络管理</span>
                      <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* 安全服务 - Expanded & Active */}
                  <div className="mb-0.5">
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 text-gray-900 transition-colors group"
                      onClick={() => setSecurityExpanded(!securityExpanded)}
                    >
                      <Shield className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm leading-5 font-semibold flex-1 text-left">安全服务</span>
                      <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${securityExpanded ? '' : '-rotate-90'}`} strokeWidth={1.5} />
                    </button>
                    {securityExpanded && (
                      <div className="mt-0.5 space-y-0.5">
                        {/* Selected state */}
                        <button className="w-full flex items-center gap-2.5 pl-8 pr-4 py-2 rounded-lg bg-blue-50/60 text-blue-700 relative transition-colors group">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#1e40af] rounded-r"></div>
                          <Shield className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                          <span className="text-[13px] leading-[18px] font-medium">安全虚拟交换机</span>
                        </button>
                        <button className="w-full flex items-center gap-2.5 pl-8 pr-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors group">
                          <Layers className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                          <span className="text-[13px] leading-[18px]">安全网元</span>
                        </button>
                        <button className="w-full flex items-center gap-2.5 pl-8 pr-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors group">
                          <Box className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                          <span className="text-[13px] leading-[18px]">安全网元组</span>
                        </button>
                        <button className="w-full flex items-center gap-2.5 pl-8 pr-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors group">
                          <Server className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                          <span className="text-[13px] leading-[18px]">安全资产</span>
                        </button>
                        <button className="w-full flex items-center gap-2.5 pl-8 pr-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors group">
                          <GitBranch className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                          <span className="text-[13px] leading-[18px]">服务链</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 可观测 */}
                  <div className="mb-0.5">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors group">
                      <BarChart3 className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm leading-5 font-medium flex-1 text-left">可观测</span>
                      <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* 系统 */}
                  <div className="mb-0.5">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors group">
                      <Users className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm leading-5 font-medium flex-1 text-left">系统</span>
                      <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
                    </button>
                  </div>
                </nav>
              </div>
            </Card>
          </div>

          {/* State Examples */}
          <div>
            <h2 className="mb-4 text-base font-semibold text-gray-900">交互状态示例</h2>
            <div className="space-y-4">
              {/* Default State */}
              <Card className="p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-2 font-medium">默认状态（Default）</p>
                <div className="w-full bg-gray-100/40 p-2 rounded">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700">
                    <Server className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm leading-5 font-medium flex-1 text-left">计算资源</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" strokeWidth={1.5} />
                  </button>
                </div>
              </Card>

              {/* Hover State */}
              <Card className="p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-2 font-medium">悬停状态（Hover）</p>
                <div className="w-full bg-gray-100/40 p-2 rounded">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700">
                    <Database className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm leading-5 font-medium flex-1 text-left">存储管理</span>
                    <ChevronRight className="w-3 h-3 text-gray-600" strokeWidth={1.5} />
                  </button>
                </div>
              </Card>

              {/* Expanded State */}
              <Card className="p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-2 font-medium">展开状态（Expanded）</p>
                <div className="w-full bg-gray-100/40 p-2 rounded">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-900">
                    <Shield className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm leading-5 font-semibold flex-1 text-left">安全服务</span>
                    <ChevronDown className="w-3 h-3 text-gray-400" strokeWidth={1.5} />
                  </button>
                </div>
              </Card>

              {/* Selected State */}
              <Card className="p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-2 font-medium">选中状态（Selected）- 二级菜单</p>
                <div className="w-full bg-gray-100/40 p-2 rounded">
                  <button className="w-full flex items-center gap-2.5 pl-8 pr-4 py-2 rounded-lg bg-blue-50/60 text-blue-700 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#1e40af] rounded-r"></div>
                    <Shield className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-[13px] leading-[18px] font-medium">安全虚拟交换机</span>
                  </button>
                </div>
              </Card>

              {/* Secondary Default */}
              <Card className="p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-2 font-medium">二级菜单默认状态</p>
                <div className="w-full bg-gray-100/40 p-2 rounded">
                  <button className="w-full flex items-center gap-2.5 pl-8 pr-4 py-2 rounded-lg text-gray-600">
                    <Layers className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-[13px] leading-[18px]">安全网元</span>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <section>
          <h2 className="mb-4 text-base font-semibold text-gray-900">设计规范</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">一级菜单</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">字号</span>
                  <span className="font-mono text-gray-900">14px / 20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">字重</span>
                  <span className="font-mono text-gray-900">Medium 500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">高度</span>
                  <span className="font-mono text-gray-900">40px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">左右内边距</span>
                  <span className="font-mono text-gray-900">16px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">图标尺寸</span>
                  <span className="font-mono text-gray-900">16px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">图标间距</span>
                  <span className="font-mono text-gray-900">12px</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">二级菜单</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">字号</span>
                  <span className="font-mono text-gray-900">13px / 18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">字重</span>
                  <span className="font-mono text-gray-900">Regular 400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">高度</span>
                  <span className="font-mono text-gray-900">32px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">左侧缩进</span>
                  <span className="font-mono text-gray-900">32px (8 + 16 + 8)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">选中指示条宽度</span>
                  <span className="font-mono text-gray-900">2px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">选中指示条高度</span>
                  <span className="font-mono text-gray-900">20px</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">颜色规范</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">背景色</span>
                    <span className="text-xs font-mono text-gray-900">gray-100/40</span>
                  </div>
                  <div className="h-6 bg-gray-100/40 rounded border border-gray-200"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">默认文字</span>
                    <span className="text-xs font-mono text-gray-900">gray-700</span>
                  </div>
                  <div className="h-6 bg-gray-700 rounded"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Hover 背景</span>
                    <span className="text-xs font-mono text-gray-900">gray-100</span>
                  </div>
                  <div className="h-6 bg-gray-100 rounded border border-gray-200"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">选中背景</span>
                    <span className="text-xs font-mono text-gray-900">blue-50/60</span>
                  </div>
                  <div className="h-6 bg-blue-50/60 rounded border border-blue-100"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">选中指示条</span>
                    <span className="text-xs font-mono text-gray-900">#1e40af</span>
                  </div>
                  <div className="h-6 bg-[#1e40af] rounded"></div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">交互规范</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span>默认状态：中性深灰文字，无背景</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span>悬停状态：浅灰背景，箭头颜色加深</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span>展开状态：文字加粗，下箭头旋转</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span>选中状态：左侧 2px 主色指示条 + 淡蓝背景 + 蓝色文字</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span>层级区分：二级菜单更小、更浅、明确缩进</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}