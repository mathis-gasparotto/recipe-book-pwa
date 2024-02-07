<template>
    <h1 class="text-4xl mb-12">Les courses</h1>
    <ShoppingList/>
</template>
  
<script>
import ShoppingList from '../components/ShoppingList/ShoppingList.vue'
export default {
    name: 'ListeCoursesPage',
    components: {
        ShoppingList
    }
}
</script>

<style>
</style>