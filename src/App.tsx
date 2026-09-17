import React, { useState, useMemo } from 'react';
import { SexType, DistanceType } from './types';
import { computeBibDetails } from './utils/bibCalculator';
import { BibCard } from './components/BibCard';
import { BibForm } from './components/BibForm';
import { RulesTable } from './components/RulesTable';
import { 
  Printer, 
  Copy, 
  Check, 
  Info, 
  Sparkles, 
  Trophy, 
  RotateCcw
} from 'lucide-react';

export default function App() {
  // 1. sex: เพศ ("ชาย" หรือ "หญิง") - default "ชาย"
  const [sex, setSex] = useState<SexType>('ชาย');

  // 2. ydate: พ.ศ.เกิด - default 2539 (age = 30)
  const [ydate, setYdate] = useState<number | ''>(2539);

  // 3. distance: ระยะวิ่ง ("5k" สีแดง หรือ "10 k" สีฟ้า) - default "5k"
  const [distance, setDistance] = useState<DistanceType>('5k');

  // Runner name (optional)
  const [runnerName, setRunnerName] = useState<string>('RUNNER 2569');
  const [copied, setCopied] = useState<boolean>(false);

  // Compute age and grouprun reactively
  // age = 2569 - ydate
  // grouprun = M-xx ปี หรือ F-xx ปี ตามเงื่อนไข
  const calculationResult = useMemo(() => {
    return computeBibDetails(sex, ydate, distance);
  }, [sex, ydate, distance]);

  // Reset form to defaults
  const handleReset = () => {
    setSex('ชาย');
    setYdate(2539);
    setDistance('5k');
    setRunnerName('RUNNER 2569');
  };

  // Copy bib summary to clipboard
  const handleCopySummary = async () => {
    const summary = [
      `--- ข้อมูลป้าย BIB ---`,
      `ชื่อป้าย: แสดงผล BIB`,
      `เพศ (sex): ${calculationResult.sex}`,
      `พ.ศ.เกิด (ydate): ${calculationResult.ydate ?? 'ไม่ระบุ'}`,
      `อายุ (age): ${calculationResult.age !== null ? calculationResult.age + ' ปี' : '-'}`,
      `ระยะวิ่ง (distance): ${calculationResult.distance}`,
      `รุ่น (grouprun): ${calculationResult.grouprun}`,
      `รายละเอียด: ${calculationResult.categoryDescription}`,
      `---------------------`
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-pink-50/50 to-sky-100/60 text-slate-800 flex flex-col justify-between selection:bg-pink-200 selection:text-pink-900">
      {/* Decorative Pastel Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl"></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-pink-100/80 px-4 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-300 via-pink-300 to-sky-300 p-0.5 shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-pink-500" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight font-bib flex items-center gap-2">
                <span>แสดงผล BIB</span>
                <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                  Pastel Edition
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                คำนวณอายุและรุ่นการแข่งขันอัตโนมัติ (ฐาน พ.ศ. 2569)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-reset-form"
              onClick={handleReset}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium flex items-center gap-1.5 transition-colors"
              title="รีเซ็ตข้อมูลเริ่มต้น"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">รีเซ็ต</span>
            </button>
            <span className="text-xs px-2.5 py-1 rounded-full bg-sky-100/80 text-sky-800 font-medium hidden md:inline-flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              แสดงอย่างเดียว ไม่บันทึกข้อมูล
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-6 md:py-8 w-full flex-grow">
        {/* Banner Alert: No Database Storage explicitly noted */}
        <div className="mb-6 p-3.5 rounded-xl bg-gradient-to-r from-sky-100/70 via-pink-100/60 to-sky-100/70 border border-sky-200/60 text-slate-700 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500 flex-shrink-0" />
            <span>
              <strong>ระบบจำลองป้าย BIB:</strong> คำนวณอายุอัตโนมัติจากสูตร <code className="font-mono bg-white/80 px-1 py-0.5 rounded text-pink-700 font-bold">2569 - พ.ศ.เกิด</code> พร้อมคำนวณรุ่น (grouprun) ทันที <strong>โดยแสดงผลอย่างเดียว ไม่เก็บลงฐานข้อมูล</strong>
            </span>
          </div>
          <span className="hidden lg:inline-block font-mono text-[11px] text-slate-500 bg-white/60 px-2 py-0.5 rounded">
            ปีเป้าหมาย 2569
          </span>
        </div>

        {/* 2-Column Responsive Grid: Form on Left, Live BIB Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-6 space-y-6">
            <BibForm
              sex={sex}
              onSexChange={setSex}
              ydate={ydate}
              onYdateChange={setYdate}
              distance={distance}
              onDistanceChange={setDistance}
              result={calculationResult}
              runnerName={runnerName}
              onRunnerNameChange={setRunnerName}
            />

            {/* Quick summary strip of all 5 user fields */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/80 text-xs shadow-xs">
              <h4 className="font-bold text-slate-700 mb-2.5 flex items-center justify-between">
                <span>สรุปรายละเอียด 5 ตัวแปรที่ระบุ:</span>
                <span className="font-mono text-[10px] text-slate-400">STATUS: READY</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">1. sex (เพศ)</span>
                  <span className="font-bold text-slate-800">{calculationResult.sex}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">2. ydate (พ.ศ.เกิด)</span>
                  <span className="font-bold text-slate-800">{calculationResult.ydate ?? '-'}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">3. age (อายุ)</span>
                  <span className="font-bold text-sky-700">{calculationResult.age !== null ? `${calculationResult.age} ปี` : '-'}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">4. distance (ระยะวิ่ง)</span>
                  <span className={`font-black ${calculationResult.distance === '5k' ? 'text-red-600' : 'text-sky-600'}`}>
                    {calculationResult.distance}
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 sm:col-span-2">
                  <span className="text-slate-400 block text-[10px]">5. grouprun (รุ่น)</span>
                  <span className={`font-bold font-bib text-sm ${
                    calculationResult.distance === '5k' ? 'text-red-500' : 'text-sky-500'
                  }`}>
                    {calculationResult.grouprun !== '-' ? calculationResult.grouprun : 'รอคำนวณ'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Visual BIB Card & Actions */}
          <div className="lg:col-span-6 flex flex-col items-center space-y-4">
            <div className="w-full flex items-center justify-between px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                ตัวอย่างป้าย BIB จำลอง (Live Preview)
              </span>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-copy-summary"
                  onClick={handleCopySummary}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1.5 transition-all shadow-xs"
                  title="คัดลอกรายละเอียด"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">คัดลอกแล้ว</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>คัดลอกข้อมูล</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  id="btn-print-bib"
                  onClick={handlePrint}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium flex items-center gap-1.5 transition-all shadow-xs"
                  title="พิมพ์ป้าย BIB หรือบันทึกเป็น PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>พิมพ์ / PDF</span>
                </button>
              </div>
            </div>

            {/* The Live Rendered BIB Card */}
            <div className="w-full flex justify-center py-2">
              <BibCard
                data={calculationResult}
                runnerName={runnerName}
              />
            </div>

            <p className="text-xs text-slate-500 text-center max-w-sm">
              💡 ป้าย BIB ปรับเปลี่ยนข้อมูลตามการเลือกเพศ, พ.ศ.เกิด, อายุ, ระยะ และรุ่น ทันทีแบบเรียลไทม์
            </p>
          </div>
        </div>

        {/* Bottom Section: Full Category Rules Reference Table */}
        <div className="mt-10">
          <RulesTable
            currentSex={sex}
            currentDistance={distance}
            currentAge={calculationResult.age}
            currentGroup={calculationResult.grouprun}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 px-4 bg-white/80 border-t border-pink-100 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 font-bib">แสดงผล BIB</span>
            <span>•</span>
            <span>ระยะ 5k (สีแดง) / 10 k (สีฟ้า)</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>คำนวณอายุและรุ่นอัตโนมัติ เกณฑ์ปี 2569</span>
            <span>•</span>
            <span className="text-pink-500">แสดงผลอย่างเดียวไม่เก็บข้อมูล</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
