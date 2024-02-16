import { useQuery } from "@tanstack/vue-query";
import { DB } from '~/lib/appwrite'
import { COLLECTION_DEALS, DB_ID } from "~/lib/app.constants";
import { useDealSlideStore } from '~/store/deal-slide.store' 

export function useComents() {
   const store = useDealSlideStore()
   const cardId = store.card?.id || ''

   return useQuery({
      queryKey: ['deal', cardId],
      queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId),
   })
}

