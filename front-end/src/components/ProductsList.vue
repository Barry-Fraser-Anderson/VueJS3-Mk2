<template>
  <div class='grid-wrap'>
    <div v-for='product in products' :key='product.id' class='product-item'>
      <img :src='product.imageUrl'>
      <h3 class='product-name'>{{ product.name }}</h3>
      <p class='product-price'>{{ product.price }}</p>
      <router-link :to="'/products/' + product.id">
        <button>View Details</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsList',
  props: ['products'],
}
</script>
