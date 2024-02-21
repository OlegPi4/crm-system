<script lang="ts" setup> 
import { DB } from '~/lib/appwrite';
import { useMutation } from '@tanstack/vue-query';
import { COLLECTION_OURBANKRECV, DB_ID } from '~/lib/app.constants';
import type { IOurBankRecvizits } from '~/types/company.types';
import { v4 as uuid} from 'uuid'

interface IOurBankRekvFormState extends IOurBankRecvizits{} 


useSeoMeta({
   title: 'додати банківські реквізити '
})

const { handleSubmit, defineField, handleReset } =
   useForm<IOurBankRekvFormState>()

const emit = defineEmits(['exit-add'])

const [mfo, mfoAttrs] = defineField('mfo')
const [namebank, namebankAttrs] = defineField('namebank')
const [account, accountAttrs] = defineField('account')

const { mutate, isPending } = useMutation({
   mutationKey: ['create rekvuzut'],
   mutationFn: (data: IOurBankRekvFormState) => DB.createDocument(DB_ID, COLLECTION_OURBANKRECV, uuid(), data),
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
            Додати банківські реквізити 
         </h2>   
         <button type="button"
         @click="exit" >
            <Icon name="ic:baseline-close" width="24px" height="24px" class="mr-3" />
         </button>   
      </div>
      <form @submit="onSubmit"  class="form" >
         <Input 
            placeholder="МФО банку"
            v-model="mfo"
            v-bind="mfoAttrs"
            class="input"
            type="number"
         />
         <Input 
            placeholder="Назва банку"
            v-model="namebank"
            v-bind="namebankAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Рахунок"
            v-model="account"
            v-bind="accountAttrs"
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
