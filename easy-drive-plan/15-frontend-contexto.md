# 15 — Contexto Frontend: Como o Next.js Consome a API

Este arquivo documenta como o frontend Next.js (em `/Users/matheus/Documents/debug-studio/easy-drive`) se integra com o backend. Útil para replicar ou estender a integração.

---

## Stack Frontend

- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS
- **Componentes UI:** shadcn/ui
- **Estado do servidor:** TanStack Query (React Query)
- **HTTP Client:** Fetch API nativa

---

## Autenticação no Frontend

### Armazenamento de Tokens

Tokens JWT armazenados em **cookies HttpOnly** (mais seguro) ou `localStorage`:

```typescript
// authProvider.ts
const ACCESS_TOKEN_KEY = 'easydrive_access_token';
const REFRESH_TOKEN_KEY = 'easydrive_refresh_token';
```

### AuthProvider

O `AuthProvider` gerencia o estado de autenticação:

```typescript
// Contexto global
interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  refreshToken: () => Promise<void>;
}
```

### Refresh automático de token

```typescript
// Interceptor de fetch
async function fetchWithAuth(url: string, options?: RequestInit) {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  });

  if (response.status === 401) {
    // Tenta renovar o token
    await refreshAccessToken();
    
    // Retry com novo token
    response = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        'Authorization': `Bearer ${getAccessToken()}`,
      },
    });
  }

  return response;
}
```

---

## URL Base da API

```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
```

**Variável de ambiente frontend:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

---

## Páginas e Rotas do Frontend

### Autenticação
| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | `HomePage` | Landing page pública |
| `/auth/login` | `LoginPage` | Formulário de login |
| `/auth/signup` | `SignupPage` | Formulário de cadastro |
| `/auth/confirm` | `ConfirmEmailPage` | Confirmação de e-mail via token |
| `/auth/forgot-password` | `ForgotPasswordPage` | Solicitar reset de senha |
| `/auth/reset-password` | `ResetPasswordPage` | Redefinir senha com token |

### Dashboard do Aluno (autenticado)
| Rota | Componente | API Calls |
|------|-----------|-----------|
| `/student/dashboard` | `StudentDashboard` | `/dashboard/instructors`, `/dashboard/scheduled-classes` |
| `/student/instructors` | `InstructorsPage` | `/dashboard/instructors` |
| `/student/instructors/:id` | `InstructorProfile` | `/instructors/:id/schedule`, `/instructors/:id/availability` |
| `/student/bookings` | `BookingsPage` | `/dashboard/my-schedule` |
| `/student/history` | `HistoryPage` | `/dashboard/history` |
| `/student/wallet` | `WalletPage` | `/wallet/summary`, `/wallet/transactions` |
| `/student/profile` | `ProfilePage` | `GET /users/profile`, `PUT /users/profile/student` |
| `/checkout/mock` | `MockCheckoutPage` | (dispara webhook mock) |

---

## Componentes Principais

### Header

- Logo do EasyDrive
- Links de navegação (Dashboard, Instrutores, Carteira, Histórico)
- Avatar do usuário com dropdown (Perfil, Sair)

### StudentDashboard

Tela principal do aluno com:
- Saldo de créditos em destaque
- Próximas aulas agendadas
- Lista de instrutores disponíveis
- Botão de comprar créditos

### AddCreditsModal

Modal para compra de créditos:
1. Input de quantidade de créditos
2. Mostra preview: créditos base + bônus + preço total
3. Chama `POST /billing/credits/quote` ao digitar
4. Chama `POST /billing/credits/checkout` ao confirmar
5. Redireciona para `checkoutUrl`

```typescript
// Lógica do modal
const { data: quote } = useQuery({
  queryKey: ['creditQuote', credits],
  queryFn: () => quoteCredits(credits),
  enabled: credits >= 1,
});

const handleCheckout = async () => {
  const session = await createCheckout({ credits, provider: 'mock' });
  window.location.href = session.checkoutUrl;
};
```

### InstructorProfile

