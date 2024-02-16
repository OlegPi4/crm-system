<script setup  lang="ts">
import { Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow, } from '@/components/ui/table'
import { DB } from '~/lib/appwrite';
import { useQuery } from '@tanstack/vue-query';
import { COLLECTION_CUSTOMERS, DB_ID } from '~/lib/app.constants';
import type { ICustomer } from '~/types/deals.types';

useSeoMeta({
   title: 'Customers | CRM-System',
})

const {data, isLoading, refetch} = useQuery({
   queryKey: ['customers'],
   queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
   
   
})


const customers = (data?.value?.documents as unknown as ICustomer[])
// console.log(customers);

// function creatAreayCustomers(Arr: any) {
//    let customersR 
//    for (let index = 0; index < Arr.length; index++) {
//       const element = Arr[index];
//       customers.push(element);
//    }
//    return customersR
// }   

// const customersR = creatAreayCustomers(customers);
// console.log(customersR);


const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return customers
  }

  return customers.filter((customer) => {
    return Object.values(customer).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

</script>

<template>
   <div class="p-10">
      <h2 class="font-bold text-xl mb-10">Клієнти</h2>
      <div class="flex px-3 py-3.5 border-b  dark:border-gray-700 w-[400px]">
            <Input v-model="q" placeholder="Пошук ..."  style="border: solid #ccc 2px"/>
      </div>
      <div v-if="isLoading"> Loading... </div>
        
      <Table v-else>
         <TableHeader>
            <TableRow>
               <TableHead class="w-[30px]">п/н</TableHead>
               <TableHead class="w-[80px]">Зображення</TableHead>
               <TableHead class="w-[200px]">Назва</TableHead>
               <TableHead class="w-[200px]">Email</TableHead>
               <TableHead class="w-[100px]">Джерело залучення</TableHead>
               <TableHead class="w-[100px]">Розгорнута інформація</TableHead>
            </TableRow>
         </TableHeader> 
         <TableBody>
            <TableRow 
               v-for="customer in filteredRows"
               :key="customer.$id"
            >
               <TableCell class="font-medium">
                  {{ filteredRows.indexOf(customer) + 1 }}
               </TableCell>
               <TableCell>
                  <NuxtLink :href="`/customers/edit/${customer.$id}`">
                     <img 
                     :src="customer.avatar_url"
                     :alt="customer.name"
                     width="50"
                     height="50"
                     class="rounded-full"
                  </NuxtLink>
               </TableCell>
               <TableCell class="font-medium">
                  {{ customer.name }}
               </TableCell>
               <TableCell>
                  {{ customer.email }}
               </TableCell>
               <TableCell>
                  {{ customer.from_source }}
               </TableCell>
               <TableCell class="flex justify-center">
                  <NuxtLink 
                  :href="`/customers/edit/${customer.$id}`"
                  style="background-color: #aaa;"
                  class="my-btn"
                  >
                     <Icon name="material-symbols-light:edit-square-outline-rounded" width="24" height="24"  />    
                  </NuxtLink>
               </TableCell>
            </TableRow>
         </TableBody>
      </Table> 
   </div>
</template>
<style lang="sass" scoped>

.my-btn
   padding: 5px 12px
   border-radius: 4px 

.my-btn:hover
   color: #fff
     
</style>