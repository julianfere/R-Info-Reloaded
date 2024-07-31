import {
  DEFAULT_PROGRAM,
  RINFO_LANGUAGE,
  RINFO_THEME
} from '@/app/config/constants';
import { MutableRefObject } from 'react';
import { editor } from 'monaco-editor';
import Editor from '@monaco-editor/react';

const RinfoEditor = ({
  editorRef
}: {
  editorRef: MutableRefObject<editor.IStandaloneCodeEditor | null>;
}) => {
  return (
    <Editor
      height="90vh"
      defaultValue={DEFAULT_PROGRAM}
      options={{
        padding: { top: 10, bottom: 10 }
      }}
      defaultLanguage="rinfo"
      beforeMount={(monaco) => {
        monaco.languages.register({ id: 'rinfo' });
        monaco.languages.setMonarchTokensProvider('rinfo', RINFO_LANGUAGE);
        monaco.languages.registerCompletionItemProvider('rinfo', {
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
              insertText: keyword,
              range: monaco.Range.fromPositions(
                { lineNumber: 1, column: 1 },
                { lineNumber: 1, column: 1 }
              )
            }));

            return { suggestions: suggestions };
          }
        });
        monaco.editor.defineTheme('rinfoTheme', RINFO_THEME);
      }}
      theme="rinfoTheme"
      onMount={(editor) => {
        editorRef.current = editor;
      }}
    />
  );
};

export default RinfoEditor;
