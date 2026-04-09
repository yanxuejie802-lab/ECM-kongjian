import React from 'react';
import { X, ChevronDown, ChevronRight, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface EditSpaceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

export function EditSpaceDrawer({ isOpen, onClose, data }: EditSpaceDrawerProps) {
  const [scheduleType, setScheduleType] = React.useState<'none' | 'double' | 'single'>('none');
  const [restDays, setRestDays] = React.useState<number[]>([]);
  const [showHolidays, setShowHolidays] = React.useState(false);
  const [showTypicalDays, setShowTypicalDays] = React.useState(false);
  const [typicalDays, setTypicalDays] = React.useState([
    { id: 'after-rest', label: '休息日后第一天', active: true, type: 'predefined', rule: '当天为工作日，前一天为休息日' },
    { id: 'before-rest', label: '休息日前一天', active: false, type: 'predefined', rule: '当天为工作日，后一天为休息日' },
  ]);
  const [editingRuleId, setEditingRuleId] = React.useState<string | null>(null);
  const [calendarDate, setCalendarDate] = React.useState(new Date(2026, 3, 1)); // Default to April 2026
  const [isAddingCustom, setIsAddingCustom] = React.useState(false);
  const [newDayName, setNewDayName] = React.useState('');

  const toggleTypicalDay = (id: string) => {
    setTypicalDays(prev => prev.map(day => 
      day.id === id ? { ...day, active: !day.active } : day
    ));
  };

  const addCustomTypicalDay = () => {
    if (!newDayName.trim()) return;
    const newDay = {
      id: `custom-${Date.now()}`,
      label: newDayName,
      active: true,
      type: 'custom',
      rule: [] as string[] // Selected dates
    };
    setTypicalDays([...typicalDays, newDay]);
    setNewDayName('');
    setIsAddingCustom(false);
  };

  const toggleCustomDate = (dayId: string, dateStr: string) => {
    setTypicalDays(prev => prev.map(day => {
      if (day.id === dayId && day.type === 'custom') {
        const currentDates = Array.isArray(day.rule) ? day.rule : [];
        const newDates = currentDates.includes(dateStr)
          ? currentDates.filter(d => d !== dateStr)
          : [...currentDates, dateStr];
        return { ...day, rule: newDates };
      }
      return day;
    }));
  };

  const applyToYear = (dayId: string) => {
    setTypicalDays(prev => prev.map(day => {
      if (day.id === dayId && day.type === 'custom') {
        const currentDates = Array.isArray(day.rule) ? day.rule : [];
        // Get unique day numbers from currently selected dates in the current month
        const currentMonthStr = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}`;
        const selectedDayNumbers = currentDates
          .filter(d => d.startsWith(currentMonthStr))
          .map(d => d.split('-')[2]);

        if (selectedDayNumbers.length === 0) return day;

        const newDates = [...currentDates];
        const year = calendarDate.getFullYear();
        
        for (let m = 0; m < 12; m++) {
          const monthStr = String(m + 1).padStart(2, '0');
          selectedDayNumbers.forEach(dayNum => {
            const fullDate = `${year}-${monthStr}-${dayNum}`;
            // Basic check for valid date (e.g. avoid Feb 30)
            const d = new Date(year, m, parseInt(dayNum));
            if (d.getMonth() === m && !newDates.includes(fullDate)) {
              newDates.push(fullDate);
            }
          });
        }
        return { ...day, rule: newDates };
      }
      return day;
    }));
  };

  const changeMonth = (offset: number) => {
    setCalendarDate(prev => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + offset);
      return next;
    });
  };
  const [holidayConfigs, setHolidayConfigs] = React.useState<Record<string, { type: string, days: { date: string, label: string, isRest: boolean, isAdjustment?: boolean }[] }>>({
    '元旦': { 
      type: '按国家规定休息', 
      days: [
        { date: '12-31', label: '调休', isRest: false, isAdjustment: true },
        { date: '01-01', label: '元旦', isRest: true },
        { date: '01-02', label: '初二', isRest: true },
        { date: '01-03', label: '初三', isRest: true },
      ] 
    },
    '春节': { 
      type: '按国家规定休息', 
      days: [
        { date: '02-14', label: '调休', isRest: false, isAdjustment: true },
        { date: '02-15', label: '除夕', isRest: true },
        { date: '02-16', label: '初一', isRest: true },
        { date: '02-17', label: '初二', isRest: true },
        { date: '02-18', label: '初三', isRest: true },
        { date: '02-19', label: '初四', isRest: true },
        { date: '02-20', label: '初五', isRest: true },
        { date: '02-21', label: '初六', isRest: true },
        { date: '02-22', label: '调休', isRest: false, isAdjustment: true },
      ] 
    },
    '清明': { 
      type: '按国家规定休息', 
      days: [
        { date: '04-04', label: '清明', isRest: true },
        { date: '04-05', label: '初二', isRest: true },
        { date: '04-06', label: '初三', isRest: true },
      ] 
    },
    '五一': { 
      type: '按国家规定休息', 
      days: [
        { date: '04-26', label: '调休', isRest: false, isAdjustment: true },
        { date: '05-01', label: '劳动节', isRest: true },
        { date: '05-02', label: '初二', isRest: true },
        { date: '05-03', label: '初三', isRest: true },
        { date: '05-04', label: '初四', isRest: true },
        { date: '05-05', label: '初五', isRest: true },
        { date: '05-10', label: '调休', isRest: false, isAdjustment: true },
      ] 
    },
    '端午': { 
      type: '按国家规定休息', 
      days: [
        { date: '06-19', label: '端午', isRest: true },
        { date: '06-20', label: '初二', isRest: true },
        { date: '06-21', label: '初三', isRest: true },
      ] 
    },
    '中秋': { 
      type: '按国家规定休息', 
      days: [
        { date: '09-25', label: '中秋', isRest: true },
        { date: '09-26', label: '初二', isRest: true },
        { date: '09-27', label: '初三', isRest: true },
      ] 
    },
    '国庆': { 
      type: '按国家规定休息', 
      days: [
        { date: '09-27', label: '调休', isRest: false, isAdjustment: true },
        { date: '10-01', label: '国庆', isRest: true },
        { date: '10-02', label: '初二', isRest: true },
        { date: '10-03', label: '初三', isRest: true },
        { date: '10-04', label: '初四', isRest: true },
        { date: '10-05', label: '初五', isRest: true },
        { date: '10-06', label: '初六', isRest: true },
        { date: '10-07', label: '初七', isRest: true },
        { date: '10-10', label: '调休', isRest: false, isAdjustment: true },
      ] 
    },
  });

  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  const handleHolidayTypeChange = (holiday: string, type: string) => {
    setHolidayConfigs(prev => ({
      ...prev,
      [holiday]: { ...prev[holiday], type }
    }));
  };

  const toggleHolidayDay = (holiday: string, dayIndex: number) => {
    setHolidayConfigs(prev => {
      const newDays = [...prev[holiday].days];
      newDays[dayIndex] = { ...newDays[dayIndex], isRest: !newDays[dayIndex].isRest };
      return {
        ...prev,
        [holiday]: { ...prev[holiday], days: newDays }
      };
    });
  };

  const toggleRestDay = (index: number) => {
    if (scheduleType === 'single') {
      setRestDays([index]);
    } else if (scheduleType === 'double') {
      if (restDays.includes(index)) {
        setRestDays(restDays.filter(d => d !== index));
      } else if (restDays.length < 2) {
        setRestDays([...restDays, index]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-[1px]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-[480px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">编辑空间</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* 所属公司 */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-700 flex items-center gap-1">
                  所属公司 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 bg-white appearance-none">
                    <option>{data?.company || '膳魔师家庭制品有限公司'}</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 收费标准 */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-700 flex items-center gap-1">
                  收费标准 <span className="text-red-500">*</span>
                </label>
                <div className="relative border border-gray-200 rounded-md p-1.5 flex flex-wrap gap-1.5 min-h-[38px]">
                  <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded flex items-center gap-1">
                    江苏10kv大工业一般收费标准（购电价）
                    <X className="w-3 h-3 cursor-pointer hover:text-red-500" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 排班配置 */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">排班配置</h3>
                
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">工作制度</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'none', label: '全年无休' },
                      { id: 'single', label: '单休' },
                      { id: 'double', label: '双休' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => {
                          setScheduleType(type.id as any);
                          setRestDays([]);
                        }}
                        className={cn(
                          "flex-1 py-2 text-sm rounded-md border transition-all",
                          scheduleType === type.id 
                            ? "bg-blue-50 border-blue-600 text-blue-600 font-medium" 
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {scheduleType !== 'none' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <label className="text-xs text-gray-500 uppercase tracking-wider">
                      选择休息日 ({scheduleType === 'single' ? '选择1天' : '选择2天'})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {days.map((day, index) => (
                        <button
                          key={day}
                          onClick={() => toggleRestDay(index)}
                          className={cn(
                            "px-3 py-1.5 text-xs rounded-full border transition-all",
                            restDays.includes(index)
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-gray-200 text-gray-600 hover:border-blue-400"
                          )}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2 pt-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">特殊日期配置</label>
                  <div className="space-y-2">
                    {/* 节假日 */}
                    <div className="border border-gray-200 rounded-md overflow-hidden">
                      <button 
                        onClick={() => setShowHolidays(!showHolidays)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium">节假日安排</span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", showHolidays && "rotate-180")} />
                      </button>
                      {showHolidays && (
                        <div className="p-3 space-y-3 bg-white border-t border-gray-100">
                          <div className="flex flex-col gap-3">
                            {(Object.entries(holidayConfigs) as [string, { type: string, days: { date: string, label: string, isRest: boolean, isAdjustment?: boolean }[] }][]).map(([h, config]) => (
                              <div key={h} className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100">
                                  <span className="text-xs text-gray-700 font-medium">{h}</span>
                                  <select 
                                    value={config.type}
                                    onChange={(e) => handleHolidayTypeChange(h, e.target.value)}
                                    className="text-[10px] bg-transparent border-none outline-none text-blue-600 font-medium cursor-pointer"
                                  >
                                    <option>按国家规定休息</option>
                                    <option>正常上班</option>
                                    <option>自定义安排</option>
                                  </select>
                                </div>
                                
                                {config.type === '自定义安排' && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="pl-4 pr-2 py-2 bg-blue-50/30 rounded-md border border-blue-100/50 space-y-2"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] text-gray-500">点击切换状态：</span>
                                      <div className="flex gap-3 text-[9px]">
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-600 rounded-full" /> 休息</div>
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-300 rounded-full" /> 上班</div>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {config.days.map((day, idx) => (
                                        <button
                                          key={idx}
                                          onClick={() => toggleHolidayDay(h, idx)}
                                          className={cn(
                                            "flex flex-col items-center justify-center p-1.5 min-w-[42px] rounded-md transition-all border",
                                            day.isRest 
                                              ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                                              : "bg-white border-gray-200 text-gray-400 hover:border-blue-300",
                                            day.isAdjustment && !day.isRest && "border-orange-300 bg-orange-50/50 text-orange-700"
                                          )}
                                        >
                                          <span className="text-[8px] opacity-80 mb-0.5">{day.date}</span>
                                          <span className="text-[10px] font-medium leading-tight">{day.label}</span>
                                          <span className={cn(
                                            "text-[9px] mt-1 px-1 rounded-sm",
                                            day.isRest ? "bg-white/20" : "bg-gray-100 text-gray-500"
                                          )}>
                                            {day.isRest ? '休' : '班'}
                                          </span>
                                        </button>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 典型日 */}
                    <div className="border border-gray-200 rounded-md overflow-hidden">
                      <button 
                         onClick={() => setShowTypicalDays(!showTypicalDays)}
                         className="w-full flex items-center justify-between px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium">典型日配置</span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", showTypicalDays && "rotate-180")} />
                      </button>
                      {showTypicalDays && (
                        <div className="p-3 space-y-3 bg-white border-t border-gray-100">
                          <div className="space-y-3">
                            {typicalDays.map(day => (
                              <div key={day.id} className="space-y-2">
                                <div className="flex items-center justify-between group">
                                  <div 
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => toggleTypicalDay(day.id)}
                                  >
                                    <div className={cn(
                                      "w-4 h-4 rounded border flex items-center justify-center transition-all",
                                      day.active ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white"
                                    )}>
                                      {day.active && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                    </div>
                                    <span className="text-xs text-gray-700">{day.label}</span>
                                  </div>
                                  <button 
                                    onClick={() => setEditingRuleId(editingRuleId === day.id ? null : day.id)}
                                    className={cn(
                                      "text-[10px] transition-colors",
                                      editingRuleId === day.id ? "text-blue-600 font-medium" : "text-gray-400 group-hover:text-blue-600"
                                    )}
                                  >
                                    配置规则
                                  </button>
                                </div>

                                {editingRuleId === day.id && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="p-2.5 bg-gray-50 rounded-md border border-gray-100 text-[10px] text-gray-500 leading-relaxed"
                                  >
                                    {day.type === 'predefined' ? (
                                      <div className="flex items-center gap-2 text-blue-600">
                                        <div className="w-1 h-1 bg-blue-600 rounded-full" />
                                        {day.rule}
                                      </div>
                                    ) : (
                                      <div className="space-y-3">
                                        <div className="flex items-center justify-between mb-1">
                                          <div className="flex items-center gap-2">
                                            <button 
                                              onClick={() => changeMonth(-1)}
                                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                                            >
                                              <ChevronRight className="w-3 h-3 rotate-180" />
                                            </button>
                                            <span className="font-medium text-gray-700">
                                              {calendarDate.getFullYear()}年{calendarDate.getMonth() + 1}月
                                            </span>
                                            <button 
                                              onClick={() => changeMonth(1)}
                                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                                            >
                                              <ChevronRight className="w-3 h-3" />
                                            </button>
                                          </div>
                                          <button 
                                            onClick={() => applyToYear(day.id)}
                                            className="text-blue-600 hover:underline font-medium"
                                          >
                                            应用于全年
                                          </button>
                                        </div>
                                        
                                        <div className="grid grid-cols-7 gap-1 text-center mb-1">
                                          {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                                            <span key={d} className="text-[8px] text-gray-400">{d}</span>
                                          ))}
                                        </div>

                                        <div className="grid grid-cols-7 gap-1">
                                          {(() => {
                                            const year = calendarDate.getFullYear();
                                            const month = calendarDate.getMonth();
                                            const firstDay = new Date(year, month, 1).getDay();
                                            const daysInMonth = new Date(year, month + 1, 0).getDate();
                                            
                                            const cells = [];
                                            // Empty cells for previous month
                                            for (let i = 0; i < firstDay; i++) {
                                              cells.push(<div key={`empty-${i}`} />);
                                            }
                                            
                                            // Day cells
                                            for (let i = 1; i <= daysInMonth; i++) {
                                              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                                              const isSelected = (day.rule as string[]).includes(dateStr);
                                              cells.push(
                                                <button
                                                  key={i}
                                                  onClick={() => toggleCustomDate(day.id, dateStr)}
                                                  className={cn(
                                                    "w-6 h-6 flex items-center justify-center rounded transition-all text-[9px]",
                                                    isSelected 
                                                      ? "bg-blue-600 text-white shadow-sm" 
                                                      : "bg-white border border-gray-100 text-gray-400 hover:border-blue-300"
                                                  )}
                                                >
                                                  {i}
                                                </button>
                                              );
                                            }
                                            return cells;
                                          })()}
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1 border-t border-gray-100">
                                          <span>已选总天数:</span>
                                          <span className="text-blue-600 font-medium">{(day.rule as string[]).length} 天</span>
                                        </div>
                                      </div>
                                    )}
                                  </motion.div>
                                )}
                              </div>
                            ))}

                            {isAddingCustom ? (
                              <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-2 pt-2 border-t border-gray-50"
                              >
                                <input 
                                  autoFocus
                                  type="text"
                                  value={newDayName}
                                  onChange={(e) => setNewDayName(e.target.value)}
                                  placeholder="输入典型日名称"
                                  className="w-full px-2 py-1.5 text-xs border border-blue-200 rounded outline-none focus:ring-1 focus:ring-blue-500"
                                  onKeyDown={(e) => e.key === 'Enter' && addCustomTypicalDay()}
                                />
                                <div className="flex gap-2">
                                  <button 
                                    onClick={addCustomTypicalDay}
                                    className="flex-1 py-1 text-[10px] bg-blue-600 text-white rounded hover:bg-blue-700"
                                  >
                                    确定
                                  </button>
                                  <button 
                                    onClick={() => setIsAddingCustom(false)}
                                    className="flex-1 py-1 text-[10px] bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                                  >
                                    取消
                                  </button>
                                </div>
                              </motion.div>
                            ) : (
                              <button 
                                onClick={() => setIsAddingCustom(true)}
                                className="w-full py-1.5 mt-2 border border-dashed border-gray-300 rounded text-[10px] text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-all"
                              >
                                + 添加自定义典型日
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 关联电表 */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-700">关联电表</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 bg-white appearance-none">
                    <option>{data?.meter || '膳魔师关口电表'}</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 关联设备 */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-700">关联设备</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="请输入设备名称" 
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 户号 */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-700">户号</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 bg-white appearance-none">
                    <option>3206800011153-膳魔师家庭制品有限公司</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 经纬度 */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-700 flex items-center gap-1">
                  经纬度 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  defaultValue="121.006965,31.339241" 
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>

              {/* 排序 */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-700">排序</label>
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                  <input 
                    type="number" 
                    defaultValue="0" 
                    className="flex-1 px-3 py-2 text-sm outline-none" 
                  />
                  <div className="flex flex-col border-l border-gray-200">
                    <button className="px-2 py-0.5 hover:bg-gray-50 border-b border-gray-200">
                      <Plus className="w-3 h-3 text-gray-400" />
                    </button>
                    <button className="px-2 py-0.5 hover:bg-gray-50">
                      <Minus className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 用电区间 */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-700">用电区间(kWh)</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center border border-gray-200 rounded-md overflow-hidden">
                    <input type="number" defaultValue="0" className="flex-1 px-3 py-2 text-sm outline-none" />
                    <div className="flex flex-col border-l border-gray-200">
                      <button className="px-2 py-0.5 hover:bg-gray-50 border-b border-gray-200"><Plus className="w-3 h-3 text-gray-400" /></button>
                      <button className="px-2 py-0.5 hover:bg-gray-50"><Minus className="w-3 h-3 text-gray-400" /></button>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">至</span>
                  <div className="flex-1 flex items-center border border-gray-200 rounded-md overflow-hidden">
                    <input type="number" defaultValue="0" className="flex-1 px-3 py-2 text-sm outline-none" />
                    <div className="flex flex-col border-l border-gray-200">
                      <button className="px-2 py-0.5 hover:bg-gray-50 border-b border-gray-200"><Plus className="w-3 h-3 text-gray-400" /></button>
                      <button className="px-2 py-0.5 hover:bg-gray-50"><Minus className="w-3 h-3 text-gray-400" /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 额定功率 */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-700 flex items-center gap-1">
                  额定功率(KW) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="请输入" 
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>

              {/* 阈值配置 */}
              <div className="pt-4">
                <button className="flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-blue-600 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  阈值配置 <span className="text-gray-400 font-normal">(选填)</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md border border-gray-200 transition-colors"
              >
                取消
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
              >
                确认
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
