'use client';
import { Box, Button, Card, Grid } from '@radix-ui/themes';
import { useRef, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import monaco, { editor } from 'monaco-editor';
import { RinfoParser } from '@/src/ParserAndLexer';

const DEFAULT_PROGRAM = `programa RecolectorDeFlores
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

export const Client = () => {
  const monaco = useMonaco();
  const ref = useRef<editor.IStandaloneCodeEditor | null>(null);
  const outputRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const handleRun = () => {
    const value = ref.current?.getValue();
    if (!value) {
      return;
    }

    try {
      const result = new RinfoParser().parse(value, {});
      outputRef.current?.setValue(JSON.stringify(result, null, 2));
      if (ref.current?.getModel()) {
        monaco?.editor.setModelMarkers(ref.current.getModel()!, 'owner', []); // Clear markers if parse is successful
      }
    } catch (e: { hash: any; message: string } | any) {
      const error = e.hash;

      if (ref.current?.getModel()) {
        monaco?.editor.setModelMarkers(ref.current.getModel()!, 'owner', [
          {
            startLineNumber: error.loc?.first_line,
            startColumn: error.loc?.first_column || 1,
            endLineNumber: error.loc?.last_line,
            endColumn: error.loc?.last_column || 1,
            message: e.message,
            severity: monaco.MarkerSeverity.Error
          }
        ]);
      }
    }
  };

  return (
    <Grid
      columns={{ initial: '1', md: '2' }}
      gap="3"
      width="auto"
      className="p-4"
    >
      <Box className="grid h-full gap-2">
        <Card className="col-span-1 overflow-clip p-0 ">
          <Editor
            height="90vh"
            defaultValue={DEFAULT_PROGRAM}
            options={{
              padding: { top: 10, bottom: 10 }
            }}
            defaultLanguage="rinfo"
            beforeMount={(monaco) => {
              monaco.languages.register({ id: 'rinfo' });
              monaco.languages.setMonarchTokensProvider('rinfo', {
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
                    [
                      /\b(robot|AreaC|AreaP|AreaPC|numero|boolean|E|ES)\b/,
                      'keyword'
                    ],
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
              });

              monaco.languages.registerCompletionItemProvider('rinfo', {
                //@ts-expect-error
                provideCompletionItems: () => {
                  const suggestions = [
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
                  ].map((keyword) => ({
                    label: keyword,
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: keyword
                  }));

                  return { suggestions: suggestions };
                }
              });

              // Define a custom theme
              monaco.editor.defineTheme('rinfoTheme', {
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
              });
              //change font bold
            }}
            theme="rinfoTheme"
            onMount={(editor, monaco) => {
              ref.current = editor;
            }}
          />
        </Card>

        <Button onClick={handleRun}>Run</Button>
      </Box>
      <Box height="full">
        <Card className="overflow-clip ">sarasa</Card>
      </Box>
    </Grid>
  );
};
