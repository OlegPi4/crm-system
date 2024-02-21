<script lang="ts" setup>
import { DB } from '~/lib/appwrite';
import { Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow, } from '@/components/ui/table'
import { useQuery } from '@tanstack/vue-query';
import {  DB_ID, COLLECTION_OURCHIFS } from '~/lib/app.constants';
import type { IOurChifs } from '~/types/company.types';

const {data, isLoading} = useQuery({
   queryKey: ['ourchifs'],
   queryFn: () => DB.listDocuments(DB_ID, COLLECTION_OURCHIFS),
})

const chifs = (data?.value?.documents as unknown as IOurChifs[])
const showAddForm = ref(false)

function delitem(val: string) {
   if(confirm('Підтвердіть видалення ?')) {
      let docId = val
      const promise = DB.deleteDocument(DB_ID, COLLECTION_OURCHIFS, docId)
      promise.then(function () {
         alert('Запис видалено')
      }, function (error:string) {
         alert(error)
      })
   }
}
function setShowAddForm() {
   showAddForm.value = !showAddForm.value
}

</script>
<template>
   <div class="p-4">
      <div v-if="isLoading"> Loading... </div>
        
      <Table v-else>
         <TableHeader>
            <TableRow>
               <TableHead class="w-[300px]">Назва посади</TableHead>
               <TableHead class="w-[300px]">Назва посади у родовому відм.</TableHead>
               <TableHead class="w-[300px]">П І Б</TableHead>
               <TableHead class="w-[300px]">П І Б у родовому відмінку</TableHead>
               <TableHead class="w-[500px]">Документ на підставі якого діє</TableHead>
               <TableHead class="w-[200px]">Дії</TableHead>
            </TableRow>
         </TableHeader> 
         <TableBody v-if="chifs">
            <TableRow 
               v-for="item in chifs"
               :key="item.$id"
            >
               <TableCell class="font-medium">
                  {{ item.jobtitle }}
               </TableCell>
               <TableCell>
                  {{ item.jobtitleadd }}
               </TableCell>
               <TableCell>
                  {{ item.name }}
               </TableCell>
               <TableCell>
                  {{ item.nameadd }}
               </TableCell>
               <TableCell>
                  {{ item.document }}
               </TableCell>
               <TableCell class="flex justify-center">
                  <NuxtLink 
                     :href="`/settings/edit/person/${item.$id}`"
                     style="background-color: #aaa;"
                     class="my-btn"
                  > edit
                  </NuxtLink>
                  <NuxtLink 
                     @click.stop='delitem(item.$id)'
                     style="background-color: #aaa;"
                     class="my-btn"
                  > del
                  </NuxtLink>
               </TableCell>
            </TableRow>
         </TableBody>
      </Table> 
      <div class="block-btn" >
         <Button class="btn-add"  v-if="!showAddForm"
            @click.stop="setShowAddForm"
            style="background-color: #aaa;"
         >add</Button>
      </div>
   </div>
   <section class="add-form">
      <LayoutAddPerson 
      v-if="showAddForm"
      @exit-add="setShowAddForm" />
   </section>
</template>

<style lang="sass" scoped>
.my-btn
   margin-left: 10px
   padding: 3px 8px
   border-radius: 4px

.my-btn:hover
   color: #fff 

.block-btn
   margin-top: 10px
   display: flex
   justify-content: center
.btn-add
   padding: 5px 12px

.btn-add:hover
   color: #fff
</style>