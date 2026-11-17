
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { randomUUID } from 'node:crypto';

export const runtime = 'nodejs';

const servicos = {
  analise_300: {
    descricao: 'Análise de projeto até 300 m²',
    valor: 299,
  },
  analise_500: {
    descricao: 'Análise de projeto de 300 a 500 m²',
    valor: 449,
  },
  analise_1000: {
    descricao: 'Análise de projeto de 500 a 1.000 m²',
    valor: 699,
  },
} as const;

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { erro: 'Faça login para continuar.' },
        { status: 401 }
      );
    }

    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json(
        { erro: 'Mercado Pago não configurado.' },
        { status: 503 }
      );
    }

    const body = await request.json();

    const servico = body?.servico;
    const email = body?.email;
    const nome = body?.nome;
    const cpf = body?.cpf;

    if (
      typeof servico !== 'string' ||
      !Object.prototype.hasOwnProperty.call(servicos, servico)
    ) {
      return NextResponse.json(
        { erro: 'Serviço inválido.' },
        { status: 400 }
      );
    }

    if (
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof nome !== 'string' ||
      !nome.trim() ||
      typeof cpf !== 'string' ||
      !/^\d{11}$/.test(cpf.replace(/\D/g, ''))
    ) {
      return NextResponse.json(
        { erro: 'Informe nome, e-mail e CPF válidos.' },
        { status: 400 }
      );
    }

    const item = servicos[servico as keyof typeof servicos];

    const client = new MercadoPagoConfig({
      accessToken: token,
    });

    const payment = new Payment(client);

    const resultado = await payment.create({
      body: {
        transaction_amount: item.valor,
        description: item.descricao,
        payment_method_id: 'pix',
        external_reference: userId,
        payer: {
          email,
          first_name: nome.trim(),
          identification: {
            type: 'CPF',
            number: cpf.replace(/\D/g, ''),
          },
        },
      },
      requestOptions: {
        idempotencyKey: randomUUID(),
      },
    });

    return NextResponse.json({
      pagamentoId: resultado.id,
      status: resultado.status,
      valor: item.valor,
      descricao: item.descricao,
      pix: {
        codigo:
          resultado.point_of_interaction?.transaction_data
            ?.qr_code ?? null,
        imagem:
          resultado.point_of_interaction?.transaction_data
            ?.qr_code_base64 ?? null,
      },
    });
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);

    return NextResponse.json(
      { erro: 'Não foi possível criar o pagamento.' },
      { status: 500 }
    );
  }
}
