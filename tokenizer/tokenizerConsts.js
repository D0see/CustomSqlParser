import { sqlKeywords, sqlOperators, sqlSeparator, sqlSubQuery } from '../sqlConsts.mjs'

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

//escapes all regex keychar
const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

//lookahead for locating the match end
const postiveLookaheadMatchEnd = `(?=\\s|$|${escape(sqlSubQuery.SUBQUERY_START)}|${escape(sqlSubQuery.SUBQUERY_END)}|${escape(sqlSeparator)})`

const keywordRegexCapturingGroup = Object.values(sqlKeywords).map(escape).reduce((acc, keyword) => {
            acc += acc ? `|${keyword}` : `(${keyword}`;
            return acc;
        },'') + ')';
const keywordRegex = new RegExp(`^${keywordRegexCapturingGroup}${postiveLookaheadMatchEnd}`);
const operatorRegexCapturingGroup = Object.values(sqlOperators).reduce((acc, operator) => {
            acc += acc ? `|${operator}` : `(${operator}`;
            return acc;
        },'') + ')';
const operatorRegex = new RegExp(`^${operatorRegexCapturingGroup}${postiveLookaheadMatchEnd}`);
const separatorRegex = new RegExp(`^${sqlSeparator}`);
const subQueryStartRegex = new RegExp(`^${escape(sqlSubQuery.SUBQUERY_START)}`);
const subQueryEndRegex = new RegExp(`^${escape(sqlSubQuery.SUBQUERY_END)}`);
const numberRegex = new RegExp(`^\\d+${postiveLookaheadMatchEnd}`);
const identifierPlainRegex = new RegExp(`^\\w+${postiveLookaheadMatchEnd}`);
const identiferDoubleQuoteRegex = new RegExp(`^"\\w*[^"]*"{1}${postiveLookaheadMatchEnd}`);
const identifierBackTickRegex = new RegExp(`^\`\\w*[^\`]*\`{1}${postiveLookaheadMatchEnd}`);
const dateSingleQuoteRegex = new RegExp(`^'[0-9]{2}-[0-9]{2}-[0-9]{4}'${postiveLookaheadMatchEnd}`);
const stringRegex = new RegExp(`^'[^']*'{1}${postiveLookaheadMatchEnd}`);

//DO NOT TOUCH

export const tokenMatchers = [
    {tokenType : tokenTypes.KEYWORD, regex : keywordRegex},
    {tokenType : tokenTypes.SEPARATOR, regex : separatorRegex},
    {tokenType : tokenTypes.OPERATOR, regex : operatorRegex},
    //SUBQUERY START AND END BEFORE KEYWORD
    {tokenType : tokenTypes.SUBQUERY_START, regex : subQueryStartRegex},
    {tokenType : tokenTypes.SUBQUERY_END, regex : subQueryEndRegex},
    //NUMBER BEFORE IDENTIFER
    {tokenType : tokenTypes.NUMBER, regex : numberRegex},
    {tokenType : tokenTypes.IDENTIFIER, regex : identifierPlainRegex},
    {tokenType : tokenTypes.IDENTIFIER, regex : identiferDoubleQuoteRegex},
    {tokenType : tokenTypes.IDENTIFIER, regex : identifierBackTickRegex},
    //DATE BEFORE STRING
    {tokenType : tokenTypes.DATE, regex : dateSingleQuoteRegex},
    {tokenType : tokenTypes.STRING, regex : stringRegex},
]

export const tokenizerErrors = {
    'UNKNOWN_TOKEN' : (index, currString) => new Error(`couldn't identify token at ${index} ->${currString}`),
}