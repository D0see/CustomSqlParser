import { sqlKeywords, sqlOperators, sqlSeparator, sqlSubQuery } from './sqlConsts.mjs'

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
}

const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const keywordRegexCapturingGroup = Object.values(sqlKeywords).map(escape).reduce((acc, keyword) => {
            acc += acc ? `|${keyword}` : `(${keyword}`;
            return acc;
        },'') + ')';
const keywordRegex = new RegExp(`^${keywordRegexCapturingGroup}(?=\\s|$|\\(|\\)|,)`, 'i');

const operatorRegexCapturingGroup = Object.values(sqlOperators).reduce((acc, operator) => {
            acc += acc ? `|${operator}` : `(${operator}`;
            return acc;
        },'') + ')';
const operatorRegex = new RegExp(`^${operatorRegexCapturingGroup}(?=\\s|$|\\(|\\)|,)`);

const separatorRegex = new RegExp(`^${sqlSeparator}`);

const subQueryStartRegex = new RegExp(`^${escape(sqlSubQuery.SUBQUERY_START)}`);

const subQueryEndRegex = new RegExp(`^${escape(sqlSubQuery.SUBQUERY_END)}`);

export const tokenMatchers = [
    {tokenType : tokenTypes.KEYWORD, regex : keywordRegex},
    {tokenType : tokenTypes.SEPARATOR, regex : separatorRegex},
    //SUBQUERY START AND END BEFORE KEYWORD
    {tokenType : tokenTypes.SUBQUERY_START, regex : subQueryStartRegex},
    {tokenType : tokenTypes.SUBQUERY_END, regex : subQueryEndRegex},
    {tokenType : tokenTypes.OPERATOR, regex : operatorRegex},
    //NUMBER BEFORE IDENTIFER
    {tokenType : tokenTypes.NUMBER, regex : /^\d+(?=\s|$|\(|\)|,)/},
    {tokenType : tokenTypes.IDENTIFIER, regex : /^\w+(?=\s|$|\(|\)|,)/},
    {tokenType : tokenTypes.IDENTIFIER, regex : /^"\w*[^"]*.(?=\s|$|\(|\)|,)/},
    {tokenType : tokenTypes.IDENTIFIER, regex : /^`\w*[^`]*.(?=\s|$|\(|\)|,)/},
    //DATE BEFORE STRING
    {tokenType : tokenTypes.DATE, regex : /^'[0-9]{2}-[0-9]{2}-[0-9]{4}'(?=\s|$|\(|\)|,)/},
    {tokenType : tokenTypes.STRING, regex : /^'[^']*.(?=\s|$|\(|\)|,)/},
]

export const tokenizerErrors = {
    'UNKNOWN_TOKEN' : (index, currString) => new Error(`couldn't identify token at ${index} ->${currString}`),
}