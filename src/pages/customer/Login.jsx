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
    <div data-testid="login-container" className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      {/* Left Side: Editorial Banner */}
      <div className="w-full md:w-1/2 relative min-h-[40vh] md:min-h-screen bg-slate-900 overflow-hidden flex flex-col justify-between p-8 md:p-12 text-white">
        <img
          alt="Editorial luxury hero background"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30"></div>

        {/* Top Branding */}
        <div className="relative z-10">
          <span className="text-2xl font-bold tracking-widest text-white uppercase font-display">
            NUVORA
          </span>
        </div>

        {/* Bottom Editorial Statement */}
        <div className="relative z-10 mt-auto max-w-md">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white leading-tight mb-2 drop-shadow-sm">
            Everything worth having, in one place.
          </h2>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 bg-surface">
        <div className="w-full max-w-md flex flex-col gap-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-on-background mb-2">
              Welcome back
            </h1>
            <p className="text-body-md text-on-surface-variant">
              Sign in to continue shopping.
            </p>
          </div>

          {errorMsg && (
            <div data-testid="login-error-message" className="p-3 bg-error-container text-on-error-container border border-error/20 rounded text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-label-sm text-xs font-semibold text-on-surface uppercase tracking-wider">
                Email address
              </label>
              <input
                id="email"
                type="email"
                data-testid="login-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-label-sm text-xs font-semibold text-on-surface uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  data-testid="login-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-4 pr-10 py-3 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
                />
                <button
                  type="button"
                  data-testid="login-password-toggle"
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
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="remember-me"
                  data-testid="login-remember-me-checkbox"
                  className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
                />
                <span className="text-on-surface-variant">Remember me</span>
              </label>
              <a
                href="#"
                data-testid="login-forgot-password-link"
                className="font-medium text-on-surface hover:text-primary underline decoration-outline-variant"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In CTA */}
            <button
              type="submit"
              data-testid="login-submit-button"
              className="w-full py-3.5 px-4 rounded bg-[#1B3B32] text-white font-label-sm text-sm uppercase tracking-wider font-semibold hover:bg-[#122A23] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B3B32] cursor-pointer mt-2"
            >
              Sign In
            </button>
          </form>

          {/* Quick Demo Credentials Help */}
          <div className="p-3 bg-surface-container-low rounded border border-outline-variant text-xs text-on-surface-variant flex flex-col gap-1">
            <p className="font-bold text-on-surface">Demo Credentials:</p>
            <p>Admin: <code className="text-primary font-mono font-bold">admin@example.com</code> / Pass: <code className="text-primary font-mono font-bold">admin123</code></p>
            <p>Customer: <code className="text-primary font-mono font-bold">jane@example.com</code> / Pass: <code className="text-primary font-mono font-bold">customer123</code></p>
          </div>

          {/* Link to Register */}
          <div className="text-center pt-2">
            <p className="font-body-md text-sm text-on-surface-variant">
              Don&apos;t have an account?
              <Link
                to="/register"
                data-testid="login-create-account-link"
                className="font-semibold text-on-surface hover:text-primary underline decoration-outline-variant ml-1"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
