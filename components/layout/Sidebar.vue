<script lang="ts" setup >
// import type { NuxtImg } from '#build/components'
// import type { NuxtLink } from '#build/components'

// import {useRouter} from 'vue-router'

import { useAuthStore, useIsLoadingStore } from '@/store/auth.store'
import { account } from '~/lib/appwrite';
 
const isLoadingStore = useIsLoadingStore();
const auth = useAuthStore();
const router = useRouter();

const logout = async() => {
   isLoadingStore.set(true);
   await account.deleteSession('current');
   auth.clear();
   await router.push('/login')
   isLoadingStore.set(false);
}

</script>

<template>
   <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
      <NuxtLink to='/' class="mb-10 block" >
         <NuxtImg src="/Logo2.svg" alt="logotype" width="120px" class="mx-auto logo-img mt-4"  />
      </NuxtLink>
      
      <Button class="absolute right-2 top-2 transition-colors  hover:text-secondary" 
      @click="logout"
      style="padding: 5px 8px;
      background-color: #d4b550;">
         <Icon name="line-md:logout" size="22px"  />
      </Button>
      <LayoutMenu />
   </aside>
</template>

<style lang="sass" scoped>
.logo-img
   border: 1px solid #22ff66
   border-radius: 50%

.btn-sidebar
   background-color: #666
   border: 2px solid #555 

</style>