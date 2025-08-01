import { tokenizer } from './tokenizer/tokenizer.js'
const rawInputExample = "SELECT * FROM table1 WHERE firstName = 'John'"

const mockEngine = (rawInput) => {
    const tokens = tokenizer(rawInput);
    console.log(JSON.stringify(tokens));
}

mockEngine(rawInputExample);