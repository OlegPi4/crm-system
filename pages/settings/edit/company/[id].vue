<script lang="ts" setup> 
import { DB } from '~/lib/appwrite';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { COLLECTION_OURCOMPANY, DB_ID } from '~/lib/app.constants';
import type { IOurCompany } from '~/types/company.types';

interface IOurCompanyFormState extends IOurCompany{} 


useSeoMeta({
   title: 'Редагування  власної компанії'
})

const route = useRoute()
const companyId = route.params.id as string

const { handleSubmit, defineField, setFieldValue, setValues, values } =
   useForm<IOurCompanyFormState>()

const { data, isSuccess } = useQuery({
   queryKey: ['get company', companyId],
   queryFn: () => DB.getDocument(DB_ID, COLLECTION_OURCOMPANY, companyId),
}) 



watch(isSuccess, () => {
   const initialData = data.value as unknown as IOurCompanyFormState
   setValues({
      namelong: initialData.namelong,
      nameshort: initialData.nameshort,
      address: initialData.address,
      edrpo: initialData.edrpo
   })
})

const [namelong, namelongAttrs] = defineField('namelong')
const [nameshort, nameshortAttrs] = defineField('nameshort')
const [address, addressAttrs] = defineField('address')
const [edrpo, edrpoAttrs] = defineField('edrpo')

const { mutate, isPending } = useMutation({
   mutationKey: ['update ourcompany', companyId],
   mutationFn: (data: IOurCompanyFormState) => DB.updateDocument(DB_ID, COLLECTION_OURCOMPANY, companyId, data)
})

const onSubmit = handleSubmit(values => {
   mutate(values)
})

</script>

<template>
   <div class="p-10">
      <h2 class="font-bold text-2xl mb-10">
         Редагування данних власної компанії 
      </h2>
      <form @submit="onSubmit"  class="form" >
         <Input 
            placeholder="Повна назва"
            v-model="namelong"
            v-bind="namelongAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Скорочена назва"
            v-model="nameshort"
            v-bind="nameshortAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Юридична адреса"
            v-model="address"
            v-bind="addressAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Код ЄДРПОУ"
            v-model="edrpo"
            v-bind="edrpoAttrs"
            class="input"
            type="number"
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