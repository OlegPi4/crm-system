<script lang="ts" setup>
import type { NuxtImg } from '#build/components';
</script>

<template>
   <div class="wrapper">
      <NuxtImg src="/Rolling-1s-200px.svg"  width="150" height="150" alt="spinner" />
   </div>
</template>

<style scoped>
 .wrapper {
   @apply bg-slate-100 flex items-center justify-center w-screen h-screen;
  } 
</style>