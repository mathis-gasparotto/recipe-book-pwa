<template>
  <button v-if="color === 'blue'" :type="type" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="click">{{ text }}</button>
  <button  v-if="color === 'red'" :type="type" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" @click="click">{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  emits: ['click'],
  props: {
    type: {
      type: String,
      default: 'button'
    },
    color: {
      type: String,
      default: 'blue'
    },
    text: String
  },
  methods: {
    click(event) {
      event.preventDefault()
      this.$emit('click')
    }
  }
}
</script>