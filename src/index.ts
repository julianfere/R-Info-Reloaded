import City from './city';
import { RinfoParser } from './ParserAndLexer';
import Program from './Program';
const fs = require('fs');

const programRinfo = fs.readFileSync('src/program.rinfo', 'utf8');

const yy = {
  robots: [],
  vars: []
};

const city = new City(100);

const handler = {
  robotDef: (robotName: string, caca: any) => {},
  varDef: (type: string, identifier: string, value: any) => {}
};

const result = new RinfoParser().parse(programRinfo, {
  ...yy
});

console.log('Robots declarados:', result);

fs.writeFileSync('src/program.json', JSON.stringify(result, null, 2));
