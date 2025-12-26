# Console Design System

企业级 B2B 云平台控制台组件库，专门针对中国企业控制台审美设计。

## 设计规范

### 整体风格
- **专业、克制、大气、美观**
- 全宽布局，SideNav 固定 240px
- 仅 TopBar 使用深色主题，其余区域保持浅色

### 字体规范
- Page Title: 20px
- KPI 数字: 24px
- Body: 14px
- 表头: 12px

### 控件规范
- 统一控件高度: 32px (h-8)
- SideNav 菜单项高度: 40px (h-10)
- 选中态: 左侧 3px 色条 + 极浅背景

### 圆角体系
- **4px 圆角 (rounded)**: KPI 卡片、按钮、输入框、图标容器、表格容器、选择框
- **完全圆角 (rounded-full)**: 状态标签胶囊、徽章

### 卡片样式
- 1px 浅边框为主
- 阴影极轻 (shadow-sm)

---

## 组件列表

### 布局组件

#### TopBar
深色主题顶部导航栏

```tsx
import { TopBar } from '@/app/components/console';
import { Server } from 'lucide-react';

<TopBar
  logoIcon={Server}
  title="HCI 超融合"
  userName="张三"
  notificationCount={3}
  onNotificationClick={() => {}}
/>
```

#### SideNav
侧边导航栏，支持二级菜单

```tsx
import { SideNav } from '@/app/components/console';
import { Shield, Server } from 'lucide-react';

const menuItems = [
  {
    id: 'security',
    label: '安全服务',
    icon: Shield,
    children: [
      { id: 'security-vsw', label: '安全虚拟交换机' },
      { id: 'security-protection', label: '安全防护' },
    ],
  },
];

<SideNav items={menuItems} activeId="security-vsw" />
```

---

### 表格组件

#### DataTable (推荐)
完整的表格容器，包含工具栏、表格内容、分页

```tsx
import { DataTable } from '@/app/components/console';

<DataTable
  searchPlaceholder="搜索实例..."
  createButtonText="创建实例"
  currentPage={currentPage}
  totalPages={totalPages}
  pageSize={pageSize}
  totalItems={totalItems}
  onPageChange={setCurrentPage}
  onPageSizeChange={setPageSize}
  onCreateClick={() => console.log('创建')}
>
  <table className="w-full">
    <thead>
      <tr className="bg-gray-50/80 border-b border-gray-100">
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500">
          名称
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-100">
      {/* 表格行 */}
    </tbody>
  </table>
</DataTable>
```

#### TableToolbar
表格工具栏，包含搜索、筛选、导出、刷新、创建按钮

```tsx
import { TableToolbar } from '@/app/components/console';

<TableToolbar
  searchPlaceholder="搜索实例..."
  createButtonText="创建实例"
  showFilter={true}
  showExport={true}
  showRefresh={true}
  showCreate={true}
  onFilterClick={() => {}}
  onExportClick={() => {}}
  onRefreshClick={() => {}}
  onCreateClick={() => {}}
/>
```

#### Pagination
分页器

```tsx
import { Pagination } from '@/app/components/console';

<Pagination
  currentPage={1}
  totalPages={10}
  pageSize={20}
  totalItems={200}
  onPageChange={(page) => {}}
  onPageSizeChange={(size) => {}}
/>
```

---

### 数据展示组件

#### StatCard
KPI 统计卡片

```tsx
import { StatCard } from '@/app/components/console';
import { Server } from 'lucide-react';

<StatCard
  title="总实例数"
  value="24"
  subtitle="全部实例数"
  icon={Server}
  statusColor="gray"
/>
```

**statusColor 选项**: `gray` | `green` | `blue` | `red` | `orange`

#### StatusPill
状态标签胶囊

```tsx
import { StatusPill } from '@/app/components/console';

<StatusPill status="运行中" type="success" />
<StatusPill status="创建中" type="info" />
<StatusPill status="已关机" type="default" />
<StatusPill status="异常" type="error" />
<StatusPill status="警告" type="warning" />
```

#### TooltipWithCopy
带复制功能的 Tooltip

```tsx
import { TooltipWithCopy } from '@/app/components/console';

<TooltipWithCopy text="完整的长文本内容">
  <div className="truncate max-w-[200px]">
    完整的长文本内容
  </div>
</TooltipWithCopy>
```

---

## 表格规范 (基于"安全虚拟交换机"页面)

