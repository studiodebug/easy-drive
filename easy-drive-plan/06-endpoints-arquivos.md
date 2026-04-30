# 06 — Endpoints: Módulo Files (Imagens)

Base path: `/files`

Integração com **Cloudinary** para armazenamento e transformação de imagens.

---

## POST /files/images/upload

Faz upload de uma imagem para o Cloudinary.

**Middleware:** `authenticateMiddleware`, `uploadImageMiddleware` (multer)

> **ATENÇÃO:** O `uploadImageMiddleware` vem **DEPOIS** do `authenticateMiddleware` na ordem dos middlewares.

**Content-Type:** `multipart/form-data`

**Form field:**
- `file` (File) — campo obrigatório, nome fixo `"file"` (`upload.single("file")`)

**Restrições do multer:**
- Tamanho máximo: **10MB** (`10 * 1024 * 1024` bytes)
- Tipos permitidos: `image/jpeg`, `image/jpg`, `image/png`, `image/gif`, `image/webp`
- Se tipo inválido: lança `Error("Invalid file type. Allowed: JPEG, PNG, GIF, WebP")` — não é classe customizada

**Lógica:**
1. multer armazena arquivo em `req.file.buffer` (memória)
2. `UploadImageUseCase` chama `CloudinaryFileUploadRepository.upload(buffer, options)`
3. O repositório converte Buffer para base64 data URI:
   ```typescript
   const base64 = file.toString("base64");
   const mimeType = "image/jpeg";  // hardcoded — independente do tipo real do arquivo
   const fileToUpload = `data:${mimeType};base64,${base64}`;
   ```
4. Chama `cloudinary.uploader.upload(fileToUpload, uploadOptions)`
5. `resourceType`: `"auto"` por padrão (ou do campo `options?.resourceType`)

**Query params opcionais (passados como form fields ou query):**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `folder` | string | Pasta no Cloudinary |
| `publicId` | string | ID público customizado |
| `overwrite` | boolean | Sobrescrever se existir |

**Response 200:**
```json
{
  "publicId": "avatars/user_1_abc123",
  "url": "http://res.cloudinary.com/cloud-name/image/upload/avatars/user_1_abc123.jpg",
  "secureUrl": "https://res.cloudinary.com/cloud-name/image/upload/avatars/user_1_abc123.jpg",
  "width": 800,
  "height": 600,
  "format": "jpg",
  "bytes": 123456
}
```

> Inclui `format` e `bytes` (diferente de outras versões documentadas).

**Erros:**
- `Error("Invalid file type. Allowed: JPEG, PNG, GIF, WebP")` → tratado pelo multer
- `Error("Failed to upload file to Cloudinary: ...")` → erro no Cloudinary

---

## GET /files/images/transform

Gera URL de imagem transformada pelo Cloudinary (sem novo upload).

**Middleware:** `authenticateMiddleware`

**Query params:**
| Param | Tipo | Descrição |
|-------|------|-----------|
| `publicId` | string | Obrigatório. Public ID da imagem |
| `width` | number | Largura em pixels |
| `height` | number | Altura em pixels |
| `crop` | string | `fill`, `fit`, `scale`, `thumb`, `crop` |
| `gravity` | string | `face`, `center`, `auto`, `north`, etc. |
| `quality` | number/string | `auto`, `80`, etc. |
| `fetchFormat` | string | `webp`, `jpg`, `png`, `auto` |

> **ATENÇÃO:** O parâmetro é `fetchFormat` (camelCase), não `format`.

**Implementação:**
```typescript
getTransformedUrl(publicId, options) {
  const transformOptions: any = {};
  if (options.width)       transformOptions.width = options.width;
  if (options.height)      transformOptions.height = options.height;
  if (options.crop)        transformOptions.crop = options.crop;
  if (options.gravity)     transformOptions.gravity = options.gravity;
  if (options.quality)     transformOptions.quality = options.quality;
  if (options.fetchFormat) transformOptions.fetch_format = options.fetchFormat;
  return cloudinary.url(publicId, transformOptions);
}
```

**Response 200:**
```json
{
  "url": "https://res.cloudinary.com/cloud-name/image/upload/c_fill,g_face,h_200,w_200/avatars/user_1_abc123.jpg"
}
```

---

## DELETE /files/images/:publicId

Deleta uma imagem do Cloudinary.

**Middleware:** `authenticateMiddleware`

**Path param:** `publicId` — URL encoded se contiver `/`

**Implementação:**
```typescript
async delete(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
  // Em caso de erro: throw new Error(`Failed to delete file from Cloudinary: ...`)
}
```

**Response 200:**
```json
{
  "message": "Image deleted"
}
```

---

## Configuração Cloudinary

```typescript
// src/config/cloudinary.ts
export const cloudinaryConfig: ConfigOptions = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || ""
};
```

O `cloudinaryConfig` é passado como dependência ao `CloudinaryFileUploadRepository` via DI.

---

## Interface FileUploadRepository

```typescript
interface FileUploadRepository {
  upload(file: Buffer | string, options?: UploadOptions): Promise<UploadResult>;
  getTransformedUrl(publicId: string, options: TransformOptions): string;
  getOptimizedUrl(publicId: string, options?: TransformOptions): string;  // método extra
  delete(publicId: string): Promise<void>;
}

interface UploadOptions {
  folder?: string;
  publicId?: string;
  overwrite?: boolean;
  resourceType?: string;
}

interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;    // ← incluído no resultado real
  bytes: number;     // ← incluído no resultado real
}

interface TransformOptions {
  width?: number;
  height?: number;
  crop?: string;
  gravity?: string;
  quality?: number | string;
  fetchFormat?: string;  // ← camelCase (vira fetch_format para Cloudinary)
}
```

---

## Método `getOptimizedUrl` (não exposto via endpoint)

Método adicional no repositório que usa `quality: "auto"` e `fetchFormat: "auto"` por padrão:

```typescript
getOptimizedUrl(publicId, options) {
  return cloudinary.url(publicId, {
    fetch_format: options?.fetchFormat || "auto",
    quality: options?.quality || "auto",
    width: options?.width,
    height: options?.height,
  });
}
```
