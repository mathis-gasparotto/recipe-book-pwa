<template>
  <li class="pb-3 sm:pb-4">
    <a :href="`/recipes/${recipe.id}`">
      <div class="flex items-center space-x-6 rtl:space-x-reverse">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            {{ recipe.title }}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            {{ recipe.shortDescription }}
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {{ recipe.timeToCook }} min
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'RecipeListItem',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
}
</script>