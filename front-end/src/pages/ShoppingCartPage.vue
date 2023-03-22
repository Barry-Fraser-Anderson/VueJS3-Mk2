<template>
  <h1>Shopping Cart</h1>
  <ShoppingCartList :products='cartItems' />
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
  async created() {
    const response = await axios.get('/api/users/12345/cart');
    const cartItems = response.data;
    this.cartItems = cartItems;
  }
}
</script>
