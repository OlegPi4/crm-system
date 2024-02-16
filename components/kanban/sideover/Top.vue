
import type { Card } from '#build/components';
import type dayjs from 'dayjs';
import type { KanbanSideoverLabel } from '#build/components';
import type { KanbanSideoverLabel } from '#build/components';
import type { variants } from '#tailwind-config';
import type { KanbanSideoverLabel } from '#build/components';
import type { converterCurrency } from '~/lib/converterCurrency';
import type { KanbanSideoverLabel } from '#build/components';
import type { KanbanSideoverLabel } from '#build/components';
<script lang="ts" setup>
import { converterCurrency } from '@/lib/converterCurrency'
import dayjs from 'dayjs'; 
import { useDealSlideStore } from '~/store/deal-slide.store' 

const store = useDealSlideStore()

</script>

<template>
   <div class="border-border bg-slate/20 rounded p-3">
      <div class="uppercase bald text-xl mb-4">Подробиці </div>
      <KanbanSideoverLabel label-text="Назва: ">
          <span class="title"> {{ store.card?.name }}</span>
        
      </KanbanSideoverLabel>
      <KanbanSideoverLabel label-text="Вартість">
         {{ converterCurrency(store.card?.price || 0) }}
      </KanbanSideoverLabel> 
      <KanbanSideoverLabel label-text="Cтатус">
         <Badge variant="outline">
            {{ store.card?.status }}
         </Badge>
      </KanbanSideoverLabel>
      <KanbanSideoverLabel label-text="Контрагент">
         {{ store.card?.companyName }}
      </KanbanSideoverLabel>
      <KanbanSideoverLabel label-text="Дата">
         {{ dayjs(store.card?.$createdAt).format('DD MMMM YYYY') }}
      </KanbanSideoverLabel>
   </div>
   
</template>