import React, { useState } from 'react';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';

export interface SideNavItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  children?: SideNavItem[];
  onClick?: () => void;
}

interface SideNavProps {
  items: SideNavItem[];
  activeId?: string;
  onItemClick?: (item: SideNavItem) => void;
  className?: string;
}

/**
 * SideNav - 侧边导航组件
 * 
 * 企业级控制台侧边导航栏，支持二级菜单展开/收起
 * 规范：
 * - 宽度：240px 固定
 * - 菜单项高度：40px
 * - 选中态：左侧 3px 蓝色色条 + 极浅蓝色背景
 * - 图标尺寸：16px (w-4 h-4)
 * - 字体大小：14px
 * 
 * @example
 * const menuItems = [
 *   {
 *     id: 'security',
 *     label: '安全服务',
 *     icon: Shield,
 *     children: [
 *       { id: 'security-vsw', label: '安全虚拟交换机' },
 *       { id: 'security-protection', label: '安全防护' },
 *     ],
 *   },
 * ];
 * 
 * <SideNav items={menuItems} activeId="security-vsw" />
 */
export function SideNav({ items, activeId, onItemClick, className = '' }: SideNavProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderItem = (item: SideNavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedIds.has(item.id);
    const isActive = activeId === item.id;
    const Icon = item.icon;

    return (
      <div key={item.id}>
        {/* Menu Item */}
        <div
          className={`
            h-10 px-4 flex items-center gap-2 cursor-pointer transition-colors relative
            ${level === 0 ? 'text-sm' : 'text-sm pl-11'}
            ${
              isActive
                ? 'bg-blue-50/50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }
          `}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            }
            if (item.onClick) {
              item.onClick();
            }
            if (onItemClick) {
              onItemClick(item);
            }
          }}
        >
          {/* Active Indicator - 3px 左侧色条 */}
          {isActive && (
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1e40af] rounded-r"></div>
          )}

          {/* Icon */}
          {Icon && (
            <Icon
              className={`w-4 h-4 flex-shrink-0 ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
              strokeWidth={1.5}
            />
          )}

          {/* Label */}
          <span className="flex-1 font-medium">{item.label}</span>

          {/* Expand Icon */}
          {hasChildren && (
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
              )}
            </div>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {item.children!.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`w-60 bg-white border-r border-gray-200 ${className}`}>
      <div className="py-2">
        {items.map((item) => renderItem(item))}
      </div>
    </nav>
  );
}