<script lang="ts" setup>

useSeoMeta({
   title: 'Наша компанія'
})

</script>
<template>
   <div class="p-10">
      <h1 class="font-bold text-xl mb-10">Налаштування власної компанії</h1>
      <div class="company name">
         <h2  class="company__title">  Назва та юридична адресса </h2>
         <div class="wrapper">
            <LayoutTabCompany>
            </LayoutTabCompany>
         </div>
      </div>
      <div class="company chif">
         <h2  class="company__title"> Посадові особи </h2>
         <div class="wrapper">
            <LayoutTabChifs>
            </LayoutTabChifs>
         </div>
      </div>
      <div class="company rekvizit">
         <h2  class="company__title">  Банківські реквізити </h2>
         <div class="wrapper">
            <LayoutTabRekvizits>
            </LayoutTabRekvizits>
         </div>
      </div>


   </div>
</template>

<style lang="sass" scoped>

.company
   border: 2px solid #aaa
   border-radius: 10px 
   margin-bottom: 10px

.company__title
   padding: 5px 10px
   font-size: 18px
   font-weight: 600
</style>