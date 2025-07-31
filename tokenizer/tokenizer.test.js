import { describe, expect, it } from 'vitest'
import { tokenizer } from './tokenizer.js'
import { sqlKeywords, sqlOperators, sqlSeparator, sqlSubQuery } from '../sqlConsts.mjs';
import { tokenTypes } from './tokenizerConsts.js';
import { tokenizerErrors } from './tokenizerConsts.js';

describe(tokenizer.name, () => {
  it("should tokenize keywords with token.type : keyword", () => {
    //ARRANGE
    const query = `${[...Object.values(sqlKeywords)].join(' ')}`;
    //ACT
    const tokens = tokenizer(query);
    let allTokensAreKeywords = true;
    for (const token of tokens) {
      if (token.type !== tokenTypes.KEYWORD) {
        allTokensAreKeywords = false;
        break;
      }
    }
    //ASSERT
    expect(allTokensAreKeywords).toBeTruthy()
  }) 
  it("should type as identifier 2 keywords without spaces between them", () => {
    //ARRANGE
    const query = `${sqlKeywords.SELECT}${sqlKeywords.FROM}`;
    //ACT
    const tokens = tokenizer(query);

    //ASSERT
    expect(tokens[0].type).toBe(tokenTypes.IDENTIFIER)
  }) 
  it("should tokenize operators with token.type : operator", () => {
    //ARRANGE
    const query = `${[...Object.values(sqlOperators)].join(' ')}`;
    //ACT
    const tokens = tokenizer(query);
    let allTokensAreKeywords = true;
    for (const token of tokens) {
      if (token.type !== tokenTypes.KEYWORD) {
        allTokensAreKeywords = false;
        break;
      }
    }

    //ASSERT
    expect(allTokensAreKeywords).toBeFalsy()
  }) 
  it("should not be able to tokenize operators without spaces between them", () => {
    //ARRANGE
    const query = `${[...Object.values(sqlOperators)].join('')}`;
    //ACT 

    //ASSERT
    expect(() => tokenizer(query)).toThrow(tokenizerErrors.UNKNOWN_TOKEN(0, query))
  }) 
  it("should tokenize separator with token.type : separator", () => {
    //ARRANGE
    const query = `${sqlSeparator}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[0].type).toBe(tokenTypes.SEPARATOR)
  }) 
  it("should tokenize separator with token.type : separator in 'SQLKEYWORD-SEPARATOR-SQLKEYWORD'", () => {
    //ARRANGE
    const query = `${sqlKeywords.SELECT}${sqlSeparator}${sqlKeywords.SELECT}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[1].type).toBe(tokenTypes.SEPARATOR)
  }) 
  it("should tokenize subquery_start with token.type : subquery_start", () => {
    //ARRANGE
    const query = `${sqlSubQuery.SUBQUERY_START}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[0].type).toBe(tokenTypes.SUBQUERY_START)
  }) 
  it("should tokenize subquery_start with token.type : subquery_start in 'SQLKEYWORD-subquery_start-SQLKEYWORD'", () => {
    //ARRANGE
    const query = `${sqlKeywords.SELECT}${sqlSubQuery.SUBQUERY_START}${sqlKeywords.SELECT}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[1].type).toBe(tokenTypes.SUBQUERY_START)
  }) 
  it("should tokenize subquery_end with token.type : subquery_end", () => {
    //ARRANGE
    const query = `${sqlSubQuery.SUBQUERY_END}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[0].type).toBe(tokenTypes.SUBQUERY_END)
  }) 
  it("shouldnt tokenize a number in 'SQLKEYWORD-NUMBER-SQLKEYWORD SQLKEYWORD'", () => {
    //ARRANGE
    const query = `${sqlKeywords.SELECT}${123}${sqlKeywords.SELECT} ${sqlKeywords.SELECT}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[1].type).toBe(tokenTypes.KEYWORD)
  }) 
  it("should tokenize numbers with token.type : DIRECT_VALUE and token.valueType = NUMBER in 'number'", () => {
    //ARRANGE
    const query = `${123}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[0].type).toBe(tokenTypes.DIRECT_VALUE)
    expect(tokens[0].valueType).toBe(tokenTypes.NUMBER)
  }) 
  it("should tokenize numbers with token.type : DIRECT_VALUE and token.valueType = NUMBER in 'SQLKEYWORD number'", () => {
    //ARRANGE
    const query = `${123} ${sqlKeywords.SELECT}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[0].type).toBe(tokenTypes.DIRECT_VALUE)
    expect(tokens[0].valueType).toBe(tokenTypes.NUMBER)
  }) 
  it("should tokenize identifier without single quotes with token.type : IDENTIFIER", () => {
    //ARRANGE
    const query = `NOTAKEYWORDAHAHAHAHAH`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[0].type).toBe(tokenTypes.IDENTIFIER)
    expect(tokens[0].value).toBe(query)
  })  
  it("should tokenize identifierwithout single quotes with token.type : IDENTIFIER in 'SQLKEYWORD identifier SQLKEYWORD'", () => {
    //ARRANGE
    const identifer = 'NOTAKEYWORD'
    const query = `${sqlKeywords.SELECT} ${identifer} ${sqlKeywords.FROM}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[1].value).toBe(identifer)
    expect(tokens[1].type).toBe(tokenTypes.IDENTIFIER)
  })
  it("should tokenize dates with single quotes with token.type : DIRECT_VALUE and valueType : DATE", () => {
    //ARRANGE
    const query = "'12-12-1212'";
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[0].type).toBe(tokenTypes.DIRECT_VALUE)
    expect(tokens[0].valueType).toBe(tokenTypes.DATE)
  })  
  it("should tokenize dates without single quotes with token.type : DIRECT_VALUE and valueType : DATE'", () => {
    //ARRANGE
    const date = "'12-12-1212'"
    const query = `${sqlKeywords.SELECT} ${date} ${sqlKeywords.FROM}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[1].type).toBe(tokenTypes.DIRECT_VALUE)
    expect(tokens[1].valueType).toBe(tokenTypes.DATE)
  })
  it("should tokenize strings with single quotes with token.type : DIRECT_VALUE and valueType : STRING", () => {
    //ARRANGE
    const query = "'this is a string'";
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[0].type).toBe(tokenTypes.DIRECT_VALUE)
    expect(tokens[0].valueType).toBe(tokenTypes.STRING)
  })  
  it("should tokenize strings without single quotes with token.type : DIRECT_VALUE and valueType : STRING'", () => {
    //ARRANGE
    const string = "'this is a string'"
    const query = `${sqlKeywords.SELECT} ${string} ${sqlKeywords.FROM}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[1].type).toBe(tokenTypes.DIRECT_VALUE)
    expect(tokens[1].valueType).toBe(tokenTypes.STRING)
  })
  it("should tokenize IDENTIFIER with backticks with token.type : IDENTIFIER", () => {
    //ARRANGE
    const query = '`this is an identifer`';
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[0].type).toBe(tokenTypes.IDENTIFIER)
  })  
  it("should tokenize IDENTIFIER with backticks with token.type : IDENTIFIER", () => {
    //ARRANGE
    const identifier = `this is an identifer`
    const query = `${sqlKeywords.SELECT} ${identifier} ${sqlKeywords.FROM}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[1].type).toBe(tokenTypes.IDENTIFIER)
  })
  it("should tokenize IDENTIFIER with double quotes with token.type : IDENTIFIER", () => {
    //ARRANGE
    const query = '"this is an identifer"';
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[0].type).toBe(tokenTypes.IDENTIFIER)
  })  
  it("should tokenize IDENTIFIER with double quotes with token.type : IDENTIFIER", () => {
    //ARRANGE
    const identifier = "this is an identifer"
    const query = `${sqlKeywords.SELECT} ${identifier} ${sqlKeywords.FROM}`;
    //ACT
    const tokens = tokenizer(query);
    
    //ASSERT
    expect(tokens[1].type).toBe(tokenTypes.IDENTIFIER)
  })
}) 
