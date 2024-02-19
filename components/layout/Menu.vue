<script lang="ts" setup>
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery'
import { MENU_DATA } from './menu.data';
import { useAuthStore } from '@/store/auth.store'

const {isLoading, refetch} = useKanbanQuery();
const auth = useAuthStore();
const isRole = auth.user.labels[0]

function serchRole(val: [string, string?, string?]): boolean {
    return val.includes(isRole) 
}

</script>

<template>
   <div v-if="isLoading">Loading...</div>
      <div v-else>
         <div
            v-for="item in MENU_DATA"
            :key="item.name" 
         >
            <NuxtLink class="flex items-center py-1 px-3 rounded-lg w-full hover:bg-gray-400 hover:shadow transition-all mb-2"
            v-if="serchRole(item.role)"
            :to="item.url" 
            >  
               <Icon :name="item.icon" width="24px" height="24px" class="mr-3" />
               <span class="span-name">{{ item.name }}</span>   
            </NuxtLink>
         </div>
      </div>
</template>

<style lang="sass" scoped>
.span-name
   font-size: 19px
</style>