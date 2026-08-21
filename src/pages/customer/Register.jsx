import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function Register() {
  const { register } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Please fill in all details to register.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const res = register({ fullName, email, password });
    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    navigate('/home');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
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
          <Link to="/login" className="text-2xl font-bold tracking-widest text-white uppercase font-display">
            LUXE
          </Link>
        </div>

        {/* Bottom Editorial Statement */}
        <div className="relative z-10 mt-auto max-w-md">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white leading-tight mb-2 drop-shadow-sm">
            Curated for the Modern Eye.
          </h2>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 bg-surface">
        <div className="w-full max-w-md flex flex-col gap-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-on-background mb-2">
              Create your account
            </h1>
            <p className="text-body-md text-on-surface-variant">
              Join us and start shopping.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-error-container text-on-error-container border border-error/20 rounded text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="font-label-sm text-xs font-semibold text-on-surface uppercase tracking-wider">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-label-sm text-xs font-semibold text-on-surface uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-2.5 bg-surface border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
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

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="font-label-sm text-xs font-semibold text-on-surface uppercase tracking-wider">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start my-1">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 mt-0.5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="terms" className="ml-2 block text-xs text-on-surface-variant cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-on-surface underline hover:text-primary">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-on-surface underline hover:text-primary">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Create Account CTA */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded bg-[#1B3B32] text-white font-label-sm text-sm uppercase tracking-wider font-semibold hover:bg-[#122A23] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B3B32] cursor-pointer mt-2"
            >
              Create Account
            </button>
          </form>

          {/* Link to Login */}
          <div className="text-center pt-2">
            <p className="font-body-md text-sm text-on-surface-variant">
              Already have an account?
              <Link
                to="/login"
                className="font-semibold text-on-surface hover:text-primary underline decoration-outline-variant ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
