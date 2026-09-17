import React from 'react';
import { BibCalculationResult } from '../types';
import { Award, Calendar, User } from 'lucide-react';

interface BibCardProps {
  data: BibCalculationResult;
  runnerName?: string;
}

export const BibCard: React.FC<BibCardProps> = ({ data, runnerName }) => {
  const isFemale = data.sex === 'หญิง';
  const is5k = data.distance === '5k';

  // ถ้าระยะวิ่ง 10 k ให้รุ่นการแข่งขันเป็นสีฟ้า, 5k ให้เป็นสีชมพู
  const groupTextColor = is5k ? 'text-pink-500' : 'text-sky-500';
  const groupSubTextColor = is5k ? 'text-pink-600' : 'text-sky-600';

  return (
    <div className="relative w-full max-w-md mx-auto" id="printable-bib">
      {/* BIB Card container with realistic card texture, drop shadow and pastel gradients */}
      <div 
        id="bib-card-canvas"
        className="relative bg-white rounded-2xl border-4 border-slate-100 shadow-xl overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fdf2f8 50%, #f0f9ff 100%)',
        }}
      >
        {/* 4 Corner Pin Holes (รูสำหรับกลัดเข็มกลัด 4 ด้าน) */}
        <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-slate-200 border-2 border-slate-300 shadow-inner z-20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
        </div>
        <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-slate-200 border-2 border-slate-300 shadow-inner z-20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
        </div>
        <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-slate-200 border-2 border-slate-300 shadow-inner z-20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
        </div>
        <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-slate-200 border-2 border-slate-300 shadow-inner z-20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
        </div>

        {/* Top Header Banner: Pastel Blue to Pink */}
        <div className="pt-6 pb-3 px-8 text-center bg-gradient-to-r from-sky-200 via-pink-200 to-sky-200 border-b border-pink-200/60 relative">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-wider font-bib uppercase">
            Run For Life 3
          </h2>
        </div>

        {/* MAIN CENTERPIECE: การจัดวางเป็นแนวตั้ง (1.เพศ -> 2.รุ่นอายุ [อักษรบน ตัวเลขล่าง ไม่มีคำว่าปี] -> 3.ระยะวิ่งอยู่ล่างสุด) */}
        <div className="py-5 px-6 text-center relative flex flex-col items-center justify-center">
          
          {/* 1. เพศ (อยู่บนสุดของแนวตั้ง) */}
          <div id="vertical-sex" className="mb-2">
            <span 
              id="bib-sex-badge"
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold shadow-xs border transition-all ${
                isFemale
                  ? 'bg-pink-100 text-pink-700 border-pink-300'
                  : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}
            >
              <User className="w-4 h-4" />
              <span>เพศ:</span>
              <span className="text-base font-black">{data.sex}</span>
              <span className="text-xs px-1.5 py-0.2 rounded bg-white/70">
                {isFemale ? 'FEMALE (F)' : 'MALE (M)'}
              </span>
            </span>
          </div>

          {/* 2. รุ่นอายุ (อยู่ตรงกลางของแนวตั้ง: อักษรจัดวางข้างบน ตัวเลขจัดวางข้างล่าง ไม่มีคำว่า "ปี") */}
          <div id="vertical-grouprun" className="my-2 w-full flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              รุ่นอายุ (AGE GROUP)
            </div>

            {data.isValid && data.groupLetter !== '-' ? (
              <div 
                id="bib-grouprun-stacked"
                className="flex flex-col items-center justify-center py-1 transition-transform"
              >
                {/* อักษรจัดวางข้างบน (Letter on top) */}
                <div 
                  id="bib-grouprun-letter"
                  className={`text-4xl md:text-5xl font-black font-bib tracking-wider leading-tight drop-shadow-sm transition-colors duration-200 ${groupTextColor}`}
                >
                  {data.groupLetter}
                </div>

                {/* แถบเชื่อมต่อสไตล์สปอร์ต */}
                <div className={`w-10 h-1 rounded-full my-0.5 opacity-50 ${is5k ? 'bg-pink-400' : 'bg-sky-400'}`}></div>

                {/* ตัวเลขจัดวางข้างล่าง (Number below, without "ปี") */}
                <div 
                  id="bib-grouprun-number"
                  className={`text-6xl md:text-7xl font-black font-bib tracking-tight leading-none drop-shadow-sm transition-colors duration-200 ${groupTextColor}`}
                >
                  {data.groupNumber}
                </div>
              </div>
            ) : (
              <div 
                id="bib-grouprun-hero"
                className={`text-4xl font-black tracking-tight font-bib py-2 ${groupTextColor}`}
              >
                รอคำนวณ
              </div>
            )}

            <div className={`text-xs font-bold mt-1 ${groupSubTextColor}`}>
              {data.categoryDescription}
            </div>
          </div>

          {/* 3. ระยะวิ่ง (อยู่ล่างสุดของแนวตั้ง) */}
          <div id="vertical-distance" className="mt-2">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
              ระยะวิ่ง (DISTANCE)
            </div>
            <span 
              id="bib-distance-hero"
              className={`inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-2xl font-black font-bib text-2xl shadow-md transition-all ${
                is5k
                  ? 'bg-pink-500 text-white shadow-pink-200 ring-4 ring-pink-100'
                  : 'bg-sky-500 text-white shadow-sky-200 ring-4 ring-sky-100'
              }`}
            >
              <span>{data.distance}</span>
              <span className="text-xs font-sans font-medium tracking-normal opacity-90">
                {is5k ? '(5 กิโลเมตร)' : '(10 กิโลเมตร)'}
              </span>
            </span>
          </div>

          {runnerName && (
            <div 
              id="bib-runner-name"
              className="mt-4 text-xs font-bold text-slate-500 tracking-wider truncate max-w-[280px] mx-auto uppercase bg-slate-100/80 py-1 px-3.5 rounded-full inline-block"
            >
              RUNNER: {runnerName}
            </div>
          )}
        </div>

        {/* 2 Detail Badges at Bottom: พ.ศ.เกิด และ อายุ (2569) */}
        <div className="grid grid-cols-2 gap-3 px-6 mb-4">
          <div className="bg-sky-50/80 border border-sky-200/70 rounded-xl p-2.5 text-center">
            <div className="text-[10px] text-sky-800 font-medium mb-0.5 flex items-center justify-center gap-1">
              <Calendar className="w-3 h-3 text-sky-600" />
              <span>พ.ศ. เกิด (ydate)</span>
            </div>
            <div className="text-base font-bold text-slate-800 font-bib">
              {data.ydate ? data.ydate : '-'}
            </div>
          </div>

          <div className="bg-pink-50/80 border border-pink-200/70 rounded-xl p-2.5 text-center">
            <div className="text-[10px] text-pink-800 font-medium mb-0.5">อายุคำนวณ (ปี 2569)</div>
            <div className="text-base font-bold text-slate-800 font-bib">
              {data.age !== null ? `${data.age} ปี` : '-'}
            </div>
          </div>
        </div>

        {/* Bottom Barcode & Timing Chip Decorative Element */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between border-t border-slate-200">
          <div className="flex items-center gap-2">
            {/* Visual Barcode pattern */}
            <div className="flex items-center gap-[2px] h-6 bg-white px-1.5 py-0.5 rounded">
              <span className="w-[3px] h-full bg-black"></span>
              <span className="w-[1px] h-full bg-black"></span>
              <span className="w-[2px] h-full bg-black"></span>
              <span className="w-[4px] h-full bg-black"></span>
              <span className="w-[1px] h-full bg-black"></span>
              <span className="w-[3px] h-full bg-black"></span>
              <span className="w-[2px] h-full bg-black"></span>
              <span className="w-[1px] h-full bg-black"></span>
              <span className="w-[3px] h-full bg-black"></span>
              <span className="w-[2px] h-full bg-black"></span>
              <span className="w-[1px] h-full bg-black"></span>
              <span className="w-[4px] h-full bg-black"></span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">CHIP TIMING PASS</span>
          </div>

          <div className="text-right flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${is5k ? 'bg-pink-400' : 'bg-sky-400'}`}></span>
            <span className={`text-[11px] tracking-wider font-bold ${is5k ? 'text-pink-300' : 'text-sky-300'}`}>
              {data.distance} • {data.grouprun}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
