import { nextCompositeKeyWordsWord, equivalentKeywords } from "../sqlConsts.mjs"
import { tokenTypes } from "../tokenizer/tokenizerConsts.js"

export const compositeKeywordsBuilder = (inputtedTokens) => {
    const tokens = structuredClone(inputtedTokens)

    for (let i = 0; i < tokens.length; i++) {
        if ((tokens[i].type === tokenTypes.KEYWORD && nextCompositeKeyWordsWord[tokens[i].value]) &&
            (tokens[i + 1].type === tokenTypes.KEYWORD && nextCompositeKeyWordsWord[tokens[i].value][tokens[i + 1].value])) {
                tokens.splice(i, 2, {
                    type : tokenTypes.KEYWORD,
                    value : tokens[i].value + ' ' + tokens[i + 1].value,
                    start : tokens[i].start,
                    end : tokens[i + 1].end 
                })
                i--;
        }
    }
    return tokens
}

export const equivalentKeywordsTransformer = (tokens) => {
    for (const token of tokens) {

    }
}

export const postTokenizationProcessing = (inputtedTokens) => {
    let tokens = structuredClone(inputtedTokens);

    // fusion composite keywords token
    tokens = compositeKeywordsBuilder(tokens);
    // turns equivalent keyword into the base case : INNER JOIN -> JOIN
    tokens = equivalentKeywordsTransformer()
}