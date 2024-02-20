<script lang="ts" setup>
import { DB } from '~/lib/appwrite';
import { Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow, } from '@/components/ui/table'
import { useQuery } from '@tanstack/vue-query';
import {  DB_ID, COLLECTION_OURCOMPANY } from '~/lib/app.constants';
import type { IOurCompany } from '~/types/company.types';

const {data, isLoading} = useQuery({
   queryKey: ['ourcompany'],
   queryFn: () => DB.listDocuments(DB_ID, COLLECTION_OURCOMPANY),
})


const companys = (data?.value?.documents as unknown as IOurCompany[])
const comp = ref() 

function edit(val:IOurCompany[]) {
   comp.value = val
}



</script>
<template>
   <div class="p-4">
      <div v-if="isLoading"> Loading... </div>
        
      <Table v-else>
         <TableHeader>
            <TableRow>
               <TableHead class="w-[400px]">Назва</TableHead>
               <TableHead class="w-[300px]">Скорочена назва</TableHead>
               <TableHead class="w-[400px]">Адреса</TableHead>
               <TableHead class="w-[300px]">ЄДРПОУ</TableHead>
               <TableHead class="w-[200px]">Дії</TableHead>
            </TableRow>
         </TableHeader> 
         <TableBody v-if="companys">
            <TableRow 
               v-for="company in companys"
               :key="company.$id"
            >
               <TableCell class="font-medium">
                  {{ company.namelong }}
               </TableCell>
               <TableCell>
                  {{ company.nameshort }}
               </TableCell>
               <TableCell>
                  {{ company.address }}
               </TableCell>
               <TableCell>
                  {{ company.edrpo }}
               </TableCell>
               <TableCell class="flex justify-center">
                  <NuxtLink 
                     :href="`/settings/edit/company/${company.$id}`"
                     style="background-color: #aaa;"
                     class="my-btn"
                  > edit
                  </NuxtLink>
               </TableCell>
            </TableRow>
         </TableBody>
      </Table> 
   </div>
</template>

<style lang="sass" scoped>
.my-btn
   padding: 3px 8px
   border-radius: 4px

.my-btn:hover
   color: #fff 

</style>