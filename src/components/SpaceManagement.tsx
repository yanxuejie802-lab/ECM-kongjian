import React from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  RefreshCw, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  MoreHorizontal,
  X,
  LayoutDashboard,
  Users,
  Box,
  Zap,
  Activity,
  BarChart3,
  ShieldCheck,
  Monitor
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { EditSpaceDrawer } from './EditSpaceDrawer';

const mockData = [
  { id: 'ww_wwyq', name: '华能医用橡胶', type: '园区', attr: '园区', company: '安徽华能医用橡胶制品股份有限公司', size: '1000.00', meter: '高压侧下网电表', device: '/', time: '2025-01-02 15:54:55' },
  { id: 'ww_wwyq-lcj_1-1000', name: '1#配电房变压器', type: '房间', attr: '车间', company: '安徽华能医用橡胶制品股份有限公司', size: '200.00', meter: '老车间1#电表', device: '/', time: '2025-01-05 15:01:53' },
  { id: 'ww_wwyq-lcj_2-800', name: '2#配电房变压器', type: '房间', attr: '其他', company: '安徽华能医用橡胶制品股份有限公司', size: '200.00', meter: '老车间2#电表', device: '/', time: '2025-01-05 15:02:30' },
  { id: 'ww_wwyq-xcj_1-1000', name: '3#箱式变压器', type: '房间', attr: '车间', company: '安徽华能医用橡胶制品股份有限公司', size: '200.00', meter: '新车间电表', device: '/', time: '2025-01-05 15:03:17' },
  { id: 'ww_wwyq-lcj_2-800-other', name: '2#老车间生产负载', type: '房间', attr: '车间', company: '安徽华能医用橡胶制品股份有限公司', size: '2000.00', meter: '变压器2#其他空间虚拟电表', device: '/', time: '2025-01-05 15:11:28' },
  { id: 'TCC', name: '膳魔师园区', type: '园区', attr: '园区', company: '膳魔师家庭制品有限公司', size: '12000.00', meter: '膳魔师关口电表', device: '/', time: '2025-07-03 20:38:44' },
  { id: 'fg_fgdzyq', name: '富港电子园区', type: '园区', attr: '园区', company: '富港电子有限公司', size: '100.00', meter: '富港电子园区虚拟电表', device: '/', time: '2025-07-07 14:02:56' },
];

const orgList = [
  '研精综合能源指挥中心',
  '研精虚拟电厂交易中心',
  '华能医用橡胶',
  '膳魔师园区',
  '仪征亚新科双环活塞环',
  '天津海河科技园',
  '固达电线电缆集团',
  '双登富朗特',
  '江苏珀然股份',
  '徐州铸沛特钢有限公司',
  '泸溪河浦口文德店',
  '泸溪河弘阳广场大洋店',
  '贵州金山磨料',
  '泸溪河工厂',
  '开阳化工园区',
  '贵阳水务环境集团花溪碧云窝水厂',
  '贵阳水务环境集团花溪源泉水务',
  '贵州军鑫矿业有限公司',
  '多彩贵州',
  '广西嵘兴中科发展有限公司',
  '广西东蒙乳业',
  '泰德兴精密电子'
];

