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
    <div className="min-h-[85vh] flex flex-col md:flex-row my-6 rounded-lg overflow-hidden border border-outline-variant bg-surface-container-lowest">
      {/* Left Side: Editorial Image */}
      <div className="hidden md:block md:w-1/2 relative bg-surface-container overflow-hidden">
        <img
          alt="Editorial brand fashion"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
        <div className="absolute bottom-margin-desktop left-margin-desktop text-on-primary z-10">
          <p className="font-display-lg text-display-lg max-w-sm text-on-background drop-shadow-sm">
            Curated for the Modern Eye.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-margin-mobile md:p-margin-desktop">
        <div className="w-full max-w-md flex flex-col gap-stack-md">
          {/* Header */}
          <div className="text-center md:text-left flex flex-col gap-stack-sm mb-stack-md">
            <Link
              to="/login"
              className="font-headline-md text-headline-md font-bold tracking-tight text-primary mb-stack-md block"
            >
              LUXE
            </Link>
            <h1 className="font-headline-md text-headline-md">Create your account</h1>
            <p className="text-on-surface-variant font-body-md text-body-md">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface" htmlFor="password">
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
              <label className="font-label-sm text-label-sm text-on-surface" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-1 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="terms" className="ml-2 block font-label-sm text-label-sm text-secondary cursor-pointer">
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
              className="w-full py-3 px-4 rounded bg-primary-container text-white font-label-sm text-label-sm hover:bg-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Link to Login */}
          <div className="mt-stack-lg text-center">
            <p className="font-body-md text-body-md text-secondary">
              Already have an account?
              <Link
                to="/login"
                className="font-label-sm text-label-sm text-on-surface hover:text-primary underline decoration-outline-variant ml-1"
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
