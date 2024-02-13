<script lang="ts" setup>
import type { ICard, IColumn } from '~/components/kanban/kanban.types'
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery'
import { converterCurrency } from '@/lib/converterCurrency'
import dayjs from 'dayjs'; 


useSeoMeta({
   title: 'Home | CRM-System',
})

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const {data, isLoading, refetch} = useKanbanQuery();

</script>

<template>
   <div class="p-10">
      <h1 class="mb-10 text-cyan-800 text-xl" 
        style="font-size: 46px;
        font-weight: 700;"
        > 
        SRM-System
      </h1>
      <div v-if="isLoading">Loading...</div>
      <div v-else>
         <div class="grid grid-cols-5 gap-8">
            <div v-for="(column, index) in data"
               :key="column.id">
               <div class="rounder bg-blue-300 py-1 px-5
                  mb-2 text-center">
                  {{ column.name }}
               </div>
               <div>
                  <KanbanCreateDeal :refetch="refetch" :status="column.id" />
                  <Card v-for="card in column.items" 
                  :key="card.id"
                   class="mb-3 " draggable="true"> 
                     <CardHeader role="button">
                         {{ card.name }} 
                     </CardHeader>
                     <CardDescription class="pl-3  font-bold">
                         {{ converterCurrency(card.price) }}
                     </CardDescription> 
                     <CardContent>
                         Контрагент {{ card.companyName }}
                     </CardContent>
                     <CardFooter> 
                        {{ dayjs(card.$createdAt).format('DD MMMM YYYY') }} 
                     </CardFooter>   
                  </Card>         
               </div>
            </div>
         </div>   
      </div>     
   </div>
</template>

<style lang="sass" scoped>
</style>