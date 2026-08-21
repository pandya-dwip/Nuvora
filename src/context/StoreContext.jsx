import { createContext, useContext, useState, useEffect } from 'react';

import initialProducts from '../data/products.json';
import initialUsers from '../data/users.json';
import initialOrders from '../data/orders.json';
import initialCategories from '../data/categories.json';
import initialSettings from '../data/settings.json';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Helper for localStorage initial state
  const loadInitial = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  // State Declarations
  const [users, setUsers] = useState(() => loadInitial('nuvora_users', initialUsers));
  const [currentUser, setCurrentUser] = useState(() => loadInitial('nuvora_current_user', null));
  const [products, setProducts] = useState(() => {
    const loaded = loadInitial('nuvora_products', initialProducts);
    if (
      !Array.isArray(loaded) ||
      loaded.length < initialProducts.length ||
      !loaded.every((p) => Array.isArray(p.images) && p.images.length > 0)
    ) {
      return initialProducts;
    }
    return loaded;
  });
  const [categories, setCategories] = useState(() => {
    const loaded = loadInitial('nuvora_categories', initialCategories);
    if (!Array.isArray(loaded) || loaded.length < initialCategories.length) {
      return initialCategories;
    }
    return loaded;
  });
  const [orders, setOrders] = useState(() => loadInitial('nuvora_orders', initialOrders));
  const [cart, setCart] = useState(() => loadInitial('nuvora_cart', []));
  const [wishlist, setWishlist] = useState(() => loadInitial('nuvora_wishlist', [1, 3]));
  const [settings, setSettings] = useState(() => loadInitial('nuvora_settings', initialSettings));

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('nuvora_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('nuvora_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nuvora_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nuvora_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('nuvora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nuvora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nuvora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('nuvora_settings', JSON.stringify(settings));
  }, [settings]);

  // Auth Methods
  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, message: 'Please enter both email and password.' };
    }
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );
    if (!user) {
      return { success: false, message: 'Invalid email or user does not exist.' };
    }
    if (user.disabled) {
      return { success: false, message: 'Your account has been disabled. Please contact support.' };
    }
    setCurrentUser(user);
    return { success: true, user };
  };

  const register = (userData) => {
    const exists = users.some(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase().trim()
    );
    if (exists) {
      return { success: false, message: 'User with this email already exists.' };
    }
    const newUser = {
      id: Date.now(),
      name: userData.fullName || userData.name,
      email: userData.email,
      role: 'customer',
      disabled: false,
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedFields };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (String(u.id) === String(currentUser.id) ? updatedUser : u)));
  };

  // Product CRUD
  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      name: productData.name,
      category: productData.category,
      price: Number(productData.price),
      originalPrice: productData.originalPrice ? Number(productData.originalPrice) : null,
      rating: Number(productData.rating || 4.5),
      stock: Number(productData.stock || 0),
      image:
        productData.image ||
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
      images: [
        productData.image ||
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
      ],
      description: productData.description || '',
      status: productData.status || 'Active',
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    setProducts((prev) =>
      prev.map((p) =>
        String(p.id) === String(id)
          ? {
            ...p,
            ...productData,
            price: Number(productData.price ?? p.price),
            stock: Number(productData.stock ?? p.stock),
          }
          : p
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    setCart((prev) => prev.filter((item) => String(item.productId) !== String(id)));
    setWishlist((prev) => prev.filter((pId) => String(pId) !== String(id)));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (String(p.id) === String(id) ? { ...p, stock: Math.max(0, Number(newStock)) } : p))
    );
  };

  // Category CRUD
  const addCategory = (categoryData) => {
    const newCat = {
      id: Date.now(),
      name: categoryData.name,
      slug: categoryData.slug || categoryData.name.toLowerCase().replace(/\s+/g, '-'),
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (id, categoryData) => {
    setCategories((prev) =>
      prev.map((c) => (String(c.id) === String(id) ? { ...c, ...categoryData } : c))
    );
  };

  const deleteCategory = (id) => {
    const cat = categories.find((c) => String(c.id) === String(id));
    if (!cat) return { success: false, message: 'Category not found.' };

    const inUse = products.some((p) => p.category.toLowerCase() === cat.name.toLowerCase());
    if (inUse) {
      return {
        success: false,
        message: `Cannot delete category "${cat.name}" because it is assigned to existing products.`,
      };
    }

    setCategories((prev) => prev.filter((c) => String(c.id) !== String(id)));
    return { success: true };
  };

  // Cart Methods
  const addToCart = (productId, qty = 1, color = 'Matte Black') => {
    const product = products.find((p) => String(p.id) === String(productId));
    if (!product) return { success: false, message: 'Product not found.' };
    if (product.stock <= 0) return { success: false, message: 'Product is out of stock.' };

    setCart((prev) => {
      const existing = prev.find((item) => String(item.productId) === String(productId));
      if (existing) {
        const newQty = Math.min(product.stock, existing.quantity + qty);
        return prev.map((item) =>
          String(item.productId) === String(productId) ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { productId: product.id, quantity: Math.min(product.stock, qty), color }];
    });

    return { success: true };
  };

  const updateCartQty = (productId, qty) => {
    const product = products.find((p) => String(p.id) === String(productId));
    const maxStock = product ? product.stock : 99;
    const validQty = Math.max(1, Math.min(maxStock, qty));

    setCart((prev) =>
      prev.map((item) => (String(item.productId) === String(productId) ? { ...item, quantity: validQty } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => String(item.productId) !== String(productId)));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Methods
  const toggleWishlist = (productId) => {
    const targetId = productId;
    setWishlist((prev) =>
      prev.some((id) => String(id) === String(targetId))
        ? prev.filter((id) => String(id) !== String(targetId))
        : [...prev, targetId]
    );
  };

  const isInWishlist = (productId) => {
    return wishlist.some((id) => String(id) === String(productId));
  };

  // Order Methods
  const placeOrder = (shippingInfo, paymentMethod = 'Credit Card') => {
    if (cart.length === 0) return null;

    const orderItems = cart
      .map((item) => {
        const prod = products.find((p) => String(p.id) === String(item.productId));
        if (!prod) return null;
        return {
          productId: prod.id,
          name: prod.name,
          category: prod.category,
          price: prod.price,
          quantity: item.quantity,
          image: prod.image,
        };
      })
      .filter(Boolean);

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 200 ? 0 : 15.0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser ? currentUser.id : 1,
      customerName: shippingInfo.fullName || (currentUser ? currentUser.name : 'Guest'),
      customerEmail: shippingInfo.email || (currentUser ? currentUser.email : 'guest@example.com'),
      items: orderItems,
      subtotal,
      shipping,
      tax,
      total,
      status: 'Placed',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      shippingAddress: {
        fullName: shippingInfo.fullName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zip: shippingInfo.zip,
      },
      paymentMethod,
    };

    // Reduce product stock
    setProducts((prev) =>
      prev.map((p) => {
        const itemInCart = cart.find((c) => String(c.productId) === String(p.id));
        if (itemInCart) {
          return { ...p, stock: Math.max(0, p.stock - itemInCart.quantity) };
        }
        return p;
      })
    );

    // Save order & clear cart
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (String(o.id) === String(orderId) ? { ...o, status: newStatus } : o))
    );
  };

  // User Management
  const toggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (String(u.id) === String(userId) ? { ...u, disabled: !u.disabled } : u))
    );
  };

  const deleteUser = (userId) => {
    if (currentUser && String(currentUser.id) === String(userId)) {
      return { success: false, message: 'Cannot delete your currently logged-in account.' };
    }
    setUsers((prev) => prev.filter((u) => String(u.id) !== String(userId)));
    return { success: true };
  };

  return (
    <StoreContext.Provider
      value={{
        users,
        currentUser,
        products,
        categories,
        orders,
        cart,
        wishlist,
        settings,
        login,
        register,
        logout,
        updateProfile,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        addCategory,
        updateCategory,
        deleteCategory,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        updateOrderStatus,
        toggleUserStatus,
        deleteUser,
        setSettings,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
