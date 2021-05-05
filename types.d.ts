export interface CedictEntry {
  traditional: string;
  simplified: string;
  pinyin: string;
  english: string[];
}

declare const entries: CedictEntry[];
export = entries;
