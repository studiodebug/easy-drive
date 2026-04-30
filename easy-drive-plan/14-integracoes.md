# 14 — Integrações Externas

---

## Cloudinary (Armazenamento de Imagens)

**SDK:** `cloudinary` v2  
**Uso:** Upload, transformação e deleção de imagens

### Configuração

```typescript
// src/config/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
```

**Variáveis necessárias:**
```env
CLOUDINARY_CLOUD_NAME=meu-cloud
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abc123xyz...
```

### Upload de Imagem

```typescript
// CloudinaryFileUploadRepository.upload()
async upload(buffer: Buffer, options: UploadOptions): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        public_id: options.publicId,
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result) return reject(new FileUploadError());
        resolve({
          publicId: result.public_id,
          url: result.url,
          secureUrl: result.secure_url,
          width: result.width,
          height: result.height,
        });
      }
    );
    uploadStream.end(buffer);
  });
}
```

### Transformação de Imagem

```typescript
// CloudinaryFileUploadRepository.getTransformedUrl()
getTransformedUrl(publicId: string, transforms: TransformOptions): string {
  return cloudinary.url(publicId, {
    width: transforms.width,
    height: transforms.height,
    crop: transforms.crop,
    gravity: transforms.gravity,
    quality: transforms.quality,
    fetch_format: transforms.format,
    secure: true,
  });
}
```

### Deleção de Imagem

```typescript
async delete(publicId: string): Promise<void> {
  const result = await cloudinary.uploader.destroy(publicId);
  if (result.result !== 'ok') throw new FileDeleteError();
}
```

### Parâmetros de Transformação

| Parâmetro | Valores possíveis | Descrição |
|-----------|------------------|-----------|
| `crop` | `fill`, `fit`, `scale`, `thumb`, `crop` | Tipo de recorte |
| `gravity` | `face`, `center`, `auto`, `north`, `south`, `east`, `west` | Ponto focal |
| `quality` | `auto`, `auto:good`, `80`, `60` | Qualidade de compressão |
| `format` | `webp`, `jpg`, `png`, `auto` | Formato de saída |

---

## Resend (Envio de E-mails)

**SDK:** `resend`  
**Uso:** E-mails transacionais (confirmação, reset de senha)

### Interface

```typescript
interface IEmailSender {
  send(options: SendEmailOptions): Promise<void>;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}
```

### Implementação com Resend

```typescript
// ResendEmailSender.ts
import { Resend } from 'resend';

export class ResendEmailSender implements IEmailSender {
  private client: Resend;
  private from: string;

  constructor() {
    this.client = new Resend(process.env.RESEND_API_KEY);
    this.from = process.env.EMAIL_FROM || 'EasyDrive <onboarding@resend.dev>';
  }

  async send(options: SendEmailOptions): Promise<void> {
    await this.client.emails.send({
      from: this.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
}
```

### Fallback: NoOpEmailSender

Quando `RESEND_API_KEY` não está definida (desenvolvimento local):

```typescript
export class NoOpEmailSender implements IEmailSender {
  async send(options: SendEmailOptions): Promise<void> {
    console.log('[NoOpEmailSender] Would send email:');
    console.log('  To:', options.to);
    console.log('  Subject:', options.subject);
  }
}
```

### Templates de E-mail

**Confirmação de E-mail:**
```html
<h1>Bem-vindo ao EasyDrive!</h1>
<p>Clique no link abaixo para confirmar seu e-mail:</p>
<a href="{FRONTEND_URL}/auth/confirm?token={token}">Confirmar E-mail</a>
<p>Este link expira em 24 horas.</p>
```

**Reset de Senha:**
```html
<h1>Redefinição de Senha</h1>
<p>Você solicitou a redefinição da sua senha.</p>
<a href="{FRONTEND_URL}/auth/reset-password?token={token}">Redefinir Senha</a>
<p>Este link expira em 1 hora.</p>
<p>Se você não solicitou isso, ignore este e-mail.</p>
```

**Variáveis necessárias:**
```env
RESEND_API_KEY=re_abc123...
EMAIL_FROM=EasyDrive <noreply@easydrive.com.br>
FRONTEND_URL=https://easydrive.com.br
```

---

## Stripe (Pagamentos - Produção)

**Uso:** Processamento de pagamentos com cartão de crédito

### Webhook esperado

```json
{
  "id": "evt_1234567890abcdef",
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_a1B2c3D4e5F6g7H8i9J0",
      "payment_status": "paid",
      "amount_total": 100000,
      "currency": "brl",
      "metadata": {
        "sessionUuid": "aa0e8400-e29b-41d4-a716-446655440000"
      }
    }
  }
}
```

### Como extrair dados do webhook Stripe

```typescript
// BillingUseCase.registerWebhook() - provider: 'stripe'
const event = payload as StripeWebhookPayload;
const providerEventId = event.id;          // "evt_1234..."
const eventType = event.type;              // "checkout.session.completed"
const sessionId = event.data.object.id;   // "cs_test_a1B2..."
const isPaid = event.data.object.payment_status === 'paid';
```

### Assinatura

```
Header: X-Webhook-Signature: <hmac-sha256-hex>
Secret: process.env.STRIPE_WEBHOOK_SECRET
```

---

## MercadoPago (Pagamentos - Alternativo)

**Uso:** Pagamentos via PIX, boleto, cartão

### Webhook esperado

```json
{
  "id": "12345678",
  "type": "payment",
  "data": {
    "id": "payment_mp_abc123",
    "status": "approved",
    "external_reference": "session-uuid-do-checkout"
  }
}
```

### Como extrair dados do webhook MercadoPago

```typescript
// BillingUseCase.registerWebhook() - provider: 'mercadopago'
const event = payload as MercadoPagoWebhookPayload;
const providerEventId = event.data.id;        // "payment_mp_abc123"
const eventType = event.type;                 // "payment"
const isPaid = event.data.status === 'approved';
const sessionRef = event.data.external_reference;  // UUID do checkout
```

### Assinatura

```
Header: X-Webhook-Signature: <hmac-sha256-hex>
Secret: process.env.MERCADOPAGO_WEBHOOK_SECRET
```

---

## Provider Mock (Desenvolvimento)

### Webhook mock esperado

```json
{
  "event_id": "evt_mock_12345",
  "event_type": "payment.succeeded",
  "session_id": "aa0e8400-e29b-41d4-a716-446655440000",
  "amount": 100000,
  "currency": "BRL"
}
```

### Como testar webhook mock

```bash
# Gera assinatura HMAC-SHA256
BODY='{"event_id":"evt_mock_1","event_type":"payment.succeeded","session_id":"SESSION_UUID","amount":1000}'
SECRET="mock-webhook-secret"
SIG=$(echo -n "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')

curl -X POST http://localhost:3333/billing/webhooks/mock \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: $SIG" \
  -d "$BODY"
```

### URL de checkout mock

```
http://localhost:3000/checkout/mock?session={sessionUuid}
```

O frontend renderiza uma página de "pagamento simulado" que, ao confirmar, dispara o webhook mock.

---

## Verificação de Assinatura (HMAC)

A mesma lógica se aplica para todos os providers:

```typescript
// src/app/middleware/webhookSignature.ts
import crypto from 'crypto';

function verifySignature(secret: string, payload: string, receivedSig: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  // Comparação segura contra timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(receivedSig)
  );
}
```

O payload para assinar é `JSON.stringify(req.body)`.
