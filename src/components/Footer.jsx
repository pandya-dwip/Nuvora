import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter bg-surface-container-lowest border-t border-outline-variant mt-auto">
      <div className="col-span-1 md:col-span-1">
        <Link
          to="/"
          className="text-headline-md font-headline-md font-bold text-primary focus:outline-none ring-2 ring-transparent focus:ring-primary focus:ring-offset-2 rounded"
        >
          LUXE
        </Link>
        <p className="mt-stack-sm text-label-sm font-label-sm text-secondary">
          &copy; {new Date().getFullYear()} LUXE. All rights reserved.
        </p>
      </div>
      <div className="col-span-1 md:col-span-3 flex flex-wrap gap-x-gutter gap-y-stack-sm md:justify-end">
        <Link
          to="/shop"
          className="text-label-sm font-label-sm text-primary underline focus:outline-none ring-2 ring-transparent focus:ring-primary focus:ring-offset-2 rounded hover:text-primary transition-colors"
        >
          Shop
        </Link>
        <Link
          to="/shop"
          className="text-label-sm font-label-sm text-secondary focus:outline-none ring-2 ring-transparent focus:ring-primary focus:ring-offset-2 rounded hover:text-primary transition-colors"
        >
          Customer Care
        </Link>
        <Link
          to="/orders"
          className="text-label-sm font-label-sm text-secondary focus:outline-none ring-2 ring-transparent focus:ring-primary focus:ring-offset-2 rounded hover:text-primary transition-colors"
        >
          Returns & Exchanges
        </Link>
        <Link
          to="/shop"
          className="text-label-sm font-label-sm text-secondary focus:outline-none ring-2 ring-transparent focus:ring-primary focus:ring-offset-2 rounded hover:text-primary transition-colors"
        >
          Terms of Service
        </Link>
        <Link
          to="/shop"
          className="text-label-sm font-label-sm text-secondary focus:outline-none ring-2 ring-transparent focus:ring-primary focus:ring-offset-2 rounded hover:text-primary transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          to="/shop"
          className="text-label-sm font-label-sm text-secondary focus:outline-none ring-2 ring-transparent focus:ring-primary focus:ring-offset-2 rounded hover:text-primary transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </footer>
  );
}
