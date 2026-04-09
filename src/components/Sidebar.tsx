import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Activity, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  Monitor, 
  ChevronDown, 
  ChevronRight,
  Box,
  Cpu,
  Zap,
  HardDrive,
  Users
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: '首页', id: 'home' },
  { 
    icon: Database, 
    label: '资产管理', 
    id: 'assets',
    expanded: true,
    subItems: [
      { icon: Box, label: '空间管理', id: 'space', active: true },
      { icon: Cpu, label: '产品管理', id: 'product' },
      { icon: HardDrive, label: '模型管理', id: 'model' },
      { icon: Zap, label: '电表管理', id: 'meter' },
      { icon: HardDrive, label: '设备管理', id: 'device' },
      { icon: Users, label: '户号管理', id: 'account' },
    ]
  },
  { icon: Activity, label: '运行监测', id: 'monitoring' },
  { icon: BarChart3, label: '能耗分析', id: 'analysis' },
  { icon: ShieldCheck, label: '智能运维', id: 'maintenance' },
  { icon: ShieldCheck, label: '智能决策', id: 'decision' },
  { icon: Settings, label: '系统管理', id: 'system' },
  { icon: Monitor, label: '监控管理', id: 'video' },
];

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="p-4 flex items-center gap-2 border-b border-gray-100">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-blue-900 text-lg tracking-tight">ECM能碳掌柜管理系统</span>
      </div>
      
      <nav className="flex-1 py-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <div key={item.id} className="space-y-1">
            <button
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors",
                item.expanded ? "text-blue-600 bg-blue-50/50" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.subItems && (
                item.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {item.subItems && item.expanded && (
              <div className="ml-4 space-y-1 border-l border-gray-100 pl-2">
                {item.subItems.map((sub) => (
                  <button
                    key={sub.id}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      sub.active 
                        ? "text-blue-600 bg-blue-50 font-medium" 
                        : "text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    <sub.icon className="w-4 h-4" />
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
