import { describe, expect, it } from 'vitest'
import { tokenizer } from './tokenizer.js'

describe(tokenizer.name + '> functional tests', () => {
  it("BASIC QUERY 1 -- should be properly tokenized", () => {
    //ARRANGE
    const query = "SELECT * FROM table1 WHERE firstName = 'John'";
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(JSON.stringify(tokens)).toStrictEqual('[{"value":"SELECT","type":"KEYWORD","start":0,"end":6},{"value":"*","type":"ALL_COLUMS_SELECTOR","start":7,"end":8},{"value":"FROM","type":"KEYWORD","start":9,"end":13},{"value":"table1","type":"IDENTIFIER","start":14,"end":20},{"value":"WHERE","type":"KEYWORD","start":21,"end":26},{"value":"firstName","type":"IDENTIFIER","start":27,"end":36},{"value":"=","type":"OPERATOR","start":37,"end":38},{"value":"John","type":"DIRECT_VALUE","valueType":"STRING","start":39,"end":45}]')
  })
})