'use client';
import React from 'react';
import QueryProvider from '@/query/provider';
import { Theme, ThemePanel } from '@radix-ui/themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryProvider>
        <Theme accentColor="teal" appearance="dark">
          {children}
        </Theme>
      </QueryProvider>
    </>
  );
}
