import { sqlKeywords, sqlNull, sqlOperators, sqlSeparator, sqlSubQuery } from '../sqlConsts.mjs'

export const tokenTypes = {
    'SEPARATOR' : 'SEPARATOR',
    'KEYWORD' : 'KEYWORD',
    'OPERATOR' : 'OPERATOR',
    'IDENTIFIER' : 'IDENTIFIER',
    'DIRECT_VALUE' : "DIRECT_VALUE",
    'NUMBER' : 'NUMBER',
    'STRING' : 'STRING',
    'DATE' : 'DATE',
    'SUBQUERY_START' : 'SUBQUERY_START',
    'SUBQUERY_END' : 'SUBQUERY_END',
    'ALL_COLUMS_SELECTOR' : 'ALL_COLUMS_SELECTOR',
    'NULL' : 'NULL'
}

//escapes all regex keychar
const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

//lookahead for locating the match end
const positiveLookaheadMatchEnd = `(?=\\s|$|${escape(sqlSubQuery.SUBQUERY_START)}|${escape(sqlSubQuery.SUBQUERY_END)}|${escape(sqlSeparator)})`

const keywordRegexCapturingGroup = Object.values(sqlKeywords).map(escape).reduce((acc, keyword) => {
            acc += acc ? `|${keyword}` : `(${keyword}`;
            return acc;
        },'') + ')';
const keywordRegex = new RegExp(`^${keywordRegexCapturingGroup}${positiveLookaheadMatchEnd}`);
const operatorRegexCapturingGroup = Object.values(sqlOperators).map(escape).reduce((acc, operator) => {
            acc += acc ? `|${operator}` : `(${operator}`;
            return acc;
        },'') + ')';
const operatorRegex = new RegExp(`^${operatorRegexCapturingGroup}${positiveLookaheadMatchEnd}`);
const separatorRegex = new RegExp(`^${escape(sqlSeparator)}`);
const subQueryStartRegex = new RegExp(`^${escape(sqlSubQuery.SUBQUERY_START)}`);
const subQueryEndRegex = new RegExp(`^${escape(sqlSubQuery.SUBQUERY_END)}`);
const numberRegex = new RegExp(`^\\d+${positiveLookaheadMatchEnd}`);
const identifierPlainRegex = new RegExp(`^\\w+${positiveLookaheadMatchEnd}`);
const identiferDoubleQuoteRegex = new RegExp(`^"\\w*[^"]*"{1}${positiveLookaheadMatchEnd}`);
const identifierBackTickRegex = new RegExp(`^\`\\w*[^\`]*\`{1}${positiveLookaheadMatchEnd}`);
const dateSingleQuoteRegex = new RegExp(`^'[0-9]{2}-[0-9]{2}-[0-9]{4}'${positiveLookaheadMatchEnd}`);
const stringRegex = new RegExp(`^'[^']*'{1}${positiveLookaheadMatchEnd}`);
const allColumnsSelectorRegex = new RegExp(`^\\*{1}${positiveLookaheadMatchEnd}`);
const nullRegex = new RegExp(`^${escape(sqlNull)}${positiveLookaheadMatchEnd}`);

//DO NOT TOUCH

export const tokenMatchers = [
    {tokenType : tokenTypes.KEYWORD, regex : keywordRegex},
    {tokenType : tokenTypes.SEPARATOR, regex : separatorRegex},
    {tokenType : tokenTypes.OPERATOR, regex : operatorRegex},
    //SUBQUERY START AND END BEFORE KEYWORD
    {tokenType : tokenTypes.SUBQUERY_START, regex : subQueryStartRegex},
    {tokenType : tokenTypes.SUBQUERY_END, regex : subQueryEndRegex},
    //NULL BEFORE IDENTIFIER
    {tokenType : tokenTypes.DIRECT_VALUE, valueType : tokenTypes.NULL, regex : nullRegex},
    //NUMBER BEFORE IDENTIFER
    {tokenType : tokenTypes.DIRECT_VALUE, valueType : tokenTypes.NUMBER, regex : numberRegex},
    {tokenType : tokenTypes.IDENTIFIER, regex : identifierPlainRegex},
    {tokenType : tokenTypes.IDENTIFIER, regex : identiferDoubleQuoteRegex},
    {tokenType : tokenTypes.IDENTIFIER, regex : identifierBackTickRegex},
    //DATE BEFORE STRING
    {tokenType : tokenTypes.DIRECT_VALUE, valueType : tokenTypes.DATE, regex : dateSingleQuoteRegex},
    {tokenType : tokenTypes.DIRECT_VALUE, valueType : tokenTypes.STRING, regex : stringRegex},
    {tokenType : tokenTypes.ALL_COLUMS_SELECTOR, regex : allColumnsSelectorRegex},
]

export const tokenizerErrors = {
    'UNKNOWN_TOKEN' : (index, currString) => new Error(`couldn't identify token at ${index} ->${currString}`),
}