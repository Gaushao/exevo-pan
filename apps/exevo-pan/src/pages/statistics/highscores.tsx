import Head from 'next/head'
import { Main } from 'templates'
import { Header, HighscoresGrid } from 'modules/Statistics'
import { Top10Data } from 'modules/Statistics/components/HighscoresGrid/types'
import { HistoryStatisticsClient } from 'services/server'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl, buildPageTitle } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, statistics } from 'locales'

const pageUrl = buildUrl(routes.HIGHSCORES)

export default function Highscores({ top10Data }: { top10Data: Top10Data }) {
  const { translations } = useTranslations()

  const pageTitle = buildPageTitle(
    translations.statistics.Meta.Highscores.title,
  )

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.statistics.Meta.Highscores.description}
        />
        <meta
          property="twitter:description"
          content={translations.statistics.Meta.Highscores.description}
        />
        <meta
          property="og:description"
          content={translations.statistics.Meta.Highscores.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.HIGHSCORES, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.HIGHSCORES, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.HIGHSCORES, 'pl')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Main>
        <main>
          <Header />
          <HighscoresGrid top10Data={top10Data} />
        </main>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const {
    top10Axe,
    top10Bid,
    top10Club,
    top10Distance,
    top10Fishing,
    top10Fist,
    top10Level,
    top10Magic,
    top10Shielding,
    top10Sword,
  } = await HistoryStatisticsClient.fetchStatisticsData()

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        statistics: statistics[locale as RegisteredLocale],
      },
      top10Data: {
        top10Axe,
        top10Bid,
        top10Club,
        top10Distance,
        top10Fishing,
        top10Fist,
        top10Level,
        top10Magic,
        top10Shielding,
        top10Sword,
      },
    },
  }
}
