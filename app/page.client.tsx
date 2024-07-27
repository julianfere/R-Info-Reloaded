'use client';
import { Box, Button, Card, Grid } from '@radix-ui/themes';
import { useEffect, useRef } from 'react';
import { useMonaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { RinfoParser } from '@/src/ParserAndLexer';
import City from '@/src/city';
import RinfoEditor from '@/components/Editor';

export const Client = () => {
  const monaco = useMonaco();
  const ref = useRef<editor.IStandaloneCodeEditor | null>(null);
  const outputRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cityRef = useRef<City>();

  useEffect(() => {
    cityRef.current = new City(100, canvasRef.current!);
    cityRef.current.drawCity();
  }, []);

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
          <RinfoEditor editorRef={ref} />
        </Card>

        <Button onClick={handleRun}>Run</Button>
      </Box>
      <Box height="full">
        <Card className="overflow-clip ">
          <canvas id="canvas" width="950" height="800" ref={canvasRef} />
        </Card>
      </Box>
    </Grid>
  );
};
