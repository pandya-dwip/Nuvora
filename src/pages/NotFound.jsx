import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-margin-mobile py-stack-lg text-center">
      <div className="max-w-md w-full bg-surface border border-outline-variant rounded p-stack-lg flex flex-col items-center">
        <span className="text-display-lg-mobile font-display-lg-mobile font-bold text-outline mb-2">404</span>
        <h1 className="text-headline-md font-headline-md text-on-background mb-2">
          Page Not Found
        </h1>
        <p className="text-body-md text-on-surface-variant mb-stack-lg">
          The requested page URL does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            to="/home"
            className="flex-1 bg-primary text-on-primary py-3 rounded font-label-sm text-label-sm text-center uppercase tracking-wider hover:bg-primary-container transition-colors cursor-pointer"
          >
            Go to Home
          </Link>
          <Link
            to="/shop"
            className="flex-1 border border-outline-variant text-on-surface py-3 rounded font-label-sm text-label-sm text-center uppercase tracking-wider hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            Shop Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
