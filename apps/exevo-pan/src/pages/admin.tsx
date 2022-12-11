import Head from 'next/head'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { buildPageTitle } from 'utils'
import { useSession } from 'next-auth/react'
import { common } from 'locales'

export default function Admin() {
  const pageTitle = buildPageTitle('Admin')

  const { data } = useSession()
  const isAdmin = data?.user.role === 'ADMIN'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Main>
        <main>{isAdmin && <div>ok</div>}</main>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
    },
  },
})
