import { writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { gunzip as gunzipCb } from 'node:zlib';
import { CedictParser } from './CedictParser';
import { download } from './download';

const gunzip = promisify(gunzipCb);

const EXPECTED_LICENSE = 'https://creativecommons.org/licenses/by-sa/4.0/';

export const main = async (sourceUrl: string, destinationPath: string) => {
  const zipped = await (await download(sourceUrl)).arrayBuffer();

  const unzipped = await gunzip(zipped);
  const text = unzipped.toString('utf8');

  const parsed = new CedictParser(text);

  const license = parsed.metadata.get('license');
  if (parsed.metadata.get('license') !== EXPECTED_LICENSE)
    throw new Error(`Unexpected license: ${license}`);

  const dictionaryDate = parsed.metadata.get('date');
  if (!dictionaryDate) throw new Error('Missing dictionary timestamp');

  const version = dictionaryDate.split('T')[0].replaceAll(/[^\d]/g, '');

  // eslint-disable-next-line no-console
  console.log({ version });

  await writeFile(destinationPath, JSON.stringify(parsed.entries));
};
