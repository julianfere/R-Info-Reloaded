import { editor, languages } from 'monaco-editor';

export const DEFAULT_PROGRAM = `programa RecolectorDeFlores
areas
  jardin : AreaC(1,1,10,10)
robots
  robot recolector
  variables
    flores: numero
  comenzar
    flores := 0
    repetir 10
      repetir 9
        si (HayFlorEnLaEsquina())
          tomarFlor()
          flores := flores + 1
          mover()
          derecha()
        finsi
      finrepetir
      si (HayFlorEnLaEsquina())
        tomarFlor()
        flores := flores + 1
      finsi
    finrepetir
    repetir 10
      repetir 10
        mover()
      finrepetir
      derecha()
    finrepetir
  fin 

variables
  bot: recolector

comenzar
  AsignarArea(bot, jardin)
  Iniciar(bot, 1, 1) 
finprograma`;

export const RINFO_LANGUAGE: languages.IMonarchLanguage = {
  keywords: [
    'programa',
    'areas',
    'robots',
    'robot',
    'variables',
    'comenzar',
    'fin',
    'finprograma',
    'si',
    'finsi',
    'AreaC',
    'AreaP',
    'AreaPC',
    'numero',
    'boolean',
    'repetir',
    'finrepetir',
    'proceso',
    'E',
    'ES'
  ],
  operators: [':=', '==', '!=', '<', '>', '+', '-', '*', '/'],
  tokenizer: {
    root: [
      [/\b(robot|AreaC|AreaP|AreaPC|numero|boolean|E|ES)\b/, 'keyword'],
      [
        /\b(programa|areas|robots|variables|comenzar|fin|finprograma|si|finsi|repetir|finrepetir|proceso)\b/,
        'sectionword'
      ],
      [/\:=|==|!=|<|>|-|\*|\//, 'operator'],
      [/[a-zA-Z_][a-zA-Z0-9_]*/, 'identifier'],
      [/[0-9]+/, 'number'],
      [/[()]/, '@brackets'],
      [/:/, 'delimiter'],
      [/,/, 'delimiter']
    ]
  }
} as const;

export const RINFO_THEME: editor.IStandaloneThemeData = {
  base: 'vs-dark', // Can also use 'vs-light' or 'hc-black'
  inherit: true,
  rules: [
    { token: '', fontStyle: 'bold' },
    { token: 'keyword', foreground: '569CD6' }, // Light blue for keywords
    { token: 'operator', foreground: 'D4D4D4' }, // Light grey for operators
    { token: 'identifier', foreground: 'CE9178' }, // Dark yellow for identifiers
    { token: 'number', foreground: 'B5CEA8' }, // Light green for numbers
    { token: '@brackets', foreground: 'D4D4D4' }, // Light grey for brackets
    { token: 'delimiter', foreground: 'D4D4D4' }, // Light grey for delimiters
    { token: 'sectionword', foreground: '78ac61' } // Light grey for section words
  ],
  colors: {
    'editor.background': '#191c1a', // Background color
    'editor.foreground': '#D4D4D4' // Foreground color
  }
};
