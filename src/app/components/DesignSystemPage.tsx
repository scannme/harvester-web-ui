import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { 
  Bell, 
  HelpCircle, 
  Settings, 
  ChevronDown, 
  LogOut, 
  User, 
  FileText, 
  Info, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Server,
  Activity,
  Power,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  Shield,
  Settings2,
  ArrowLeft,
  Network,
  Database,
  GitBranch,
  MoreHorizontal
} from 'lucide-react';
import { StatCard } from './console/StatCard';
import { StatusPill } from './console/StatusPill';
import { TooltipWithCopy } from './console/TooltipWithCopy';
import { Pagination } from './console/Pagination';
import { TableToolbar } from './console/TableToolbar';
import { DataTable } from './console/DataTable';
import { TopBar } from './console/TopBar';
import { SideNav, SideNavItem } from './console/SideNav';

interface DesignSystemPageProps {
  onNavigate?: (page: 'design-system' | 'console' | 'sidenav') => void;
}

export function DesignSystemPage({ onNavigate }: DesignSystemPageProps) {
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
          <h1 className="text-base font-semibold text-gray-900">VSW Design System</h1>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Color Tokens */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Color Tokens</h2>
          <div className="grid grid-cols-5 gap-4">
            <Card className="p-4">
              <div className="w-full h-20 bg-[#F7F8FA] rounded-lg mb-3 border border-[#E6E8EC]"></div>
              <p className="text-sm font-semibold text-[#1F2329]">Page Background</p>
              <p className="text-xs text-[#8F959E] font-mono">#F7F8FA</p>
            </Card>
            <Card className="p-4">
              <div className="w-full h-20 bg-white rounded-lg mb-3 border border-[#E6E8EC]"></div>
              <p className="text-sm font-semibold text-[#1F2329]">Card / White</p>
              <p className="text-xs text-[#8F959E] font-mono">#FFFFFF</p>
            </Card>
            <Card className="p-4">
              <div className="w-full h-20 bg-[#E6E8EC] rounded-lg mb-3"></div>
              <p className="text-sm font-semibold text-[#1F2329]">Border</p>
              <p className="text-xs text-[#8F959E] font-mono">#E6E8EC</p>
            </Card>
            <Card className="p-4">
              <div className="w-full h-20 bg-[#1F2329] rounded-lg mb-3"></div>
              <p className="text-sm font-semibold text-[#1F2329]">Primary Text</p>
              <p className="text-xs text-[#8F959E] font-mono">#1F2329</p>
            </Card>
            <Card className="p-4">
              <div className="w-full h-20 bg-[#1e40af] rounded-lg mb-3"></div>
              <p className="text-sm font-semibold text-[#1F2329]">Brand Blue</p>
              <p className="text-xs text-[#8F959E] font-mono">#1e40af</p>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <Card className="p-4">
              <div className="w-full h-16 bg-[#646A73] rounded-lg mb-3"></div>
              <p className="text-sm font-semibold text-[#1F2329]">Secondary Text</p>
              <p className="text-xs text-[#8F959E] font-mono">#646A73</p>
            </Card>
            <Card className="p-4">
              <div className="w-full h-16 bg-[#8F959E] rounded-lg mb-3"></div>
              <p className="text-sm font-semibold text-[#1F2329]">Tertiary Text</p>
              <p className="text-xs text-[#8F959E] font-mono">#8F959E</p>
            </Card>
            <Card className="p-4">
              <div className="w-full h-16 bg-gray-50 rounded-lg mb-3 border border-[#E6E8EC]"></div>
              <p className="text-sm font-semibold text-[#1F2329]">Hover Background</p>
              <p className="text-xs text-[#8F959E] font-mono">#F9FAFB</p>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Typography</h2>
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <p className="text-xs text-[#8F959E] mb-2 font-mono">H1 - 24px / Semibold / Line 1.4</p>
                <h1 className="text-2xl font-semibold text-[#1F2329]">虚拟安全交换机</h1>
              </div>
              <div>
                <p className="text-xs text-[#8F959E] mb-2 font-mono">H2 - 20px / Semibold / Line 1.4</p>
                <h2 className="text-xl font-semibold text-[#1F2329]">实例列表</h2>
              </div>
              <div>
                <p className="text-xs text-[#8F959E] mb-2 font-mono">H3 - 16px / Semibold / Line 1.5</p>
                <h3 className="text-base font-semibold text-[#1F2329]">统计概览</h3>
              </div>
              <div>
                <p className="text-xs text-[#8F959E] mb-2 font-mono">Body - 14px / Regular / Line 1.6</p>
                <p className="text-sm text-[#646A73]">虚拟安全交换机（VSW）是虚拟化环境中模拟物理交换机功能的高性能网络组件。</p>
              </div>
              <div>
                <p className="text-xs text-[#8F959E] mb-2 font-mono">Caption - 12px / Regular / Line 1.5</p>
                <p className="text-xs text-[#8F959E]">状态正常 · 2024-12-19 10:23:45</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Spacing System */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Spacing System (8pt Grid)</h2>
          <Card className="p-6">
            <div className="space-y-3">
              {[4, 8, 12, 16, 24, 32].map(size => (
                <div key={size} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-mono text-[#646A73]">{size}px</div>
                  <div className="h-8 bg-blue-500 rounded" style={{ width: `${size * 4}px` }}></div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Components - TopBar */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">TopBar (深色主题)</h2>
          <Card className="overflow-hidden">
            <TopBar
              logoIcon={Server}
              title="HCI 超融合"
              userName="张三"
              notificationCount={3}
            />
          </Card>
          <p className="text-xs text-gray-500 mt-2">
            背景色：#1e40af | 高度：56px | 白色文字和图标
          </p>
        </section>

        {/* Components - Buttons */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Buttons</h2>
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <p className="text-xs text-[#8F959E] mb-3 font-semibold">Primary Button</p>
                <div className="flex items-center gap-3">
                  <Button size="sm" className="h-8 bg-[#1e40af] hover:bg-[#1e3a8a]">
                    <Plus className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                    创建实例
                  </Button>
                  <Button size="sm" className="h-8 bg-[#1e40af] hover:bg-[#1e3a8a]">
                    保存
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#8F959E] mb-3 font-semibold">Secondary Button</p>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="h-8 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                    <Filter className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                    筛选
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                    <Download className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                    导出
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                    取消
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#8F959E] mb-3 font-semibold">Icon Button</p>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                    <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                    <Settings className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#8F959E] mb-3 font-semibold">Link Button</p>
                <div className="flex items-center gap-3">
                  <Button variant="link" size="sm" className="h-auto p-0 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    详情
                  </Button>
                  <Button variant="link" size="sm" className="h-auto p-0 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    编辑
                  </Button>
                  <Button variant="link" size="sm" className="h-auto p-0 text-sm text-red-600 hover:text-red-700 font-medium">
                    删除
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Components - Stat Cards */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Stat Cards</h2>
          <div className="grid grid-cols-5 gap-4">
            <StatCard 
              title="总实例数" 
              value="24" 
              subtitle="全部实例数"
              icon={Server}
              statusColor="gray"
            />
            <StatCard 
              title="运行中" 
              value="18" 
              subtitle="状态正常"
              icon={Activity}
              statusColor="green"
            />
            <StatCard 
              title="已关机" 
              value="3" 
              subtitle="待开机"
              icon={Power}
              statusColor="gray"
            />
            <StatCard 
              title="创建中" 
              value="1" 
              subtitle="正在初始化"
              icon={Clock}
              statusColor="blue"
            />
            <StatCard 
              title="异常" 
              value="2" 
              subtitle="运行异常"
              icon={AlertTriangle}
              statusColor="red"
            />
          </div>
        </section>

        {/* Components - Status Pills */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Status Pills</h2>
          <Card className="p-6">
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill status="运行中" type="success" />
              <StatusPill status="创建中" type="info" />
              <StatusPill status="已关机" type="default" />
              <StatusPill status="异常" type="error" />
              <StatusPill status="警告" type="warning" />
              <StatusPill status="正常" type="success" />
              <StatusPill status="连接失败" type="error" />
              <StatusPill status="初始化" type="info" />
            </div>
          </Card>
        </section>

        {/* Components - Form Inputs */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Form Inputs</h2>
          <Card className="p-6">
            <div className="space-y-6 max-w-md">
              <div>
                <Label className="text-sm font-semibold text-[#1F2329] mb-1.5 block">实例名称</Label>
                <Input 
                  placeholder="请输入实例名称" 
                  className="h-9 bg-white border-[#E6E8EC] focus-visible:ring-blue-500"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-[#1F2329] mb-1.5 block">搜索</Label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8F959E]" strokeWidth={2} />
                  <Input 
                    placeholder="搜索实例..." 
                    className="pl-9 h-9 bg-white border-[#E6E8EC] focus-visible:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="agree" />
                <Label htmlFor="agree" className="text-sm text-[#646A73] font-normal cursor-pointer">
                  我已阅读并同意服务条款
                </Label>
              </div>
            </div>
          </Card>
        </section>

        {/* Components - Tooltip with Copy */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Tooltip with Copy</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-[#8F959E] mb-2">长文本自动截断，悬停显示完整内容并可复制：</p>
                <TooltipWithCopy text="生产环境-主交换机-01-高可用集群-深圳机房">
                  <div className="font-medium text-sm text-[#1F2329] truncate max-w-[200px] border border-dashed border-[#E6E8EC] p-2 rounded">
                    生产环境-主交换机-01-高可用集群-深圳机房
                  </div>
                </TooltipWithCopy>
              </div>
              <div>
                <p className="text-xs text-[#8F959E] mb-2">版本号截断示例：</p>
                <TooltipWithCopy text="v2.4.1-enterprise-20241215-stable-release" maxWidth={15}>
                  <div className="font-mono text-sm text-[#646A73] truncate max-w-[150px] border border-dashed border-[#E6E8EC] p-2 rounded">
                    v2.4.1-enterprise-20241215-stable-release
                  </div>
                </TooltipWithCopy>
              </div>
            </div>
          </Card>
        </section>

        {/* Components - Table Sample */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Table Sample</h2>
          <Card className="shadow-sm border-[#E6E8EC]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F7F8FA]">
                  <tr className="border-b border-[#E6E8EC]">
                    <th className="w-12 px-4 py-3">
                      <Checkbox />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#1F2329]">名称</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#1F2329]">状态</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-[#1F2329]">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-[#E6E8EC] hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      <Checkbox />
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-sm text-[#1F2329]">生产环境-主交换机-01</div>
                      <div className="text-xs text-[#8F959E] font-mono mt-0.5">vsw-001</div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusPill status="运行中" type="success" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-700 font-medium">
                          详情
                        </Button>
                        <span className="text-[#E6E8EC]">|</span>
                        <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-700 font-medium">
                          编辑
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      <Checkbox />
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-sm text-[#1F2329]">测试环境交换机</div>
                      <div className="text-xs text-[#8F959E] font-mono mt-0.5">vsw-002</div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusPill status="创建中" type="info" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-700 font-medium">
                          详情
                        </Button>
                        <span className="text-[#E6E8EC]">|</span>
                        <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-700 font-medium">
                          编辑
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Components - Pagination */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Pagination</h2>
          <Card className="overflow-hidden">
            <Pagination
              currentPage={3}
              totalPages={10}
              pageSize={20}
              totalItems={200}
              onPageChange={() => {}}
              onPageSizeChange={() => {}}
            />
          </Card>
        </section>

        {/* Components - TableToolbar */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Table Toolbar</h2>
          <Card className="overflow-hidden">
            <TableToolbar
              searchPlaceholder="搜索实例..."
              createButtonText="创建实例"
              onFilterClick={() => console.log('筛选')}
              onExportClick={() => console.log('导出')}
              onRefreshClick={() => console.log('刷新')}
              onCreateClick={() => console.log('创建')}
            />
          </Card>
          <p className="text-xs text-gray-500 mt-2">
            包含搜索框、筛选、导出、刷新、创建按钮的标准表格工具栏
          </p>
        </section>

        {/* Components - DataTable (Complete) */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">DataTable (Complete Template)</h2>
          <DataTable
            searchPlaceholder="搜索实例..."
            createButtonText="创建实例"
            currentPage={1}
            totalPages={3}
            pageSize={10}
            totalItems={25}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
            onCreateClick={() => console.log('创建')}
            minHeight="400px"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="w-10 px-3 py-3">
                    <Checkbox />
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                    实例名称
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                    状态
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                    IP地址
                  </th>
                  <th className="px-3 py-3 text-left text-xs leading-[18px] font-medium text-gray-500">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/30 transition">
                  <td className="w-10 px-3 py-3">
                    <Checkbox />
                  </td>
                  <td className="px-3 py-3">
                    <div className="text-sm leading-[22px] text-gray-900 font-medium">
                      生产环境-主交换机
                    </div>
                    <div className="text-xs leading-[18px] text-gray-500 font-mono mt-0.5">
                      vsw-prod-001
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <StatusPill status="运行中" type="success" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="text-sm leading-[22px] text-gray-700 font-mono">
                      10.0.1.100
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="link" size="sm" className="h-6 p-0 text-sm text-blue-600 hover:text-blue-700">
                        详情
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-500 hover:text-gray-900">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/30 transition">
                  <td className="w-10 px-3 py-3">
                    <Checkbox />
                  </td>
                  <td className="px-3 py-3">
                    <div className="text-sm leading-[22px] text-gray-900 font-medium">
                      测试环境交换机
                    </div>
                    <div className="text-xs leading-[18px] text-gray-500 font-mono mt-0.5">
                      vsw-test-002
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <StatusPill status="创建中" type="info" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="text-sm leading-[22px] text-gray-700 font-mono">
                      10.0.2.100
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="link" size="sm" className="h-6 p-0 text-sm text-blue-600 hover:text-blue-700">
                        详情
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-500 hover:text-gray-900">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </DataTable>
          <p className="text-xs text-gray-500 mt-2">
            完整的表格模板，包含工具栏、表格内容、分页。基于"安全虚拟交换机"页面规范封装。
          </p>
        </section>

        {/* Components - SideNav */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">SideNav Component</h2>
          <div className="grid grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <SideNav
                items={[
                  {
                    id: 'overview',
                    label: '概览',
                    icon: Server,
                  },
                  {
                    id: 'security',
                    label: '安全服务',
                    icon: Shield,
                    children: [
                      { id: 'security-vsw', label: '安全虚拟交换机' },
                      { id: 'security-protection', label: '安全防护' },
                    ],
                  },
                  {
                    id: 'network',
                    label: '网络服务',
                    icon: Network,
                    children: [
                      { id: 'network-vpc', label: '私有网络' },
                      { id: 'network-subnet', label: '子网管理' },
                    ],
                  },
                  {
                    id: 'storage',
                    label: '存储服务',
                    icon: Database,
                  },
                ]}
                activeId="security-vsw"
              />
            </Card>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">规范说明</h3>
              <ul className="text-xs text-gray-600 space-y-1.5">
                <li>• 宽度：240px 固定</li>
                <li>• 菜单项高度：40px</li>
                <li>• 选中态：左侧 3px 蓝色色条 + 极浅蓝色背景</li>
                <li>• 图标尺寸：16px (w-4 h-4)</li>
                <li>• 字体大小：14px</li>
                <li>• 二级菜单：左侧缩进 44px (pl-11)</li>
                <li>• 支持展开/收起二级菜单</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Border Radius System */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Border Radius System</h2>
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-500 mb-3">4px 圆角 (rounded) - 默认</p>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-blue-100 border border-blue-200 rounded"></div>
                  <div className="text-xs text-gray-600">
                    <p className="font-semibold mb-1">应用于：</p>
                    <p>• KPI 卡片</p>
                    <p>• 按钮（所有尺寸）</p>
                    <p>• 输入框</p>
                    <p>• 图标容器</p>
                    <p>• 表格容器</p>
                    <p>• 选择框 (Checkbox)</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-3">完全圆角 (rounded-full) - 胶囊状</p>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-1.5 bg-green-100 border border-green-200 rounded-full text-xs text-green-700">
                    运行中
                  </div>
                  <div className="text-xs text-gray-600">
                    <p className="font-semibold mb-1">应用于：</p>
                    <p>• 状态标签 (StatusPill)</p>
                    <p>• 徽章 (Badge)</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Component Summary */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">组件总览</h2>
          <Card className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">布局组件</h3>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li>• TopBar - 顶部导航栏</li>
                  <li>• SideNav - 侧边导航</li>
                  <li>• DataTable - 数据表格容器</li>
                  <li>• TableToolbar - 表格工具栏</li>
                  <li>• Pagination - 分页器</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">数据展示</h3>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li>• StatCard - 统计卡片</li>
                  <li>• StatusPill - 状态标签</li>
                  <li>• TooltipWithCopy - 复制提示</li>
                  <li>• Badge - 徽章</li>
                  <li>• Card - 卡片容器</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">表单组件</h3>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li>• Button - 按钮</li>
                  <li>• Input - 输入框</li>
                  <li>• Checkbox - 复选框</li>
                  <li>• Label - 标签</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}