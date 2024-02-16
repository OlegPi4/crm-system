import type { KanbanSideoverComments } from '#build/components';
import type { KanbanSideoverTop } from '#build/components';
import type { UCard } from '#build/components';
import type { USlideover } from '#build/components';
<script lang="ts" setup>

const store = useDealSlideStore() 

const isLocalOpen = computed({
   get: () => store.isOpen,
   set: value => {
      store.isOpen = value
   }
})
</script>

<template>
   <div>
      <USlideover v-model="isLocalOpen">
         <UCard
            class="flex flex-col flex-1 overflow-y-auto"
            :ui="{
               body: {base: 'flex-1'},
               ring: '',
               divide: 'divide-u divide-border',
            }"
         >
            <template #header>
               <KanbanSideoverTop />
            </template>
            <KanbanSideoverComments />
         </UCard>   
      </USlideover>
   </div>
</template>