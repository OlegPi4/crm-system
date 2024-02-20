<script lang="ts" setup> 
import { DB } from '~/lib/appwrite';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { COLLECTION_OURBANKRECV, DB_ID } from '~/lib/app.constants';
import type { IOurBankRecvizits } from '~/types/company.types';

interface IOurBankRekvFormState extends IOurBankRecvizits{} 


useSeoMeta({
   title: 'Редагування посадових осіб '
})

const route = useRoute()
const docId = route.params.id as string

const { handleSubmit, defineField, setFieldValue, setValues, values } =
   useForm<IOurBankRekvFormState>()

const { data, isSuccess } = useQuery({
   queryKey: ['get person', docId],
   queryFn: () => DB.getDocument(DB_ID, COLLECTION_OURBANKRECV, docId),
}) 



watch(isSuccess, () => {
   const initialData = data.value as unknown as IOurBankRekvFormState
   setValues({
      mfo: initialData.mfo,
      namebank: initialData.namebank,
      account: initialData.account,
   })
})

const [mfo, mfoAttrs] = defineField('mfo')
const [namebank, namebankAttrs] = defineField('namebank')
const [account, accountAttrs] = defineField('account')

const { mutate, isPending } = useMutation({
   mutationKey: ['update ourcompany', docId],
   mutationFn: (data: IOurBankRekvFormState) => DB.updateDocument(DB_ID, COLLECTION_OURBANKRECV, docId, data)
})

const onSubmit = handleSubmit(values => {
   mutate(values)
})

</script>

<template>
   <div class="p-10">
      <h2 class="font-bold text-2xl mb-10">
         Редагування посадових осіб 
      </h2>
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
.input
   @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border transition-colors

</style>