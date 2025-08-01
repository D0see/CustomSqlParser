import { tokenizer } from './tokenizer/tokenizer.js';
import { postTokenizationProcessing } from './postTokenizationProcessing/postTokenizationProcessing.js';

const rawInputExample = "SELECT * FROM (select firstName, LastName from people) WHERE firstName = 'John'"
const mockEngine = (rawInput) => {
    const tokens = tokenizer(rawInput);
    const processedTokens = postTokenizationProcessing(tokens);
}

mockEngine(rawInputExample);