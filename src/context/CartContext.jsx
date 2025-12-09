import { createContext, useContext, useState, useEffect } from 'react';
import { toast }                                          from 'react-toastify';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            setCart(prevCart => prevCart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            ));
            toast.success(`Se agregó otra unidad de ${product.name} al carrito`, { position: "top-right", autoClose: 2000 });
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
            toast.success(`${product.name} agregado al carrito`, { position: "top-right", autoClose: 2000 });
        }
    };

    const removeFromCart = (productId) => {
        const product = cart.find(item => item.id === productId);
        setCart(cart.filter(item => item.id !== productId));
        if (product) {
            toast.info(`${product.name} eliminado del carrito`, { position: "top-right", autoClose: 2000 });
        }
    };

    const clearCart = () => {
        setCart([]);
        toast.success('¡Compra realizada con éxito!', { position: "top-right", autoClose: 3000 });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        setCart(prevCart => prevCart.map(item =>
            item.id === productId
                ? { ...item, quantity }
                : item
        ));
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const getCartItemsCount = () => {
        return cart.reduce((count, item) => count + (item.quantity || 1), 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            updateQuantity,
            getCartTotal,
            getCartItemsCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
