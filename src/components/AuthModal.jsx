import { useEffect, useState } from 'react'

// Set VITE_API_URL in Vercel to your backend's /api address.
const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace(/\/$/, '')

const input =
  'mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

const Field = ({ label, ...props }) => (
  <label className="block text-sm font-medium text-slate-700">
    {label}
    <input {...props} required className={input} />
  </label>
)

export default function AuthModal({ mode, onClose, onSuccess }) {
  const isLogin = mode === 'login'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${BASE}/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin ? { email: form.email, password: form.password } : form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Check your details and try again.')
      localStorage.setItem('token', data.token)
      localStorage.setItem('samelis_user', JSON.stringify(data.user))
      onSuccess?.(data.user)
      onClose()
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'Cannot reach the server. Check your connection and try again.' : err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="auth-title" className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 id="auth-title" className="text-2xl font-bold text-slate-900">{isLogin ? 'Log in' : 'Create your account'}</h2>
        <p className="mt-1 text-sm text-slate-500">
          {isLogin ? 'Log in to track your orders.' : 'Save your details for faster checkout and order tracking.'}
        </p>

        {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <form onSubmit={submit} className="mt-6 space-y-4">
          {!isLogin && <Field label="Full name" type="text" autoComplete="name" value={form.name} onChange={set('name')} />}
          <Field label="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} />
          <Field label="Password" type="password" minLength={8} autoComplete={isLogin ? 'current-password' : 'new-password'} value={form.password} onChange={set('password')} />

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 rounded-lg bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:bg-slate-300">
              {loading ? 'Please wait' : isLogin ? 'Log in' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