export function SpaceManagement() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any>(null);

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center px-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-1 py-1.5">
          <div className="flex items-center gap-2 px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded cursor-pointer">
            <LayoutDashboard className="w-4 h-4" />
            <span>首页</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded cursor-pointer">
            <Users className="w-4 h-4" />
            <span>户号管理</span>
            <X className="w-3 h-3 hover:text-red-500" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded cursor-pointer font-medium">
            <Box className="w-4 h-4" />
            <span>空间管理</span>
            <X className="w-3 h-3 hover:text-red-500" />
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4 text-gray-400">
          <RefreshCw className="w-4 h-4 cursor-pointer hover:text-gray-600" />
          <Maximize2 className="w-4 h-4 cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left Org List */}
        <div className="w-64 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <input 
                type="text" 
                placeholder="请输入关键词搜索" 
                className="w-full bg-gray-50 border border-gray-200 rounded-md pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {orgList.map((org, i) => (
              <div 
                key={i} 
                className={cn(
                  "px-4 py-2 text-sm text-gray-600 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors",
                  org === '华能医用橡胶' && "text-blue-600 font-medium bg-blue-50/50"
                )}
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="truncate">{org}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="grid grid-cols-4 gap-x-6 gap-y-4">
              <div className="space-y-1.5">
                <label className="text-sm text-gray-600">空间编号</label>
                <input type="text" placeholder="请输入空间编号" className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-gray-600">园区名称</label>
                <select className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option>园区名称</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-gray-600">空间类型</label>
                <select className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option>空间类型</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-gray-600">关联电表</label>
                <input type="text" placeholder="请输入关联电表" className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-gray-600">关联设备</label>
                <input type="text" placeholder="请输入关联设备" className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-gray-600">所属公司</label>
                <select className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option>请选择用户公司</option>
                </select>
              </div>
              <div className="space-y-1.5 col-span-2">
                <label className="text-sm text-gray-600">创建时间</label>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="开始时间" className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                  <span className="text-gray-400">→</span>
                  <input type="text" placeholder="结束时间" className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                <Search className="w-4 h-4" />
                搜索
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4" />
                重置
              </button>
            </div>
          </div>

          {/* Table Area */}
          <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-1.5 border border-blue-200 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                  <Plus className="w-4 h-4" />
                  新增
                </button>
                <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  下载
                </button>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <RefreshCw className="w-4 h-4 cursor-pointer hover:text-gray-600" />
                <Settings className="w-4 h-4 cursor-pointer hover:text-gray-600" />
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-50 text-gray-600 font-medium sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 border-b border-gray-200">空间编号</th>
                    <th className="px-4 py-3 border-b border-gray-200">园区名称</th>
                    <th className="px-4 py-3 border-b border-gray-200">空间类型</th>
                    <th className="px-4 py-3 border-b border-gray-200">属性</th>
                    <th className="px-4 py-3 border-b border-gray-200">所属公司</th>
                    <th className="px-4 py-3 border-b border-gray-200 text-right">空间大小(m²)</th>
                    <th className="px-4 py-3 border-b border-gray-200">关联电表</th>
                    <th className="px-4 py-3 border-b border-gray-200">关联设备</th>
                    <th className="px-4 py-3 border-b border-gray-200">创建时间</th>
                    <th className="px-4 py-3 border-b border-gray-200 text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y divide-gray-100">
                  {mockData.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-4 py-3">{row.id}</td>
                      <td className="px-4 py-3">{row.name}</td>
                      <td className="px-4 py-3">{row.type}</td>
                      <td className="px-4 py-3">{row.attr}</td>
                      <td className="px-4 py-3 max-w-xs truncate">{row.company}</td>
                      <td className="px-4 py-3 text-right">{row.size}</td>
                      <td className="px-4 py-3">{row.meter}</td>
                      <td className="px-4 py-3">{row.device}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{row.time}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => handleEdit(row)}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            编辑
                          </button>
                          <button className="text-red-500 hover:text-red-600 font-medium">删除</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-top border-gray-100 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>共 545 条</span>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded border border-gray-200 disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {[1, 2, 3, 4, 5, 6, 7].map(p => (
                    <button 
                      key={p} 
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded border transition-colors",
                        p === 1 ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                  <span className="px-2">...</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">28</button>
                  <button className="p-1 hover:bg-gray-100 rounded border border-gray-200">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select className="border border-gray-200 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option>20 / 页</option>
                  <option>50 / 页</option>
                  <option>100 / 页</option>
                </select>
                <div className="flex items-center gap-2">
                  <span>跳至</span>
                  <input type="text" defaultValue="1" className="w-10 border border-gray-200 rounded px-1 py-1 text-center outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditSpaceDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        data={selectedRow}
      />
    </div>
  );
}

function Maximize2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}
