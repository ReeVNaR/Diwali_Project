/**
 * Centralized API service with error handling & base URL resolution
 */
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

/**
 * Resolves a relative backend asset URL to an absolute URL if VITE_API_URL is configured
 */
export const resolveAssetUrl = (urlPath) => {
  if (!urlPath) return '';
  if (
    urlPath.startsWith('http://') ||
    urlPath.startsWith('https://') ||
    urlPath.startsWith('data:') ||
    urlPath.startsWith('blob:')
  ) {
    return urlPath;
  }
  if (!API_BASE) {
    return urlPath;
  }
  return `${API_BASE}${urlPath.startsWith('/') ? '' : '/'}${urlPath}`;
};

/**
 * Helper to build the full request URL with query parameters
 */
const buildUrl = (endpoint, params = {}) => {
  let fullEndpoint = endpoint;
  if (!endpoint.startsWith('http://') && !endpoint.startsWith('https://')) {
    fullEndpoint = API_BASE
      ? `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
      : endpoint;
  }

  const url = new URL(fullEndpoint, window.location.origin);
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      url.searchParams.append(key, params[key]);
    }
  });

  return url.toString();
};

export const apiClient = {
  async get(endpoint, params = {}) {
    const targetUrl = buildUrl(endpoint, params);

    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `HTTP error! status: ${res.status}`);
    }
    return data;
  },

  async post(endpoint, body = {}) {
    const targetUrl = buildUrl(endpoint);
    const isFormData = body instanceof FormData;

    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? body : JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `HTTP error! status: ${res.status}`);
    }
    return data;
  },

  async put(endpoint, body = {}) {
    const targetUrl = buildUrl(endpoint);

    const res = await fetch(targetUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `HTTP error! status: ${res.status}`);
    }
    return data;
  },

  async delete(endpoint, params = {}) {
    const targetUrl = buildUrl(endpoint, params);

    const res = await fetch(targetUrl, {
      method: 'DELETE',
      headers: { Accept: 'application/json' }
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `HTTP error! status: ${res.status}`);
    }
    return data;
  }
};
