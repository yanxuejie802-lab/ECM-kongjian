import React from 'react';
import { 
  Search, 
  Maximize2, 
  Bell, 
  Languages, 
  Sun, 
  Settings, 
  User,
  ChevronDown,
  Menu
} from 'lucide-react';

export function Header() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Menu className="w-5 h-5 text-gray-500" />
        </button>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User className="w-4 h-4" />
          <span>资产管理</span>
          <span className="text-gray-300">/</span>
          <span className="flex items-center gap-1 text-gray-900 font-medium">
            <Bell className="w-4 h-4" />
            空间管理
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 gap-2 w-64">
          <span className="text-sm text-gray-500">全部</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <input 
            type="text" 
            placeholder="搜索" 
            className="bg-transparent border-none outline-none text-sm flex-1"
          />
          <Search className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-4 text-gray-500">
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <Maximize2 className="w-5 h-5" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full min-w-[18px] h-[18px] flex items-center justify-center border-2 border-white">
              141
            </span>
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <Languages className="w-5 h-5" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <Sun className="w-5 h-5" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 ml-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              华东
            </div>
            <span className="text-sm font-medium text-gray-700">华东管理员</span>
          </div>
        </div>
      </div>
    </header>
  );
}
