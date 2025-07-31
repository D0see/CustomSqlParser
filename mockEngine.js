import { tokenizer } from './tokenizer/tokenizer.js'
const rawInputExample = "select poulet from table123 on '12-12-2130' = columb (SELECT FROM)"

const mockEngine = (rawInput) => {
    const tokens = tokenizer(rawInput);
}

mockEngine(rawInputExample);