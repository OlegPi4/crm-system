//default.vue
<script lang="ts" setup>

import { account } from "@/lib/appwrite";
import { useAuthStore, useIsLoadingStore } from '@/store/auth.store'
 
const isLoadingStore = useIsLoadingStore();
const auth = useAuthStore();
const router = useRouter();

onMounted( async () => {
   try {
     
      const user = await account.get()
      if(user) auth.set(user)
   } catch {
      router.push('/login');
   } finally {
      isLoadingStore.set(false);
   }
})   


</script>

<template>
   <LayoutLoader v-if="isLoadingStore.isLoading"/>
   <section v-else 
      :class="{grid: auth.isAuth}"
      style="min-height: 100vh">
      <LayoutSidebar
         v-if="auth.isAuth"/>
      <div>
         <slot />
      </div>
   </section>
</template>
<style lang="sass" scoped>
.grid 
   display: grid
   grid-template-columns: 1fr 6fr

</style>