<script lang="ts" setup>
import dayjs from 'dayjs';
import type { IDeal } from '~/types/deals.types'
import { useCreateComment } from './useCreateComment'
import { useComents } from './useComents'; 

const {data, refetch, isLoading} = useComents()
const {commentRef, writeComment} = useCreateComment({refetch})
import { Skeleton } from '@/components/ui/skeleton'

const card = data as unknown as IDeal

</script>

<template>
   <Input placeholder="Коментар"
      v-model="commentRef"
      @keyup.enter="writeComment"
   />
   <Skeleton 
      v-if="isLoading" class="w-full h-[76px] rounded mt-5" 
   />
   <div v-else-if="card">
      <div 
         v-for="comment in card?.comments"
         :key="comment.$id"
         class="flex items-start mt-5">
         <Icon name="system-uicons:write" class="mr-3 mt-1" size="20" />
         <div class="border-border bg-black/20 rounded p-3 w-full">
            <div class="mb-2 text-sm">
               Коментар -  {{ dayjs(comment.$createdAt).format('HH:mm') }}  /  {{ dayjs(comment.$createdAt).format('DD:MM:YY') }}
            </div>
            <p> {{ comment.text }} </p>
         </div>
      </div>
   </div>
</template>