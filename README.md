# Instituto Projeto Legal — Protótipo 0.1

Landing page, preços, perfis de demonstração, painel do cliente, painel técnico, formulário de projeto, módulos educacionais e editor de relatório.

## Iniciar

1. Instale Node.js 20.9+.
2. Extraia a pasta e abra o terminal nela.
3. Execute `npm install`.
4. Execute `npm run dev`.
5. Abra `http://localhost:3000`.

## Teste

Clique em **Login**, selecione `Gui-1`, `Cris-1`, `Haline-1` ou `Usuario-1` e informe a senha **DEMO-LOCAL**.

**Atenção:** os quatro perfis usam uma senha temporária comum, somente para teste. As senhas individuais citadas no briefing **não foram inseridas no código** porque credenciais embutidas no navegador ficariam visíveis a qualquer visitante. Esta versão **não tem autenticação real** e **não deve ser publicada para receber dados ou pagamentos reais**.

## Recursos demonstrativos

- Preços: até 300 m² R$ 299; 300–500 m² R$ 449; 500–1.000 m² R$ 699.
- Assinatura R$ 90,99/mês, 30% de desconto em cada serviço e módulos educacionais.
- Não há serviço acima de 1.000 m².
- Simulação de assinatura, sem cobrança.
- Os projetos e relatórios são guardados **somente no localStorage do navegador**; não são compartilhados entre usuários, aparelhos ou técnicos.
- Arquivos PDF e imagens **não são enviados**: só seus nomes aparecem na demonstração.
- A função imprimir/PDF usa o diálogo do navegador.
- Módulos educacionais estão em preparação.
- O símbolo no cabeçalho é simplificado; o arquivo original de logo fornecido está em `public/logo-original.jpg`, para recorte/versão transparente na etapa de refinamento.

## Publicação na Vercel (ambiente de demonstração, sem dados reais)

1. Crie um repositório privado no GitHub e envie o conteúdo desta pasta.
2. Na Vercel, escolha **Add New > Project**, importe o repositório.
3. Framework: Next.js (detectado automaticamente); build: `npm run build`.
4. Faça Deploy e teste a URL. Para uso comercial, utilize plano compatível com as condições de uso da Vercel.
5. Não compartilhe a URL de teste como um sistema seguro ou pronto para contratação.

## O que falta antes de operar comercialmente

1. Autenticação de produção com senhas individualizadas, hash seguro, sessões HTTP-only, recuperação de senha, autorização server-side e segregação de dados.
2. Google Sheets para registros estruturados (clientes, projetos, pagamentos, relatórios), com IDs e controles de acesso.
3. Google Drive privado ou storage equivalente para PDFs/imagens, com uploads por backend, limites, antivírus, URLs temporárias, retenção e auditoria.
4. Checkout Asaas/Mercado Pago criado no servidor; confirmação por webhook validado, idempotência, conciliação, reembolso e assinatura recorrente. Nunca liberar acesso com base apenas no retorno do navegador.
5. Geração de PDF versionado no servidor e disponibilização apenas ao proprietário e técnicos autorizados.
6. Política de privacidade, termos de serviço, governança de dados, validação de atividade privada e conflitos de interesse antes do lançamento.
7. Testes de segurança, backups, monitoramento e política de exclusão.

O arquivo `.env.example` apenas lista os nomes das configurações futuras. **Não existe backend integrado nesta versão.**

Primeira publicação do Instituto Projeto Legal.
