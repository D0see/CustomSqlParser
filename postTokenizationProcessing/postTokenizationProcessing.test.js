import { describe, expect, it } from 'vitest'
import { compositeKeywordsBuilder } from './postTokenizationProcessing.js'
import { tokenTypes } from '../tokenizer/tokenizerConsts.js';
import { sqlKeywords } from '../sqlConsts.mjs';

describe(compositeKeywordsBuilder.name + '> functional tests', () => {
  it("BASIC COMPOSITE KEYWORD TOKENS 1 -- should be properly tokenized into a single keyword", () => {
    //ARRANGE
    const tokens = [{type : tokenTypes.KEYWORD, value : sqlKeywords.LEFT},
                    {type : tokenTypes.KEYWORD, value : sqlKeywords.OUTER},
                    {type : tokenTypes.KEYWORD, value : sqlKeywords.JOIN}];
    //ACT
    const result = compositeKeywordsBuilder(tokens);
    
    //ASSERT
    expect(JSON.stringify(result)).toStrictEqual('[{"type":"KEYWORD","value":"LEFT OUTER JOIN"}]')
  })
})