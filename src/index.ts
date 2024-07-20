import { RinfoParser } from "./ParserAndLexer";
const fs = require("fs");

const programRinfo = fs.readFileSync("src/program.rinfo", "utf8");

const result = new RinfoParser().parse(programRinfo);

console.log(programRinfo.trim(), "=", result);
