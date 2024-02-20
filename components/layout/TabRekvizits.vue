<script lang="ts" setup>
import { DB } from '~/lib/appwrite';
import { Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow, } from '@/components/ui/table'
import { useQuery } from '@tanstack/vue-query';
import {  DB_ID, COLLECTION_OURBANKRECV } from '~/lib/app.constants';
import type { IOurBankRecvizits } from '~/types/company.types';

const {data, isLoading} = useQuery({
   queryKey: ['ourrecvizits'],
   queryFn: () => DB.listDocuments(DB_ID, COLLECTION_OURBANKRECV),
})


const rekvizits = (data?.value?.documents as unknown as IOurBankRecvizits[])

</script>
<template>
   <div class="p-4">
      <div v-if="isLoading"> Loading... </div>
        
      <Table v-else>
         <TableHeader>
            <TableRow>
               <TableHead class="w-[200px]">МФО</TableHead>
               <TableHead class="w-[400px]">Назва банку</TableHead>
               <TableHead class="w-[300px]">Рахунок</TableHead>
            </TableRow>
         </TableHeader> 
         <TableBody v-if="rekvizits">
            <TableRow  
               v-for="item in rekvizits"
               :key="item.$id"
            >
               <TableCell class="font-medium">
                  {{ item.mfo }}
               </TableCell>
               <TableCell>
                  {{ item.namebank }}
               </TableCell>
               <TableCell>
                  {{ item.account }}
               </TableCell>
            
               <TableCell class="flex justify-center">
                  <NuxtLink 
                     href=""
                     style="background-color: #aaa;"
                     class="my-btn"
                  > edit
                  </NuxtLink>
                  <NuxtLink 
                     @click.stop=''
                     style="background-color: #aaa;"
                     class="my-btn"
                  > del
                  </NuxtLink>
               </TableCell>   
            </TableRow>
         </TableBody>
      </Table> 
      <div class="block-btn" >
         <Button class="btn-add"
            @click="addfunc"
            style="background-color: #aaa;"
         >add</Button>
      </div>
   </div>
</template>

<style lang="sass" scoped>
.table-row
   min-width: 100%
   display: flex
   justify-content: space-between
.my-btn
   margin-left: 10px
   padding: 3px 8px
   border-radius: 4px

.my-btn:hover
   color: #fff 

.btn-add 
   margin-top: 8px
   padding: 5px 12px

.btn-add:hover
   color: #fff
</style>