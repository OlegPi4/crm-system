<script lang="ts" setup> 
import { DB } from '~/lib/appwrite';
import { storage } from '~/lib/appwrite';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '~/lib/app.constants';
import { v4 as uuid } from 'uuid';
import type { ICustomer } from '~/types/deals.types';


interface ICustomerFormState
   extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source'> {}

interface InputFileEvent extends Event {
   target: HTMLInputElement
}

useSeoMeta({
   title: 'Редагування компанії'
})

const props = defineProps({
   refetch: {
      type: Function,
   }
})
const route = useRoute()
const customerId = route.params.id as string

const { handleSubmit, defineField, setFieldValue, setValues, values, handleReset } =
   useForm<ICustomerFormState>()

const { data, isSuccess } = useQuery({
   queryKey: ['get custumer', customerId],
   queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),
}) 



watch(isSuccess, () => {
   const initialData = data.value as unknown as ICustomerFormState
   setValues({
      email: initialData.email,
      avatar_url: initialData.avatar_url,
      from_source: initialData.from_source || '',
      name: initialData.name
   })
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [fromsource, fromsourceAttrs] = defineField('from_source')

const { mutate, isPending } = useMutation({
   mutationKey: ['update customer', customerId],
   mutationFn: (data: ICustomerFormState) => DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data),
   onSuccess(){
      props.refetch && props.refetch()
      handleReset()
   }
})

const onSubmit = handleSubmit(values => {
   mutate(values)
})

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
   mutationKey: ['upload image'], 
   mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
   onSuccess(data) {
      const response = storage.getFileDownload(STORAGE_ID, data.$id)
      setFieldValue('avatar_url', response.href)
   }

})

</script>

<template>
   <div class="p-10">
      <h2 class="font-bold text-2xl mb-10">
         Редагування {{ (data as unknown as ICustomerFormState)?.name }}
      </h2>
      <form @submit="onSubmit"  class="form" >
         <Input 
            placeholder="Назва"
            v-model="name"
            v-bind="nameAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Email"
            v-model="email"
            v-bind="emailAttrs"
            class="input"
            type="email"
         />
         <Input 
            placeholder="Джерело залучення"
            v-model="fromsource"
            v-bind="fromsourceAttrs"
            class="input"
            type="text"
         />
         <img 
            v-if="values.avatar_url || isUploadImagePending"
            :src="values.avatar_url"
            alt=""
            width="50"
            height="50"
            class="roumded-full my-2"
         />
         <div class="grid w-full max-w-sm items-center gap-1.5 input">
            <label for="Логотип">
               <Input
                  type="file"
                  :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
                  :disabled="isUploadImagePending"
               />
            </label>
         </div>
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