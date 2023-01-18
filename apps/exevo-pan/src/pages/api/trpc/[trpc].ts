import * as trpcNext from '@trpc/server/adapters/next'
import { router } from 'server/trpc'
import { routes } from 'server/routes'
import { createContext } from 'server/context'

const appRouter = router(routes)

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
