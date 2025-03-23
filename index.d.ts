interface CedictEntry {
  traditional: string;
  simplified: string;
  pinyin: string;
  english: string[];
}

declare const cedict: CedictEntry[];

export default cedict;
export { type CedictEntry };
