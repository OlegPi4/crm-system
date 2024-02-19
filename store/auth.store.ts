import { defineStore } from "pinia"

interface IAuthStore {
   email: string
   name: string
   status: boolean
   labels: [string]
}

const defaultValue: {user: IAuthStore} = {
   user: {
      email: '',
      name: '',
      status: false,
      labels: ['']
   }
}

export const useAuthStore = defineStore('auth', {
   state: () => defaultValue,
   getters: {
      isAuth: state => state.user.status,
      isRole: state => state.user.labels,
   },
   actions: {
      clear(){
         this.$patch(defaultValue)
      },
      set(input: IAuthStore) {
         this.$patch({user: input})
      }
   }
})

export const useIsLoadingStore = defineStore('isloading', {
   state: () => ({
      isLoading: true,
   }),
   
   actions: {
      set(data: boolean) {
         this.$patch({isLoading: data})
      }
   }
})