import { sqlErrors } from "./sqlConsts.mjs";
import { tokenTypes } from "./tokenizerConsts.js";
import { tokenMatchers } from "./tokenizerConsts.js";

export const tokenizer = (input) => {
    input = input.trim();
    const tokens = [];
    cursorLoop : for (let cursorPos = 0; cursorPos < input.length; cursorPos++) {
        const currString = input.slice(cursorPos);
        let matchedString;
        for (const tokenMatcher of tokenMatchers) {
            matchedString =  
            tokenMatcher.tokenType === tokenTypes.KEYWORD ?
            tokenMatcher.regex.exec(currString.toUpperCase()) :
            tokenMatcher.regex.exec(currString) ;
            if (!matchedString) continue;

            let cursorStart = cursorPos;
            //updates cursorPos (includes white-space)
            cursorPos += matchedString[0].length - 1;

            let matchedValue = matchedString[0].trim();
            switch(tokenMatcher.tokenType) {
                case tokenTypes.NUMBER :
                    matchedValue = Number(matchedValue);
                    break;
                case tokenTypes.DATE :
                    matchedValue = new Date(matchedValue);
                    break;
            }
            //trimdown quoted values
            if (['"',"'","`"].includes(matchedValue[0]) && ['"',"'","`"].includes(matchedValue[matchedValue.length - 1])) {
                matchedValue = matchedString[0].trim().slice(1, -1);
            }

            tokens.push (
                new Token(matchedValue, tokenMatcher.tokenType, cursorStart, cursorPos)
            )
            continue cursorLoop;
        }
        throw sqlErrors.UNKNOWN_TOKEN(cursorPos, currString);
    }
    return tokens;
}

class Token {
    constructor(value, type, start, end) {
        this.start = start;
        this.end = end;
        this.value = value;
        this.type = type;
    }
}