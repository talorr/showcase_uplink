import { defineStore } from 'pinia';

export const useCartInfo = defineStore('cart', {
    state: () => ({
        cart: (typeof window !== 'undefined' && localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [],
    }),
    actions: {
        addItem(product, quantity = 1) {
            const existingItem = this.cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.cart.push({ ...product, quantity });
            }
            this.saveToLocalStorage();
        },
        removeItem(productId) {
            const existingItem = this.cart.find(item => item.id === productId);
            if (existingItem.quantity > 0) {
                existingItem.quantity -= 1;
            }
            if (existingItem.quantity === 0){
                this.cart = this.cart.filter(item => item.id !== productId);
            }
            this.saveToLocalStorage();
        },
        removeItemInCart(productId) {
            this.cart = this.cart.filter(item => item.id !== productId);
            this.saveToLocalStorage();
        },
        updateItemQuantity(productId, quantity) {
            const item = this.cart.find(item => item.id === productId);
            if (item) {
                item.quantity = quantity;
                this.saveToLocalStorage();
            }
        },
        saveToLocalStorage() {
            if (typeof window !== 'undefined') localStorage.setItem('cartItems', JSON.stringify(this.cart));
        },
        clearCart() {
            this.cart = [];
            if (typeof window !== 'undefined') localStorage.removeItem('cartItems');
        },
    },
});
