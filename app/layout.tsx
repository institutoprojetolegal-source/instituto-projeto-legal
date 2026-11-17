
import './style.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instituto Projeto Legal | Consultoria e Educação',
  description:
    'Orientação técnica privada e educação em legislação urbana.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
