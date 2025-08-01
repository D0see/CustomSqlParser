import { tokenTypes, tokenizerErrors } from "./tokenizerConsts.js";
import { tokenMatchers } from "./tokenizerConsts.js";

export const tokenizer = (input) => {
    input = input.trim();
    const tokens = [];
    cursorLoop : for (let cursorPos = 0; cursorPos < input.length; cursorPos++) {
        if(input[cursorPos] === ' ') continue;

        const currString = input.slice(cursorPos);

        let matchedString;
        for (const tokenMatcher of tokenMatchers) {
            matchedString =  
            tokenMatcher.tokenType === tokenTypes.KEYWORD ?
            tokenMatcher.regex.exec(currString.toUpperCase()) :
            tokenMatcher.regex.exec(currString) ;
            if (!matchedString) continue;

            let cursorStart = cursorPos;
            //updates cursorPos
            cursorPos += matchedString[0].length - 1;

            let matchedValue = matchedString[0];
            switch(tokenMatcher.tokenType) {
                case tokenTypes.NUMBER :
                    matchedValue = Number(matchedValue);
                    break;
                case tokenTypes.DATE :
                    matchedValue = new Date(matchedValue);
                    break;
                case tokenTypes.NULL :
                    matchedValue = null;
                    break;
            }

            //trimdown quoted values
            if (['"',"'","`"].includes(matchedValue[0]) && ['"',"'","`"].includes(matchedValue[matchedValue.length - 1])) {
                matchedValue = matchedString[0].trim().slice(1, -1);
            }

            tokens.push (
                {
                    value : matchedValue, 
                    type : tokenMatcher.tokenType, 
                    valueType : tokenMatcher.valueType, 
                    start : cursorStart, 
                    end : cursorPos + 1
                }
            )
            
            continue cursorLoop;
        }
        throw tokenizerErrors.UNKNOWN_TOKEN(cursorPos, currString);
    }
    return tokens;
}