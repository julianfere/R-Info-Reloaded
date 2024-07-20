import { RinfoParser } from "./ParserAndLexer";

const input = "";

const result = new RinfoParser().parse(input);

console.log(input.trim(), "=", result);
