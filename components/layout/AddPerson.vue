<script lang="ts" setup> 
import { DB } from '~/lib/appwrite';
import { useMutation } from '@tanstack/vue-query';
import { COLLECTION_OURBANKRECV, COLLECTION_OURCHIFS, DB_ID } from '~/lib/app.constants';
import type { IOurChifs } from '~/types/company.types';
import { v4 as uuid} from 'uuid'

interface IOurPersonsFormState extends IOurChifs{} 


useSeoMeta({
   title: 'додати посадову особу '
})

const { handleSubmit, defineField  } = useForm<IOurPersonsFormState>()

const emit = defineEmits(['exit-add'])

const [jobtitle, jobtitleAttrs] = defineField('jobtitle')
const [jobtitleadd, jobtitleaddAttrs] = defineField('jobtitleadd')
const [name, nameAttrs] = defineField('name')
const [nameadd, nameaddAttrs] = defineField('nameadd')
const [document, documentAttrs] = defineField('document')

const { mutate, isPending } = useMutation({
   mutationKey: ['create person'],
   mutationFn: (data: IOurPersonsFormState) => DB.createDocument(DB_ID, COLLECTION_OURCHIFS, uuid(), data),
   onSuccess(){
      emit('exit-add')
   }
})

const onSubmit = handleSubmit(values => {
   mutate(values)
})

function exit(){
   emit('exit-add')
}

</script>

<template>
   <div class="p-10 wrapp">
      <div class="flex justify-between" >
         <h2 class="heared-title font-bold text-2xl mb-10">
            Додати посадову особу 
         </h2>   
         <button type="button"
         @click="exit" >
            <Icon name="ic:baseline-close" width="24px" height="24px" class="mr-3" />
         </button>   
      </div>
      
      <form @submit="onSubmit"  class="form" >
         <Input 
            placeholder="Назва посади"
            v-model="jobtitle"
            v-bind="jobtitleAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Назва посади в родовому відм."
            v-model="jobtitleadd"
            v-bind="jobtitleaddAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="П І Б"
            v-model="name"
            v-bind="nameAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="П І Б в родовому відм."
            v-model="nameadd"
            v-bind="nameaddAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Документ - підстава дії"
            v-model="document"
            v-bind="documentAttrs"
            class="input"
            type="text"
         />

         <Button :disabled="isPending" variant="secondary" class="mt-3 hover:text-white" style="background-color: #bbb; ">
            {{ isPending ? 'Загрузка...' : 'Зберегти' }}
         </Button>
      </form>
   </div>
</template>

<style lang="sass" scoped>

.wrapp
   margin: 10px 20px
   border: 2px solid  #aaa
   border-radius: 10px

.input
   @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border transition-colors

</style> 
