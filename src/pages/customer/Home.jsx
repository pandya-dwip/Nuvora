import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { useStore } from '../../context/StoreContext';

export default function Home() {
  const { products, categories: storeCategories } = useStore();

  const categoryImages = {
    Electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
    Fashion: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    'Home & Living': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
    Beauty: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    Sports: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    Accessories: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
  };

  const categories = storeCategories.map((cat) => {
    const count = products.filter(
      (p) => p.category.toLowerCase() === cat.name.toLowerCase()
    ).length;
    return {
      ...cat,
      count: `${count} product${count === 1 ? '' : 's'}`,
      image:
        categoryImages[cat.name] ||
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    };
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[80vh] bg-surface-container flex items-center justify-center overflow-hidden mb-stack-lg">
        <div className="absolute inset-0 z-0">
          <img
            alt="Editorial hero image showcasing modern essentials in a minimalist setting"
            className="w-full h-full object-cover object-center opacity-90"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/85 via-surface/40 to-transparent md:w-2/3"></div>
        </div>
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop text-left">
          <div className="max-w-2xl">
            <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-background mb-stack-md leading-tight">
              New season.
              <br />
              New essentials.
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-stack-lg max-w-lg">
              Discover carefully selected products designed for everyday life. Minimalist aesthetic
              meets uncompromising quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-stack-sm">
              <Link
                to="/shop"
                className="bg-primary-container text-on-primary h-12 px-6 rounded hover:bg-primary transition-colors duration-200 text-label-sm font-label-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center"
              >
                Shop Collection
              </Link>
              <Link
                to="/shop"
                className="bg-transparent border border-on-background text-on-background h-12 px-6 rounded hover:bg-surface-container transition-colors duration-200 text-label-sm font-label-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center"
              >
                Explore New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="px-margin-mobile md:px-margin-desktop py-stack-lg mb-stack-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-lg gap-stack-md">
          <div>
            <h2 className="text-display-lg-mobile font-display-lg-mobile text-on-background mb-stack-sm">
              Shop by Category
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant">
              Explore products curated for every part of your everyday life.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {categories.map((cat) => (
            <Link
              key={cat.id || cat.name}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative block w-full aspect-[4/3] rounded overflow-hidden bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <img
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={cat.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-stack-md flex items-end justify-between">
                <div>
                  <h3 className="text-headline-md font-headline-md text-on-background mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-label-sm font-label-sm text-on-surface-variant">
                    {cat.count}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-on-background bg-surface-container-lowest/80 p-2 rounded-full group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300"
                >
                  chevron_right
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-margin-mobile md:px-margin-desktop py-stack-lg mb-stack-lg bg-surface">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-lg gap-stack-md">
          <div>
            <h2 className="text-display-lg-mobile font-display-lg-mobile text-on-background mb-stack-sm">
              Featured Products
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant">
              Handpicked products worth adding to your collection.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-label-sm font-label-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            View all products &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-gutter">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Collections for Every Moment */}
      <section className="px-margin-mobile md:px-margin-desktop py-stack-lg mb-stack-lg bg-surface">
        <div className="mb-stack-lg text-center">
          <h2 className="text-display-lg-mobile font-display-lg-mobile text-on-background mb-stack-sm">
            Collections for Every Moment
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            Curated specifically for your lifestyle.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <Link
            to="/shop"
            className="group relative block aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden rounded bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <img
              alt="Work & Study Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-stack-lg">
              <h3 className="text-headline-md font-headline-md text-on-background mb-2">
                Work & Study
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant mb-4">
                Elevate your workspace with considered essentials.
              </p>
              <span className="text-label-sm font-label-sm text-primary group-hover:underline inline-flex items-center gap-1">
                Explore{' '}
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </span>
            </div>
          </Link>
          <Link
            to="/shop"
            className="group relative block aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden rounded bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <img
              alt="Weekend Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-stack-lg">
              <h3 className="text-headline-md font-headline-md text-on-background mb-2">
                Weekend
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant mb-4">
                Relaxed pieces for your off-duty moments.
              </p>
              <span className="text-label-sm font-label-sm text-primary group-hover:underline inline-flex items-center gap-1">
                Explore{' '}
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </span>
            </div>
          </Link>
          <Link
            to="/shop"
            className="group relative block aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden rounded bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <img
              alt="Travel Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-stack-lg">
              <h3 className="text-headline-md font-headline-md text-on-background mb-2">Travel</h3>
              <p className="text-body-md font-body-md text-on-surface-variant mb-4">
                Pack smart with versatile travel companions.
              </p>
              <span className="text-label-sm font-label-sm text-primary group-hover:underline inline-flex items-center gap-1">
                Explore{' '}
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-margin-mobile md:px-margin-desktop py-stack-lg mb-stack-lg">
        <div className="bg-surface-container-low p-stack-lg md:p-12 rounded border border-outline-variant flex flex-col md:flex-row items-center justify-between gap-stack-lg">
          <div className="flex-1 max-w-lg">
            <h2 className="text-headline-md font-headline-md text-on-background mb-stack-sm">
              Stay in the loop
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant">
              Get updates about new products, fresh arrivals, and exclusive offers.
            </p>
          </div>
          <form
            className="flex-1 w-full max-w-md flex flex-col sm:flex-row gap-stack-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              className="flex-1 bg-surface-container-lowest border border-outline-variant px-4 py-3 rounded text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder-outline"
              id="newsletter-email"
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="bg-primary-container text-on-primary h-[50px] px-6 rounded hover:bg-primary transition-colors duration-200 text-label-sm font-label-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 whitespace-nowrap cursor-pointer"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
