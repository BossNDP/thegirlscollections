import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { verifyCsrfOrigin } from './csrf';
import { rateLimit } from './rateLimit';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

async function runVerificationTests() {
  console.log('====================================================');
  console.log('1. CSP HEADER STRING (FROM NEXT.CONFIG.MJS)');
  console.log('====================================================');
  const nextConfigModule = await import('../../next.config.mjs');
  const nextConfig = nextConfigModule.default;
  const headersConfig = await nextConfig.headers();
  const globalHeaders = headersConfig.find((h: any) => h.source === '/(.*)')?.headers || [];
  const cspHeaderObj = globalHeaders.find((h: any) => h.key === 'Content-Security-Policy');
  console.log('RAW CSP HEADER STRING:');
  console.log(cspHeaderObj?.value || 'CSP Header Not Found');
  console.log('\nFULL HEADERS:');
  console.log(JSON.stringify(globalHeaders, null, 2));

  console.log('\n====================================================');
  console.log('2. CSRF CROSS-ORIGIN ATTACK TEST');
  console.log('====================================================');
  // Simulate cross-origin request from malicious site
  const crossOriginReq = new Request('http://localhost:3000/api/admin/products', {
    method: 'POST',
    headers: {
      'host': 'localhost:3000',
      'origin': 'https://malicious-hacker-domain.com',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name: 'Hacked Product' }),
  });

  const csrfResult = verifyCsrfOrigin(crossOriginReq);
  if (csrfResult) {
    const status = csrfResult.status;
    const bodyText = await csrfResult.text();
    console.log('CROSS-ORIGIN REQUEST STATUS:', status);
    console.log('CROSS-ORIGIN RESPONSE BODY:', bodyText);
  } else {
    console.log('CSRF Check Failed to block request!');
  }

  console.log('\n====================================================');
  console.log('3. ADMIN LOGIN RATE LIMITER TEST (6 ATTEMPTS)');
  console.log('====================================================');
  const testIp = `test-ip-${Date.now()}`;
  for (let i = 1; i <= 6; i++) {
    const rl = await rateLimit(`admin:login:${testIp}`, 5, 15 * 60 * 1000);
    if (!rl.success) {
      console.log(`Attempt ${i}: STATUS 429 Too Many Requests | Reset in ${rl.reset}s | Remaining: ${rl.remaining}`);
    } else {
      console.log(`Attempt ${i}: STATUS 200/401 Allowed | Remaining: ${rl.remaining}`);
    }
  }

  console.log('\n====================================================');
  console.log('4. DISCOUNT VALIDATE RATE LIMITER TEST (11 ATTEMPTS)');
  console.log('====================================================');
  const testIpDiscount = `test-ip-discount-${Date.now()}`;
  for (let i = 1; i <= 11; i++) {
    const rl = await rateLimit(`discount:validate:${testIpDiscount}`, 10, 60 * 1000);
    if (!rl.success) {
      console.log(`Attempt ${i}: STATUS 429 Too Many Requests | Reset in ${rl.reset}s | Remaining: ${rl.remaining}`);
    } else {
      console.log(`Attempt ${i}: STATUS 200 Allowed | Remaining: ${rl.remaining}`);
    }
  }

  console.log('\n====================================================');
  console.log('5. LITERAL XSS PAYLOAD STOREFRONT HTML RENDER TEST');
  console.log('====================================================');
  const xssPayload = '<script>alert(1)</script>';
  const element = React.createElement('h1', { className: 'product-title' }, xssPayload);
  const renderedHtml = ReactDOMServer.renderToString(element);
  console.log('INPUT PAYLOAD:', xssPayload);
  console.log('RENDERED LITERAL STOREFRONT HTML SOURCE:');
  console.log(renderedHtml);
}

runVerificationTests().catch(console.error);