### 完整表格模板

```tsx
import { DataTable } from '@/app/components/console';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Button } from '@/app/components/ui/button';
import { StatusPill } from '@/app/components/console';

<DataTable
  searchPlaceholder="搜索实例..."
  createButtonText="创建实例"
  currentPage={currentPage}
  totalPages={totalPages}
  pageSize={pageSize}
  totalItems={totalItems}
  onPageChange={setCurrentPage}
  onPageSizeChange={setPageSize}
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
          操作
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-100">
      {data.map((item) => (
        <tr key={item.id} className="hover:bg-gray-50/30 transition">
          <td className="w-10 px-3 py-3">
            <Checkbox />
          </td>
          <td className="px-3 py-3">
            <div className="text-sm leading-[22px] text-gray-900 font-medium">
              {item.name}
            </div>
            <div className="text-xs leading-[18px] text-gray-500 font-mono mt-0.5">
              {item.id}
            </div>
          </td>
          <td className="px-3 py-3">
            <StatusPill status={item.status} type="success" />
          </td>
          <td className="px-3 py-3">
            <Button variant="link" size="sm" className="h-6 p-0 text-sm">
              详情
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</DataTable>
```

### 表格样式规范

- **容器**: `border border-gray-200/60 rounded bg-white shadow-sm overflow-hidden`
- **表头**: `bg-gray-50/80 border-b border-gray-100`
- **表头文字**: `text-xs leading-[18px] font-medium text-gray-500`
- **表格行**: `bg-white divide-y divide-gray-100`
- **Hover 效果**: `hover:bg-gray-50/30 transition`
- **行高**: 52px (py-3)
- **主文字**: `text-sm leading-[22px] text-gray-900`
- **副文字**: `text-xs leading-[18px] text-gray-500`

---

## 使用示例

### 完整页面布局

```tsx
import { TopBar, SideNav, DataTable, StatCard } from '@/app/components/console';

function ConsolePage() {
  return (
    <div className="flex h-screen">
      {/* TopBar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar title="HCI 超融合" userName="张三" />
      </div>

      {/* Layout */}
      <div className="flex w-full pt-14">
        {/* SideNav */}
        <SideNav items={menuItems} activeId="security-vsw" />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          {/* KPI Cards */}
          <div className="grid grid-cols-5 gap-4 mb-5">
            <StatCard title="总实例数" value="24" icon={Server} />
            {/* 更多卡片... */}
          </div>

          {/* Data Table */}
          <DataTable
            searchPlaceholder="搜索..."
            createButtonText="创建实例"
            currentPage={1}
            totalPages={5}
            pageSize={10}
            totalItems={50}
          >
            {/* 表格内容 */}
          </DataTable>
        </main>
      </div>
    </div>
  );
}
```

---

## 开发建议

1. **使用 DataTable 组件**：新页面开发时直接使用 `DataTable`，包含完整的工具栏和分页功能
2. **保持一致性**：严格遵循设计规范中的字体、间距、圆角规范
3. **响应式布局**：虽然是 B2B 控制台，但仍需考虑不同屏幕尺寸
4. **状态管理**：表格数据、分页状态建议使用 React State 管理
5. **类型安全**：所有组件都提供了 TypeScript 类型定义

---

## 组件文件结构

```
/src/app/components/console/
├── index.ts              # 组件导出入口
├── README.md            # 本文档
├── TopBar.tsx           # 顶部导航栏
├── SideNav.tsx          # 侧边导航
├── DataTable.tsx        # 数据表格容器 (推荐)
├── TableToolbar.tsx     # 表格工具栏
├── Pagination.tsx       # 分页器
├── StatCard.tsx         # KPI 统计卡片
├── StatusPill.tsx       # 状态标签
└── TooltipWithCopy.tsx  # 复制提示
```

---

## 更新日志

### v1.0.0 (2024-12-23)
- ✅ 完成所有核心组件封装
- ✅ 统一圆角规范为 4px
- ✅ 基于"安全虚拟交换机"页面封装表格模板
- ✅ 提供完整的 TypeScript 类型支持
- ✅ 添加组件使用文档

---

## 参考页面

- **安全虚拟交换机**: `/src/app/components/ConsoleLayoutPage.tsx`
- **安全防护**: `/src/app/components/console/SecurityProtection.tsx`
- **Design System**: `/src/app/components/DesignSystemPage.tsx`
