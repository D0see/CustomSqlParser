import { tokenizer } from './tokenizer.js'
const rawInputExample = "select poulet from table123 on '12-12-2130' = columb"

const mockEngine = (rawInput) => {
    const tokens = tokenizer(rawInput);
    console.log(tokens);
}

mockEngine(rawInputExample);