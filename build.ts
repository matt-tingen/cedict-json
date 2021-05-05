import fs from 'fs/promises';
import path from 'path';
import { CedictEntry } from '.';

const entryRegex = /([^ ]+) ([^ ]+) \[([^\]]+)\] \/(.+)\//;

const parseEntry = (line: string): CedictEntry => {
  const match = line.match(entryRegex);

  if (!match) throw new Error('Unknown line format: ' + line);

  const [, traditional, simplified, pinyin, joinedEnglish] = match;
  const english = joinedEnglish.split('/');

  return { traditional, simplified, pinyin, english };
};

const main = async () => {
  const dictPath = path.resolve(__dirname, 'cedict.txt');
  const fileBuffer = await fs.readFile(dictPath);
  const lines = fileBuffer.toString().split('\n');
  const entryCount = parseInt(
    lines
      .find((line) => line.startsWith('#! entries='))
      ?.replace('#! entries=', '') ?? '',
    10,
  );
  const entries = lines.filter((line) => !line.startsWith('#')).map(parseEntry);

  if (entries.length !== entryCount)
    throw new Error(`Expected ${entryCount} entries, found ${entries.length}`);

  const jsonPath = path.resolve(__dirname, 'cedict.json');

  await fs.writeFile(jsonPath, JSON.stringify(entries));
};

main();
