<script setup lang="ts">
import { account } from "@/lib/appwrite";
import { v4 as uuid} from 'uuid'

useHead({
   title: 'Login',
})

const emailRef = ref('');
const password = ref('');
const name = ref('');

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
   isLoadingStore.set(true);
   await account.createEmailSession(emailRef.value, password.value);
   const response = await account.get()   

   if(response) {
      authStore.set({
         email: response.email,
         name: response.name,
         status: response.status,
         labels: response.labels,
      })
   }
   emailRef.value = '';
   password.value = '';
   name.value = '';

   await router.push('/');
   isLoadingStore.set(false)
}

const registr = async () => {
   await account.create(uuid(), emailRef.value, password.value, name.value,);
   await login();
}

</script>
<template>
   <div class="flex item-centre justify-center min-h-60 w-full mt-60 ">
      <div class="rounder bg-sidebar w-1/3 p-5 ">
         <h1 class="text-center mb-5"
         style="font-size: 36px;
         font-weight: 700;
         color: antiquewhite;">Login</h1>
      <form>
         <Input placeholder="Email" type="email" class="mb-3"
         style="color: aliceblue;"
         v-model="emailRef" />
         <Input placeholder="Password" type="password" class="mb-3"
         style="color: aliceblue;"
         v-model="password" />
         <Input placeholder="Name" type="name" class="mb-3"
         style="color: aliceblue;"
         v-model="name" />   
         <div class="flex items-center justify-center gap-5">
            <Button type="button" @click="login" >Login</Button>
            <Button type="button" @click="registr" >Register</Button>
         </div>
      </form>
      </div>
      
   </div>
   
</template>