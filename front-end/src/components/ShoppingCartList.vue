<template>
  <div v-if='products.length > 0'>
    <div v-for='product in products' :key='product.id' class='product-container'>
      <img class='product-image' :src='product.imageUrl'>
      <div class='details-wrap'>
        <h3>{{ product.name }}</h3>
        <p> {{ product.price }}</p>
      </div>
      <button @click="$emit('remove-from-cart', product.id)" class='remove-button'>Remove from cart</button>
    </div>
    <button class='checkout-button'>Proceed to Checkout</button>
  </div>
  <div v-else>
    There are no items in your cart
  </div>
</template>

<script>
export default {
  name: 'ShoppingCartList',
  props: ['products']
}
</script>
