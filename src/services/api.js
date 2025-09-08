import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE
const pubKey = import.meta.env.VITE_PUBLIC_API_KEY

if (!baseURL) {
    // Helpful during dev; remove or relax for prod
    // eslint-disable-next-line no-console
    console.error('[ENV] VITE_API_BASE is missing. Falling back to http://localhost:8000')
}

const api = axios.create({
    baseURL: baseURL || 'http://localhost:8000',
    headers: { 'Content-Type': 'application/json' },
})

// Attach public API key if present (NOT for secrets)
api.interceptors.request.use((config) => {
    if (!pubKey) {
        // eslint-disable-next-line no-console
        console.warn('[ENV] VITE_PUBLIC_API_KEY missing: request will not include x-api-key header')
    } else {
        config.headers['x-api-key'] = pubKey
    }
    return config
})

export async function submitSignup(payload) {
    const { data } = await api.post('/api/signups', payload)
    return data
}

export default api
