import React from 'react';
import { Bell, HelpCircle, Settings, ChevronDown, LucideIcon } from 'lucide-react';

interface TopBarProps {
  logo?: React.ReactNode;
  logoIcon?: LucideIcon;
  title?: string;
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  onHelpClick?: () => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onUserClick?: () => void;
  className?: string;
}

/**
 * TopBar - 顶部导航栏组件
 * 
 * 企业级控制台深色主题顶部导航栏
 * 规范：
 * - 高度：56px (h-14)
 * - 背景：深蓝色 #1e40af (bg-[#1e40af])
 * - 文字：白色
 * - 图标尺寸：20px (w-5 h-5)
 * - Logo 图标容器：32px，白色半透明背景
 * 
 * @example
 * <TopBar
 *   title="HCI 超融合"
 *   userName="张三"
 *   notificationCount={3}
 *   onNotificationClick={() => console.log('通知')}
 * />
 */
export function TopBar({
  logo,
  logoIcon: LogoIcon,
  title = 'HCI 超融合',
  userName = '用户',
  userAvatar,
  notificationCount = 0,
  onHelpClick,
  onNotificationClick,
  onSettingsClick,
  onUserClick,
  className = '',
}: TopBarProps) {
  // 获取用户名首字
  const userInitial = userName ? userName.charAt(0) : '用';

  return (
    <div className={`h-14 bg-[#1e40af] px-6 flex items-center justify-between ${className}`}>
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-3">
        {logo || (
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
            {LogoIcon ? (
              <LogoIcon className="w-5 h-5 text-white" strokeWidth={2} />
            ) : (
              <div className="w-5 h-5 bg-white/40 rounded"></div>
            )}
          </div>
        )}
        <span className="text-white font-semibold">{title}</span>
      </div>

      {/* Right: Actions & User */}
      <div className="flex items-center gap-4">
        {/* Help Icon */}
        <button
          onClick={onHelpClick}
          className="text-white hover:text-white/80 transition-colors"
          aria-label="帮助"
        >
          <HelpCircle className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Notification Icon with Badge */}
        <button
          onClick={onNotificationClick}
          className="text-white hover:text-white/80 transition-colors relative"
          aria-label="通知"
        >
          <Bell className="w-5 h-5" strokeWidth={2} />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-medium">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {/* Settings Icon */}
        <button
          onClick={onSettingsClick}
          className="text-white hover:text-white/80 transition-colors"
          aria-label="设置"
        >
          <Settings className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* User Menu */}
        <button
          onClick={onUserClick}
          className="flex items-center gap-2 text-white hover:text-white/90 transition-colors"
        >
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">{userInitial}</span>
            </div>
          )}
          <span className="font-medium">{userName}</span>
          <ChevronDown className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}