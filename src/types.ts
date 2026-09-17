export type SexType = 'ชาย' | 'หญิง';
export type DistanceType = '5k' | '10 k';

export interface BibFormData {
  sex: SexType;
  ydate: number | '';
  distance: DistanceType;
  runnerName?: string;
}

export interface BibCalculationResult {
  sex: SexType;
  ydate: number | null;
  age: number | null;
  distance: DistanceType;
  grouprun: string; // e.g. "M-30" (ไม่มีคำว่า "ปี")
  groupLetter: string; // e.g. "M" หรือ "F"
  groupNumber: string; // e.g. "30", "60", "50", "40", "20", "1"
  categoryDescription: string;
  isValid: boolean;
}

export interface CategoryRule {
  sex: SexType;
  distance: DistanceType;
  ageRange: string;
  minAge: number;
  maxAge: number;
  grouprun: string;
  groupLetter: string;
  groupNumber: string;
}
