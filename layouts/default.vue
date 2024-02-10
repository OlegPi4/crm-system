//default.vue
<script lang="ts" setup>
import type SidebarVue from '~/components/layout/Sidebar.vue';

 
</script>

<template>
   <section class="grid" style="min-height: 100vh">
      <LayoutSidebar />
      <div>
         <slot />
      </div>
   </section>
</template>
<style lang="sass" scoped>
.grid 
   display: grid
   grid-template-columns: 1fr 5fr

</style>