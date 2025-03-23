# CEDICT JSON

A JSON-compatible representation of the [CC-CEDICT Chinese-English dictionary](https://www.mdbg.net/chinese/dictionary?page=cc-cedict).

## Usage

```sh
npm install cedict-json
```

The default export is an array of objects, each corresponding to an entry in the dictionary. For example:

```json
{
  "traditional": "電子詞典",
  "simplified": "电子词典",
  "pinyin": "dian4 zi3 ci2 dian3",
  "english": ["electronic dictionary"]
}
```

Some entries have multiple English definitions:

```json
{
  "traditional": "多多",
  "simplified": "多多",
  "pinyin": "duo1 duo1",
  "english": ["many", "much", "a lot", "lots and lots", "more", "even more"]
}
```
