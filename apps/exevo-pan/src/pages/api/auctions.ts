import type { VercelRequest } from '@vercel/node'
import { getToken, JWT } from 'next-auth/jwt'
import { endpoints } from 'Constants'
import { pluckTCInvested } from 'utils'

const isPro = (token: JWT | null) => token && token.proStatus

export default async (request: VercelRequest) => {
  const { method, url } = request

  if (method !== 'GET') {
    return new Response(JSON.stringify({ error: `${method} not allowed` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { searchParams } = new URL(url ?? '')

  try {
    const isHistory = searchParams.get('history') === 'true'

    const endpoint = new URL(
      endpoints[isHistory ? 'HISTORY_AUCTIONS' : 'CURRENT_AUCTIONS'],
    )

    const token = await getToken({ req: request })

    searchParams.delete('history')
    endpoint.search = searchParams.toString()

    const result = await fetch(endpoint.toString())

    if (isPro(token)) {
      return new Response(result.body, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const parsedResult: PaginatedData<CharacterObject> = await result.json()
    parsedResult.page = parsedResult.page.map(pluckTCInvested)

    return new Response(JSON.stringify(parsedResult), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config = {
  runtime: 'experimental-edge',
}
