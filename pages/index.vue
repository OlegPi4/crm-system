<script lang="ts" setup>
import type { ICard, IColumn } from '~/components/kanban/kanban.types'
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery'
import { converterCurrency } from '@/lib/converterCurrency'
import dayjs from 'dayjs'; 
import {useMutation} from '@tanstack/vue-query'
import { DB } from '~/lib/appwrite'
import { DB_ID, COLLECTION_DEALS } from '~/lib/app.constants'
import type { EnumStatus } from '~/types/deals.types';
import { generateColumnStyle } from '~/components/kanban/generate-gradient'


useSeoMeta({
   title: 'Home | CRM-System',
})

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const {data, isLoading, refetch} = useKanbanQuery();

type TypeMutationVariables = {
   docId: string
   status?: EnumStatus
}

const { mutate } = useMutation({
   mutationKey: ['move card'],
   mutationFn: ({ docId, status}: TypeMutationVariables) => DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
      status,
   }),
   onSuccess: () => {
      refetch()
   },
})

function handleDragStart(card: ICard, column: IColumn) {
   dragCardRef.value = card
   sourceColumnRef.value = column
}

function handleDragOver(event: DragEvent) {
   event.preventDefault()
}

function handleDrop(targetColumn: IColumn) {
   if(dragCardRef.value && sourceColumnRef.value) {
      console.log(`handleDrop docId - ${dragCardRef.value.id} / status - ${targetColumn.id}` );
      
      mutate({ docId: dragCardRef.value.id, status: targetColumn.id })
   }
}

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
               :key="column.id"
               @dragover="handleDragOver"
               @drop="() => handleDrop(column)"
               class="min-h-screen"
               >
               <div class="rounder bg-blue-300 py-1 px-5
                  mb-2 text-center font-medium text-lg"
                  :style="generateColumnStyle(index, data?.length)"   
               >
                  {{ column.name }}
               </div>
               <div>
                  <KanbanCreateDeal :refetch="refetch" :status="column.id" />
                  <Card 
                  v-for="card in column.items" 
                     :key="card.id"
                     class="mb-3"
                     draggable="true"
                     @dragstart="() => handleDragStart(card, column)"
                     > 
                     <CardHeader role="button">
                         {{ card.name }} 
                     </CardHeader>
                     <CardDescription class="pl-3  font-bold">
                         {{ converterCurrency(card.price) }}
                     </CardDescription> 
                     <CardContent>
                        <div class="contragent"> 
                           <span>Контрагент:</span>
                        </div> 
                        <div class="contragent">   
                           {{ card.companyName }}
                        </div>   
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
.contragent 
   font-weight: 600
   span 
      font-size: 14px
      font-style: italic 
</style>