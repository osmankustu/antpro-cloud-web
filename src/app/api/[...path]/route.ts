import { NextRequest, NextResponse } from 'next/server';

// app/api/proxy/[...path]/route.ts

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function proxyHandler(req: NextRequest, ctx: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await ctx.params; //
  const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL!;
  const backendApiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  const joinedPath = path.join('/');

  const targetUrl = `${backendBaseUrl}/api/${backendApiVersion}/${joinedPath}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('accept-encoding');

  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: req.body,
    ...({ duplex: 'half' } as any), // upload için şart
  });

  const data = await response.json();

  const cleanHeaders = new Headers(response.headers);
  cleanHeaders.delete('content-encoding');
  cleanHeaders.delete('content-length');

  return NextResponse.json(data, {
    status: response.status,
    headers: cleanHeaders,
  });
}

export async function GET(req: NextRequest, ctx: any) {
  return proxyHandler(req, ctx);
}

export async function POST(req: NextRequest, ctx: any) {
  return proxyHandler(req, ctx);
}

export async function PUT(req: NextRequest, ctx: any) {
  return proxyHandler(req, ctx);
}

export async function PATCH(req: NextRequest, ctx: any) {
  return proxyHandler(req, ctx);
}

export async function DELETE(req: NextRequest, ctx: any) {
  return proxyHandler(req, ctx);
}
