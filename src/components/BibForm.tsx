import React from 'react';
import { SexType, DistanceType, BibCalculationResult } from '../types';
import { User, Calendar, Calculator, MapPin, Sparkles } from 'lucide-react';

interface BibFormProps {
  sex: SexType;
  onSexChange: (sex: SexType) => void;
  ydate: number | '';
  onYdateChange: (year: number | '') => void;
  distance: DistanceType;
  onDistanceChange: (dist: DistanceType) => void;
  result: BibCalculationResult;
  runnerName: string;
  onRunnerNameChange: (name: string) => void;
}

export const BibForm: React.FC<BibFormProps> = ({
  sex,
  onSexChange,
  ydate,
  onYdateChange,
  distance,
  onDistanceChange,
  result,
  runnerName,
  onRunnerNameChange,
}) => {
  const currentYear = 2569;

  // Handle number input cleanly
  const handleYearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val === '') {
      onYdateChange('');
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      onYdateChange(num);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-7 border border-pink-100 shadow-lg shadow-sky-100/50">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
            กรอกข้อมูลนักวิ่ง
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-100 text-pink-700">
          คำนวณสด
        </span>
      </div>

      <div className="space-y-6">
        {/* 1. Sex / เพศ */}
        <div id="field-sex-group">
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-sky-500" />
              <span>เพศ (sex)</span>
            </span>
            <span className="text-xs font-normal text-slate-500">
              ตัวเลือก "ชาย", "หญิง"
            </span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              id="btn-sex-male"
              onClick={() => onSexChange('ชาย')}
              className={`py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 border-2 ${
                sex === 'ชาย'
                  ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200 font-bold scale-[1.01]'
                  : 'bg-sky-50/60 text-slate-700 border-sky-200/70 hover:bg-sky-100/80'
              }`}
            >
              <span className="text-lg">🏃‍♂️</span>
              <span>ชาย</span>
              {sex === 'ชาย' && <span className="text-xs bg-sky-600/60 px-1.5 py-0.5 rounded">M</span>}
            </button>

            <button
              type="button"
              id="btn-sex-female"
              onClick={() => onSexChange('หญิง')}
              className={`py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 border-2 ${
                sex === 'หญิง'
                  ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200 font-bold scale-[1.01]'
                  : 'bg-pink-50/60 text-slate-700 border-pink-200/70 hover:bg-pink-100/80'
              }`}
            >
              <span className="text-lg">🏃‍♀️</span>
              <span>หญิง</span>
              {sex === 'หญิง' && <span className="text-xs bg-pink-600/60 px-1.5 py-0.5 rounded">F</span>}
            </button>
          </div>
        </div>

        {/* 2. Birth Year / พ.ศ.เกิด (ydate) */}
        <div id="field-ydate-group">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="input-ydate" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-pink-500" />
              <span>พ.ศ.เกิด (ydate)</span>
            </label>
          </div>

          <div className="relative">
            <input
              id="input-ydate"
              type="number"
              placeholder="ระบุ พ.ศ.เกิด"
              value={ydate}
              onChange={handleYearInput}
              min="2450"
              max={currentYear}
              className="w-full px-4 py-3 text-lg font-bib font-bold rounded-xl border-2 border-slate-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-200 bg-slate-50/50 text-slate-800"
            />
            {ydate !== '' && (
              <button
                type="button"
                id="btn-clear-ydate"
                onClick={() => onYdateChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-200/60"
              >
                ล้าง
              </button>
            )}
          </div>
        </div>

        {/* 3. Distance / ระยะวิ่ง (distance): "5k" สีแดง และ "10 k" สีฟ้า */}
        <div id="field-distance-group">
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-500" />
              <span>ระยะวิ่ง (distance)</span>
            </span>
            <span className="text-xs font-normal text-slate-500">
              ตัวเลือก "5k" (สีชมพู), "10 k" (สีฟ้า)
            </span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* 5k: สีชมพู */}
            <button
              type="button"
              id="btn-distance-5k"
              onClick={() => onDistanceChange('5k')}
              className={`py-3 px-4 rounded-xl font-medium text-sm flex flex-col items-center justify-center transition-all duration-200 border-2 ${
                distance === '5k'
                  ? 'bg-pink-500 text-white border-pink-500 ring-2 ring-pink-200 shadow-md shadow-pink-200 font-bold scale-[1.01]'
                  : 'bg-pink-50/70 text-pink-700 border-pink-200/80 hover:bg-pink-100/70'
              }`}
            >
              <span className="text-xl font-black font-bib tracking-wide">5k</span>
              <span className={`text-[11px] font-medium ${distance === '5k' ? 'text-pink-100' : 'text-pink-500'}`}>
                ระยะ 5k (สีชมพู)
              </span>
            </button>

            {/* 10 k: สีฟ้า */}
            <button
              type="button"
              id="btn-distance-10k"
              onClick={() => onDistanceChange('10 k')}
              className={`py-3 px-4 rounded-xl font-medium text-sm flex flex-col items-center justify-center transition-all duration-200 border-2 ${
                distance === '10 k'
                  ? 'bg-sky-500 text-white border-sky-500 ring-2 ring-sky-200 shadow-md shadow-sky-200 font-bold scale-[1.01]'
                  : 'bg-sky-50/70 text-sky-700 border-sky-200/80 hover:bg-sky-100/70'
              }`}
            >
              <span className="text-xl font-black font-bib tracking-wide">10 k</span>
              <span className={`text-[11px] font-medium ${distance === '10 k' ? 'text-sky-100' : 'text-sky-600'}`}>
                ระยะ 10 k (สีฟ้า)
              </span>
            </button>
          </div>
        </div>

        {/* 4. Age (อายุ) & 5. Group Run (รุ่น) Computed Display Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Age label "อายุ" คำนวณ 2569-ydate */}
          <div 
            id="computed-age-card"
            className="p-3.5 rounded-xl bg-gradient-to-br from-sky-50 to-white border border-sky-200/80 shadow-xs"
          >
            <div className="flex items-center justify-between text-xs text-sky-700 font-semibold mb-1">
              <span className="flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5" />
                อายุ (age)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">2569 - ydate</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span 
                id="display-age-value"
                className="text-2xl font-black text-slate-900 font-bib"
              >
                {result.age !== null ? result.age : '-'}
              </span>
              <span className="text-sm font-medium text-slate-600">
                {result.age !== null ? 'ปี' : '(ยังไม่ได้ระบุ พ.ศ.)'}
              </span>
            </div>
            {result.age !== null && (
              <p className="text-[11px] text-slate-500 mt-1">
                คำนวณจาก: 2569 - {ydate} = {result.age} ปี
              </p>
            )}
          </div>

          {/* Group run label "รุ่น" */}
          <div 
            id="computed-grouprun-card"
            className={`p-3.5 rounded-xl border shadow-xs transition-colors ${
              distance === '5k'
                ? 'bg-gradient-to-br from-pink-50/60 to-white border-pink-200/80'
                : 'bg-gradient-to-br from-sky-50/60 to-white border-sky-200/80'
            }`}
          >
            <div className={`flex items-center justify-between text-xs font-semibold mb-1 ${
              distance === '5k' ? 'text-pink-700' : 'text-sky-700'
            }`}>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                รุ่น (grouprun)
              </span>
              <span className={`text-[11px] font-semibold px-1.5 py-0.2 rounded ${
                distance === '5k' ? 'text-pink-600 bg-pink-100' : 'text-sky-600 bg-sky-100'
              }`}>
                {distance === '5k' ? '5k (สีชมพู)' : '10 k (สีฟ้า)'}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span 
                id="display-grouprun-value"
                className={`text-2xl font-black font-bib transition-colors ${
                  distance === '5k' ? 'text-pink-500' : 'text-sky-500'
                }`}
              >
                {result.grouprun !== '-' ? result.grouprun : '-'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 truncate">
              {result.categoryDescription}
            </p>
          </div>
        </div>

        {/* Runner name customization (optional) */}
        <div className="pt-2 border-t border-slate-100">
          <label htmlFor="input-runner-name" className="block text-xs font-semibold text-slate-600 mb-1">
            ชื่อนักวิ่งบนป้าย (ไม่บังคับ)
          </label>
          <input
            id="input-runner-name"
            type="text"
            placeholder="เช่น SOMCHAI RUNNER"
            value={runnerName}
            onChange={(e) => onRunnerNameChange(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100 outline-none uppercase font-bib"
            maxLength={25}
          />
        </div>
      </div>
    </div>
  );
};
