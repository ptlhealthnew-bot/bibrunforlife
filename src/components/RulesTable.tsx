import React, { useState } from 'react';
import { ALL_RULES } from '../utils/bibCalculator';
import { SexType, DistanceType } from '../types';
import { CheckCircle2, ChevronDown, ChevronUp, TableProperties } from 'lucide-react';

interface RulesTableProps {
  currentSex: SexType;
  currentDistance: DistanceType;
  currentAge: number | null;
  currentGroup: string;
}

export const RulesTable: React.FC<RulesTableProps> = ({
  currentSex,
  currentDistance,
  currentAge,
  currentGroup,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterSex, setFilterSex] = useState<SexType | 'ทั้งหมด'>('ทั้งหมด');
  const [filterDistance, setFilterDistance] = useState<DistanceType | 'ทั้งหมด'>('ทั้งหมด');

  const filteredRules = ALL_RULES.filter((r) => {
    if (filterSex !== 'ทั้งหมด' && r.sex !== filterSex) return false;
    if (filterDistance !== 'ทั้งหมด' && r.distance !== filterDistance) return false;
    return true;
  });

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-100 shadow-sm overflow-hidden">
      {/* Toggle header */}
      <button
        type="button"
        id="btn-toggle-rules"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 to-pink-400 text-white flex items-center justify-center shadow-xs">
            <TableProperties className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">
              ตารางเกณฑ์รุ่นการแข่งขันทั้งหมด (24 เงื่อนไข)
            </h4>
            <p className="text-xs text-slate-500">
              คลิกเพื่อดูเงื่อนไขการแบ่งรุ่น ชาย/หญิง ระยะ 5k และ 10 k
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentGroup !== '-' && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 font-semibold font-bib">
              รุ่นปัจจุบัน: {currentGroup}
            </span>
          )}
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-100 animate-fadeIn">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 mt-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">กรองเพศ:</span>
              {(['ทั้งหมด', 'ชาย', 'หญิง'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  id={`filter-sex-${s}`}
                  onClick={() => setFilterSex(s)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                    filterSex === s
                      ? 'bg-sky-500 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">กรองระยะ:</span>
              {(['ทั้งหมด', '5k', '10 k'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  id={`filter-dist-${d}`}
                  onClick={() => setFilterDistance(d)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                    filterDistance === d
                      ? 'bg-pink-500 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left text-slate-600" id="table-category-rules">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[11px]">
                <tr>
                  <th scope="col" className="px-3.5 py-2.5">สถานะ</th>
                  <th scope="col" className="px-3.5 py-2.5">เพศ (sex)</th>
                  <th scope="col" className="px-3.5 py-2.5">ระยะ (distance)</th>
                  <th scope="col" className="px-3.5 py-2.5">ช่วงอายุ (age)</th>
                  <th scope="col" className="px-3.5 py-2.5 font-bib">ผลลัพธ์รุ่น (grouprun)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRules.map((rule, idx) => {
                  const isMatching =
                    currentAge !== null &&
                    rule.sex === currentSex &&
                    rule.distance === currentDistance &&
                    currentAge >= rule.minAge &&
                    currentAge <= rule.maxAge;

                  return (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        isMatching
                          ? 'bg-pink-50/90 font-bold text-pink-900 border-l-4 border-l-pink-500'
                          : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <td className="px-3.5 py-2">
                        {isMatching ? (
                          <span className="inline-flex items-center gap-1 text-pink-600 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            ตรงกัน
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="px-3.5 py-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] ${
                            rule.sex === 'ชาย'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-pink-100 text-pink-800'
                          }`}
                        >
                          {rule.sex}
                        </span>
                      </td>
                      <td className="px-3.5 py-2 font-medium">{rule.distance}</td>
                      <td className="px-3.5 py-2">{rule.ageRange}</td>
                      <td className="px-3.5 py-2 font-bib text-sm text-slate-800 font-bold">
                        <span className={isMatching ? 'text-pink-600' : 'text-slate-700'}>
                          “{rule.grouprun}”
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
