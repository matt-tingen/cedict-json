import { CedictEntry } from './types';

export class CedictParser {
  private static entryRegex = /([^ ]+) ([^ ]+) \[([^\]]+)\] \/(.+)\//;

  public entries: CedictEntry[] = [];
  public metadata = new Map<string, string>();

  constructor(text: string) {
    this.parse(text);
  }

  private handleMetadata(line: string) {
    const [key, value] = line.replace('#! ', '').split('=');

    this.metadata.set(key, value);
  }

  private handleEntry(line: string) {
    const match = line.match(CedictParser.entryRegex);

    if (!match) throw new Error('Unknown line format: ' + line);

    const [, traditional, simplified, pinyin, joinedEnglish] = match;
    const english = joinedEnglish.split('/');

    this.entries.push({
      traditional,
      simplified,
      pinyin,
      english,
    });
  }

  private handleLine(line: string) {
    if (line.startsWith('#!')) {
      this.handleMetadata(line);
    } else if (line.startsWith('#')) {
      // Ignore non-metadata comments
    } else {
      this.handleEntry(line);
    }
  }

  private validate() {
    const entriesMetadata = this.metadata.get('entries');
    if (!entriesMetadata) throw new Error('Missing entries metadata');

    const expectedEntries = Number.parseInt(entriesMetadata, 10);
    if (Number.isNaN(expectedEntries))
      throw new Error('Invalid entries metadata');

    if (this.entries.length !== expectedEntries)
      throw new Error(
        `Expected ${expectedEntries} entries, found ${this.entries.length}`,
      );
  }

  private parse(text: string): void {
    const lines = text.toString().split(/\r?\n/g);

    for (const line of lines) {
      this.handleLine(line);
    }

    this.validate();
  }
}
