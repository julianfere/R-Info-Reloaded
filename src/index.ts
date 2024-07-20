import { RinfoParser } from "./ParserAndLexer";

const input = `programa RecolectorDeFlores

areas
  jardin: AreaC(1,1,10,10)

robots
  robot recolector
  variables
    flores: numero
  comenzar
    flores := 0
    repetir 10
      repetir 9
        si HayFlorEnLaEsquina
          tomarFlor
          flores := flores + 1
        mover
      derecha
      si HayFlorEnLaEsquina
        tomarFlor
        flores := flores + 1
    repetir 10
      repetir 10
        mover
      derecha
  fin

variables
  bot: recolector

comenzar
  AsignarArea(bot, jardin)
  Iniciar(bot, 1, 1)
fin
`;

const result = new RinfoParser().parse(input);

console.log(input.trim(), "=", result);
