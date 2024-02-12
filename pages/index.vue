<script lang="ts" setup>
import type { ICard, IColumn } from '~/components/kanban/kanban.types'
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery'
useSeoMeta({
   title: 'Home | CRM-System',
})

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);

useKanbanQuery();

</script>

<template>
   <div class="p-10">
      <h1 class="mb-10 text-cyan-800 text-xl" 
        style="font-size: 46px;
        font-weight: 700;"
        > 
        SRM-System</h1>
   </div>
   <div>
      <Card class="mb-3 ml-5 w-80" draggable="true"> 
         <CardHeader role="button"> name card </CardHeader>
         <CardContent> Company </CardContent>
         <CardFooter>Date</CardFooter>
      </Card>
   </div>
</template>

<style lang="sass" scoped>

</style>