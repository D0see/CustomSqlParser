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
  it("BASIC QUERY 2 -- should be properly tokenized", () => {
    //ARRANGE
    const query = "SELECT * FROM (select firstName, LastName from people) WHERE firstName = 'John'";
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(JSON.stringify(tokens)).toStrictEqual('[{"value":"SELECT","type":"KEYWORD","start":0,"end":6},{"value":"*","type":"ALL_COLUMS_SELECTOR","start":7,"end":8},{"value":"FROM","type":"KEYWORD","start":9,"end":13},{"value":"(","type":"SUBQUERY_START","start":14,"end":15},{"value":"SELECT","type":"KEYWORD","start":15,"end":21},{"value":"firstName","type":"IDENTIFIER","start":22,"end":31},{"value":",","type":"SEPARATOR","start":31,"end":32},{"value":"LastName","type":"IDENTIFIER","start":33,"end":41},{"value":"FROM","type":"KEYWORD","start":42,"end":46},{"value":"people","type":"IDENTIFIER","start":47,"end":53},{"value":")","type":"SUBQUERY_END","start":53,"end":54},{"value":"WHERE","type":"KEYWORD","start":55,"end":60},{"value":"firstName","type":"IDENTIFIER","start":61,"end":70},{"value":"=","type":"OPERATOR","start":71,"end":72},{"value":"John","type":"DIRECT_VALUE","valueType":"STRING","start":73,"end":79}]')
  })
})