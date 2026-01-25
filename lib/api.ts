import { getCookie, COOKIE_ACCESS_TOKEN } from './cookies';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type ApiRequestOptions = {
  body?: any;
  headers?: Record<string, string>;
  requireAuth?: boolean;
};

class ApiInstance {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  }

  private getAuthHeaders(requireAuth: boolean = true): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (requireAuth) {
      const accessToken = getCookie(COOKIE_ACCESS_TOKEN);
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    return headers;
  }

  async request(
    endpoint: string,
    method: HttpMethod,
    options: ApiRequestOptions = {}
  ): Promise<Response> {
    const { body, headers = {}, requireAuth = true } = options;

    const requestHeaders = {
      ...this.getAuthHeaders(requireAuth),
      ...headers,
    };

    // Remove Content-Type if it's FormData (browser will set it with boundary)
    if (body instanceof FormData) {
      delete requestHeaders['Content-Type'];
    }

    return fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
      credentials: 'include', // Include cookies in requests
    });
  }

  async get(endpoint: string, options: Omit<ApiRequestOptions, 'body'> = {}) {
    return this.request(endpoint, 'GET', options);
  }

  async post(endpoint: string, body?: any, options: Omit<ApiRequestOptions, 'body'> = {}) {
    return this.request(endpoint, 'POST', { ...options, body });
  }

  async put(endpoint: string, body?: any, options: Omit<ApiRequestOptions, 'body'> = {}) {
    return this.request(endpoint, 'PUT', { ...options, body });
  }

  async patch(endpoint: string, body?: any, options: Omit<ApiRequestOptions, 'body'> = {}) {
    return this.request(endpoint, 'PATCH', { ...options, body });
  }

  async delete(endpoint: string, options: Omit<ApiRequestOptions, 'body'> = {}) {
    return this.request(endpoint, 'DELETE', options);
  }
}

// Export singleton instance
export const apiInstance = new ApiInstance();

// Export class for custom instances if needed
export { ApiInstance };

// Legacy api function for backward compatibility
export const api = (
  endpoint: string,
  method: HttpMethod,
  body?: any,
  headers: Record<string, string> = {}
) => {
  return apiInstance.request(endpoint, method, { body, headers });
};