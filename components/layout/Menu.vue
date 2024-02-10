<script lang="ts" setup>
import { MENU_DATA } from './menu.data';

</script>

<template>
   <div>
      <NuxtLink class="flex items-center py-1 px-3 rounded-lg w-full hover:bg-gray-400 hover:shadow transition-all mb-2"
         v-for="item in MENU_DATA"
         :key="item.name" 
         :to="item.url" 
      >   
         <Icon :name="item.icon" width="24px" height="24px" class="mr-3" />
         <span class="span-name">{{ item.name }}</span>
      </NuxtLink>
   </div>
</template>

<style lang="sass" scoped>
.span-name
   font-size: 19px
</style>