<template>
  <h1>Shopping Cart</h1>
  <ShoppingCartList @remove-from-cart='removeFromCart($event)' :products='cartItems' />
</template>

<script>
import ShoppingCartList from '@/components/ShoppingCartList.vue';
import axios from 'axios';

export default {
  name: 'ShoppingCartPage',
  components: {
    ShoppingCartList
  },
  data() {
    return {
      cartItems: [],
    }
  },
  methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(`/api/users/12345/cart/${productId}`);
      const upDatedCart = response.data;
      this.cartItems = upDatedCart;
    }
  },
  async created() {
    const response = await axios.get('/api/users/12345/cart');
    const cartItems = response.data;
    this.cartItems = cartItems;
  }
}
</script>
