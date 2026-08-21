import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function Login() {
  const { login } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = login(email, password);
    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    if (res.user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-stack-lg px-margin-mobile">
      <div className="w-full max-w-md bg-surface p-stack-lg rounded border border-outline-variant shadow-sm">
        <div className="text-center mb-stack-md">
          <span className="text-headline-md font-headline-md font-bold tracking-tight text-primary mb-2 block">
            LUXE
          </span>
          <h1 className="text-headline-md font-headline-md text-on-background mb-1">
            Welcome back
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Sign in to your account to continue.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container border border-error/20 rounded text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-label-sm text-label-sm text-on-surface">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com or admin@example.com"
              className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-label-sm text-label-sm text-on-surface">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-4 pr-10 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary focus:outline-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
              />
              <span className="font-label-sm text-label-sm text-secondary">Remember me</span>
            </label>
            <a
              href="#"
              className="font-label-sm text-label-sm text-on-surface hover:text-primary underline decoration-outline-variant"
            >
              Forgot password?
            </a>
          </div>

          {/* Sign In CTA */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded bg-primary-container text-white font-label-sm text-label-sm hover:bg-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Quick Demo Credentials Help */}
        <div className="mt-4 p-3 bg-surface-container-low rounded border border-outline-variant text-xs text-on-surface-variant flex flex-col gap-1">
          <p className="font-bold text-on-surface">Demo Credentials:</p>
          <p>Customer: <code className="text-primary font-mono">jane@example.com</code></p>
          <p>Admin: <code className="text-primary font-mono">admin@example.com</code></p>
        </div>

        {/* Link to Register */}
        <div className="mt-stack-lg text-center">
          <p className="font-body-md text-body-md text-secondary">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="font-label-sm text-label-sm text-on-surface hover:text-primary underline decoration-outline-variant ml-1"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