Página de perfil do instrutor com:
- Foto, nome, rating, experiência
- Agenda semanal (`GET /instructors/:id/schedule`)
- Calendário de disponibilidade (`GET /instructors/:id/availability`)
- Botão de reservar slot disponível

### WeeklySchedule

Componente de calendário semanal:

```typescript
// Busca disponibilidade para a semana atual
const { data } = useQuery({
  queryKey: ['availability', instructorId, weekStart, weekEnd],
  queryFn: () => getInstructorAvailability(instructorId, { weekStart, weekEnd }),
});

// Slots coloridos por status:
// open → verde (clicável)
// booked → vermelho/cinza (não clicável)
// blocked → amarelo (não clicável)
```

### CreditsTab

Aba de créditos no dashboard com:
- Saldo atual em cards
- Histórico de transações com paginação

---

## Chamadas de API por Funcionalidade

### Login
```typescript
const response = await fetch(`${API_BASE_URL}/users/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
const { access_token, refresh_token, user } = await response.json();
```

### Listar Instrutores
```typescript
const response = await fetchWithAuth(`${API_BASE_URL}/dashboard/instructors`);
const { items } = await response.json();
```

### Verificar Disponibilidade
```typescript
const params = new URLSearchParams({ weekStart, weekEnd });
const response = await fetch(
  `${API_BASE_URL}/instructors/${instructorId}/availability?${params}`
);
const { items } = await response.json();
```

### Confirmar Reserva
```typescript
const response = await fetchWithAuth(`${API_BASE_URL}/bookings/confirm`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    instructorId,
    date: '2026-03-10',
    startTime: '08:00:00',
    endTime: '09:00:00',
    creditsRequired: 10,
  }),
});
```

### Upload de Foto de Perfil
```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('folder', 'avatars');

const response = await fetchWithAuth(`${API_BASE_URL}/files/images/upload`, {
  method: 'POST',
  body: formData,
  // Não definir Content-Type — browser define automaticamente com boundary
});
const { secureUrl } = await response.json();
```

---

## Checkout Mock (Desenvolvimento)

**Rota:** `/checkout/mock?session={sessionUuid}`

```typescript
// MockCheckoutPage.tsx
export default function MockCheckoutPage() {
  const params = useSearchParams();
  const sessionId = params.get('session');

  const handleConfirmPayment = async () => {
    // Gera assinatura do webhook mock
    const body = {
      event_id: `evt_mock_${Date.now()}`,
      event_type: 'payment.succeeded',
      session_id: sessionId,
      amount: 1000,
      currency: 'BRL',
    };
    
    const signature = await generateHmacSignature(body, MOCK_WEBHOOK_SECRET);
    
    await fetch(`${API_BASE_URL}/billing/webhooks/mock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
      },
      body: JSON.stringify(body),
    });
    
    // Redireciona para dashboard com sucesso
    router.push('/student/dashboard?payment=success');
  };
  
  return (
    <div>
      <h1>Checkout (Ambiente de Teste)</h1>
      <button onClick={handleConfirmPayment}>Confirmar Pagamento</button>
    </div>
  );
}
```

---

## Tratamento de Erros HTTP no Frontend

```typescript
async function handleApiResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    
    switch (response.status) {
      case 401:
        // Token expirado → redirecionar para login
        signOut();
        router.push('/auth/login');
        break;
      case 409:
        throw new Error(error.message || 'Conflito: recurso já existe');
      case 422:
        throw new Error(error.message || 'Créditos insuficientes');
      case 429:
        throw new Error('Muitas tentativas. Aguarde alguns minutos.');
      default:
        throw new Error(error.message || 'Erro ao processar requisição');
    }
  }
  
  return response.json();
}
```

---

## Variáveis de Ambiente do Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
NEXT_PUBLIC_MOCK_WEBHOOK_SECRET=mock-webhook-secret  # para assinar webhooks mock
```

---

## Configuração CORS

O backend permite requisições do frontend via:
```env
# Backend .env
CORS_ORIGIN=http://localhost:3000  # URL do frontend
```

Se rodar em produção:
```env
CORS_ORIGIN=https://easydrive.com.br
```
