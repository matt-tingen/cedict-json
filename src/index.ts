import path from 'node:path';
import { main } from './main';

const GZIP_URL =
  'https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz';

const destinationPath = path.join(import.meta.dirname, '..', 'cedict.json');

void main(GZIP_URL, destinationPath);
