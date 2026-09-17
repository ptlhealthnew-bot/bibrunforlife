import { SexType, DistanceType, BibCalculationResult, CategoryRule } from '../types';

/**
 * คำนวณอายุ: age = 2569 - ydate
 */
export function calculateAge(ydate: number | ''): number | null {
  if (typeof ydate !== 'number' || isNaN(ydate)) {
    return null;
  }
  return 2569 - ydate;
}

/**
 * คำนวณรุ่น (grouprun):
 * ปรับตามความต้องการ: ตัดคำว่า "ปี" ออก เป็นตัวอย่างเช่น "M-30", "F-30"
 * และแยกอักษร (groupLetter: M/F) กับ ตัวเลข (groupNumber: 60/50/40/30/20/1)
 *
 * เงื่อนไข 24 รูปแบบ:
 * ชาย/หญิง x 5k/10 k x 6 ช่วงอายุ
 * - age > 59: "60"
 * - age 50 - 59: "50"
 * - age 40 - 49: "40"
 * - age 30 - 39: "30"
 * - age 20 - 29: "20"
 * - age < 20: "1"
 */
export function calculateGroupRun(
  sex: SexType,
  distance: DistanceType,
  age: number | null
): { grouprun: string; groupLetter: string; groupNumber: string; description: string } {
  if (age === null || age < 0) {
    return { grouprun: '-', groupLetter: '-', groupNumber: '-', description: 'ระบุ พ.ศ.เกิด เพื่อคำนวณรุ่น' };
  }

  const letter = sex === 'ชาย' ? 'M' : 'F';
  let groupNumber = '';
  let description = '';

  if (age > 59) {
    groupNumber = '60';
    description = `อายุ 60 ปีขึ้นไป (${letter}-${groupNumber})`;
  } else if (age >= 50 && age <= 59) {
    groupNumber = '50';
    description = `อายุ 50 - 59 ปี (${letter}-${groupNumber})`;
  } else if (age >= 40 && age <= 49) {
    groupNumber = '40';
    description = `อายุ 40 - 49 ปี (${letter}-${groupNumber})`;
  } else if (age >= 30 && age <= 39) {
    groupNumber = '30';
    description = `อายุ 30 - 39 ปี (${letter}-${groupNumber})`;
  } else if (age >= 20 && age <= 29) {
    groupNumber = '20';
    description = `อายุ 20 - 29 ปี (${letter}-${groupNumber})`;
  } else {
    // age < 20
    groupNumber = '1';
    description = `อายุต่ำกว่า 20 ปี (${letter}-${groupNumber})`;
  }

  return {
    grouprun: `${letter}-${groupNumber}`,
    groupLetter: letter,
    groupNumber,
    description,
  };
}

export function computeBibDetails(
  sex: SexType,
  ydate: number | '',
  distance: DistanceType
): BibCalculationResult {
  const age = calculateAge(ydate);
  const isValid = age !== null && age >= 0 && age <= 130;
  const { grouprun, groupLetter, groupNumber, description } = calculateGroupRun(sex, distance, isValid ? age : null);

  return {
    sex,
    ydate: typeof ydate === 'number' ? ydate : null,
    age: isValid ? age : null,
    distance,
    grouprun,
    groupLetter,
    groupNumber,
    categoryDescription: description,
    isValid,
  };
}

