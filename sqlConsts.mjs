//MODIFYABLE SQL KEYWORDS

export const sqlKeywords = {
    'SELECT' : 'SELECT',
    'LEFT_JOIN' : 'LEFT JOIN',
    'RIGHT_JOIN' : 'RIGHT JOIN',
    'INNER_JOIN' : 'INNER JOIN',
    'LEFT_OUTER_JOIN' : 'LEFT OUTER JOIN',
    'RIGHT_OUTER_JOIN' : 'RIGHT OUTER JOIN',
    'FULL_OUTER_JOIN' : 'FULL OUTER JOIN',
    'FULL_JOIN' : 'FULL JOIN',
    'FULL' : 'FULL',
    'OUTER' : 'OUTER', 
    'LEFT' : 'LEFT',
    'RIGHT' : 'RIGHT',
    'INNER' : 'INNER',
    'JOIN' : 'JOIN',
    'ALIAS_ASSIGNEMENT' : 'AS',
    'ON' : 'ON',
    'FROM' : 'FROM',
    'WHERE' : 'WHERE',
    'LIMIT' : 'LIMIT',
    'ORDER_BY' :'ORDER BY',
    'ORDER' : 'ORDER',
    'BY' : 'BY',
    'ASC' : 'ASC',
    'DESC' : 'DESC'
}

export const allColumnsSelector = '*'

export const sqlSubQuery = {
    'SUBQUERY_START' : '(',
    'SUBQUERY_END' : ')'
}

export const sqlSeparator = ','

export const multipleConditionnalKeyword = 'AND';

export const sqlTypes = {
    'NUMBER' : 'NUMBER',
    'DATETIME' : 'DATETIME',
    'VARCHAR' : 'VARCHAR',
    'NULL' : 'null'
}

export const sqlOperators = { 
    'EQUAL' : '=',
    'DIFFERENT_FROM' : '!=',
    'STRICTLY_INFERIOR' : '<',
    'STRICTLY_SUPERIOR' : '>',
    'INFERIOR_OR_EQUAL' : '<=',
    'SUPERIOR_OR_EQUAL' : '>=',
}

export const sqlOperatorsJsEquivalent = {
    [sqlOperators.EQUAL] : '===',
    [sqlOperators.DIFFERENT_FROM] : '!=',
    [sqlOperators.STRICTLY_INFERIOR] : '<',
    [sqlOperators.STRICTLY_SUPERIOR] : '>',
    [sqlOperators.INFERIOR_OR_EQUAL] : '<=',
    [sqlOperators.SUPERIOR_OR_EQUAL] : '>=',
}

export const sqlErrors = {
    'MISSING_TABLE_NAME_AFTER' : (precedingKeyword) => new Error(`expected a table name after ${precedingKeyword}`),
    'MISSING_VALUE_AFTER' : (precedingKeyword) => new Error(`expected a value after ${precedingKeyword}`),
    'MISSING_OPERATOR_AFTER' : (precedingValue) => new Error(`expected an operator after ${precedingValue}`),
    'MISSING_COLUMN_NAME_AFTER' : (precedingKeyword) => new Error(`expected a column name after ${precedingKeyword}`),
    'MISSING_JOIN_KEYWORD' : () => new Error(`expected a join Keyword`),
    'MISSING_DELIMITER' : (delimiter) => new Error(`missing or extra ${delimiter}`),
    'TABLE_NOT_FOUND' : (tableName) => new Error(`No table with name : ${tableName}`),
    'ALIAS_INVALID_OR_ABSENT' : (tableName) => new Error(`Invalid or absent alias for table with name : ${tableName}`),
    'ALIAS_NAME_COLLISION' : (alias) => new Error(`Name collision for alias : ${alias}`),
    'TABLE_NAME_AMBIGUOUS' : (tableName) => new Error(`ambiguous result for tableName : ${tableName}`),
    'COLUMN_NAME_AMBIGUOUS' : (columnName) => new Error(`ambiguous result for columnName : ${columnName}`),
    'COLUMN_NOT_FOUND' : (columnName) => new Error('Couldnt find column head : ' + `${columnName}`),
    'MISSING_KEYWORD' : (keyword) => new Error(`missing ${keyword} keyword`),
    'DIFFERENT_VALUE_TYPES_COMPARISON' : (type1, type2) => new Error(`cant compare values of different types ${type1}-${type2}`),
    'INVALID_COMPARISON_OPERATOR' : (invalidOperator) => new Error(`${invalidOperator} is not a valid comparison operator`),
    'WRONGLY_PLACED_KEYWORD' : (keyword) => new Error(`${keyword} is placed at the wrong place`),
    'EXPECTED' : (expected, received) => new Error(`expected ${expected} instead received ${received}`),
    'WRONG_DATATYPE' : (expected, received) => new Error(`expected value of dataType ${expected} instead received value ${received}`),
}

// AUTO GENERATED DO NOT TOUCH

export const reservedKeywords = Object.values(sqlKeywords).reduce((acc, val) => {
        acc[val] = true;
        return acc;
    }, {});
reservedKeywords[multipleConditionnalKeyword] = true;

export const nextCompositeKeyWordsWord = {
    [sqlKeywords.LEFT] : {
        [sqlKeywords.JOIN] : true,
        [sqlKeywords.OUTER] : true,
    },
    [sqlKeywords.RIGHT] : {
        [sqlKeywords.JOIN] : true,
        [sqlKeywords.OUTER] : true,
    },
    [sqlKeywords.LEFT + ' ' + sqlKeywords.OUTER] : {[sqlKeywords.JOIN] : true,},
    [sqlKeywords.RIGHT + ' ' + sqlKeywords.OUTER] : {[sqlKeywords.JOIN] : true,},
    [sqlKeywords.INNER] : {[sqlKeywords.JOIN] : true,},
    [sqlKeywords.FULL] : {
        [sqlKeywords.OUTER] : true,
        [sqlKeywords.JOIN] : true,
    },
    [sqlKeywords.FULL + ' ' + sqlKeywords.OUTER] : {[sqlKeywords.JOIN] : true},
    [sqlKeywords.ORDER] : {[sqlKeywords.BY] : true},
}

export const joinKeywords = {
    [sqlKeywords.LEFT_JOIN] : true,
    [sqlKeywords.INNER_JOIN] : true,
    [sqlKeywords.FULL_JOIN] : true,
}

export const equivalentKeywords = {
    [sqlKeywords.JOIN] : sqlKeywords.INNER_JOIN,
    [sqlKeywords.LEFT_OUTER_JOIN] : sqlKeywords.LEFT_JOIN,
    [sqlKeywords.RIGHT_OUTER_JOIN] : sqlKeywords.RIGHT_JOIN,
    [sqlKeywords.FULL_OUTER_JOIN] : sqlKeywords.FULL_JOIN,
}

export const sqlConsts = {
    sqlKeywords,
    sqlErrors,
    multipleConditionnalKeyword,
    sqlTypes,
    sqlOperators,
    sqlOperatorsJsEquivalent,
    reservedKeywords,
    nextCompositeKeyWordsWord,
    joinKeywords,
    equivalentKeywords,
}