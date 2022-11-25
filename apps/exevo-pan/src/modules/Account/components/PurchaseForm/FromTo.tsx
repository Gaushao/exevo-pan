import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { Text, CopyButton } from 'components/Atoms'
import { capitalizeFirstLetter } from 'utils'

// eslint-disable-next-line react/require-default-props
type FromToProps = { from?: string; to: string } & JSX.IntrinsicElements['span']

const FromTo = ({ from, to, className, ...props }: FromToProps) => {
  const {
    translations: { common },
  } = useTranslations()
  return (
    <span
      className={clsx(className, 'my-2 flex items-center gap-1 text-center')}
      {...props}
    >
      {capitalizeFirstLetter(common.transfer)}
      {from ? (
        <>
          {' '}
          {common.from} <strong>{from}</strong>{' '}
        </>
      ) : null}
      <Text.Transfer currency="tc" amount={250} className="mx-1.5" />
      <a
        className="text-primaryHighlight font-bold"
        href="https://www.tibia.com/community/?name=Ksu"
        target="_blank"
        rel="noreferrer external"
      >
        {to}
      </a>
      <CopyButton copyString={to} />
    </span>
  )
}

export default FromTo