export const ALL_RULES: CategoryRule[] = [
  // ชาย 5k
  { sex: 'ชาย', distance: '5k', ageRange: 'อายุ > 59 ปี', minAge: 60, maxAge: 150, grouprun: 'M-60', groupLetter: 'M', groupNumber: '60' },
  { sex: 'ชาย', distance: '5k', ageRange: 'อายุ 50-59 ปี', minAge: 50, maxAge: 59, grouprun: 'M-50', groupLetter: 'M', groupNumber: '50' },
  { sex: 'ชาย', distance: '5k', ageRange: 'อายุ 40-49 ปี', minAge: 40, maxAge: 49, grouprun: 'M-40', groupLetter: 'M', groupNumber: '40' },
  { sex: 'ชาย', distance: '5k', ageRange: 'อายุ 30-39 ปี', minAge: 30, maxAge: 39, grouprun: 'M-30', groupLetter: 'M', groupNumber: '30' },
  { sex: 'ชาย', distance: '5k', ageRange: 'อายุ 20-29 ปี', minAge: 20, maxAge: 29, grouprun: 'M-20', groupLetter: 'M', groupNumber: '20' },
  { sex: 'ชาย', distance: '5k', ageRange: 'อายุ < 20 ปี', minAge: 0, maxAge: 19, grouprun: 'M-1', groupLetter: 'M', groupNumber: '1' },

  // หญิง 5k
  { sex: 'หญิง', distance: '5k', ageRange: 'อายุ > 59 ปี', minAge: 60, maxAge: 150, grouprun: 'F-60', groupLetter: 'F', groupNumber: '60' },
  { sex: 'หญิง', distance: '5k', ageRange: 'อายุ 50-59 ปี', minAge: 50, maxAge: 59, grouprun: 'F-50', groupLetter: 'F', groupNumber: '50' },
  { sex: 'หญิง', distance: '5k', ageRange: 'อายุ 40-49 ปี', minAge: 40, maxAge: 49, grouprun: 'F-40', groupLetter: 'F', groupNumber: '40' },
  { sex: 'หญิง', distance: '5k', ageRange: 'อายุ 30-39 ปี', minAge: 30, maxAge: 39, grouprun: 'F-30', groupLetter: 'F', groupNumber: '30' },
  { sex: 'หญิง', distance: '5k', ageRange: 'อายุ 20-29 ปี', minAge: 20, maxAge: 29, grouprun: 'F-20', groupLetter: 'F', groupNumber: '20' },
  { sex: 'หญิง', distance: '5k', ageRange: 'อายุ < 20 ปี', minAge: 0, maxAge: 19, grouprun: 'F-1', groupLetter: 'F', groupNumber: '1' },

  // ชาย 10 k
  { sex: 'ชาย', distance: '10 k', ageRange: 'อายุ > 59 ปี', minAge: 60, maxAge: 150, grouprun: 'M-60', groupLetter: 'M', groupNumber: '60' },
  { sex: 'ชาย', distance: '10 k', ageRange: 'อายุ 50-59 ปี', minAge: 50, maxAge: 59, grouprun: 'M-50', groupLetter: 'M', groupNumber: '50' },
  { sex: 'ชาย', distance: '10 k', ageRange: 'อายุ 40-49 ปี', minAge: 40, maxAge: 49, grouprun: 'M-40', groupLetter: 'M', groupNumber: '40' },
  { sex: 'ชาย', distance: '10 k', ageRange: 'อายุ 30-39 ปี', minAge: 30, maxAge: 39, grouprun: 'M-30', groupLetter: 'M', groupNumber: '30' },
  { sex: 'ชาย', distance: '10 k', ageRange: 'อายุ 20-29 ปี', minAge: 20, maxAge: 29, grouprun: 'M-20', groupLetter: 'M', groupNumber: '20' },
  { sex: 'ชาย', distance: '10 k', ageRange: 'อายุ < 20 ปี', minAge: 0, maxAge: 19, grouprun: 'M-1', groupLetter: 'M', groupNumber: '1' },

  // หญิง 10 k
  { sex: 'หญิง', distance: '10 k', ageRange: 'อายุ > 59 ปี', minAge: 60, maxAge: 150, grouprun: 'F-60', groupLetter: 'F', groupNumber: '60' },
  { sex: 'หญิง', distance: '10 k', ageRange: 'อายุ 50-59 ปี', minAge: 50, maxAge: 59, grouprun: 'F-50', groupLetter: 'F', groupNumber: '50' },
  { sex: 'หญิง', distance: '10 k', ageRange: 'อายุ 40-49 ปี', minAge: 40, maxAge: 49, grouprun: 'F-40', groupLetter: 'F', groupNumber: '40' },
  { sex: 'หญิง', distance: '10 k', ageRange: 'อายุ 30-39 ปี', minAge: 30, maxAge: 39, grouprun: 'F-30', groupLetter: 'F', groupNumber: '30' },
  { sex: 'หญิง', distance: '10 k', ageRange: 'อายุ 20-29 ปี', minAge: 20, maxAge: 29, grouprun: 'F-20', groupLetter: 'F', groupNumber: '20' },
  { sex: 'หญิง', distance: '10 k', ageRange: 'อายุ < 20 ปี', minAge: 0, maxAge: 19, grouprun: 'F-1', groupLetter: 'F', groupNumber: '1' },
];
