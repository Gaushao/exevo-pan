import clsx from 'clsx'
import { LabeledCard, Input, Button, Text } from 'components/Atoms'
import { CheckIcon } from 'assets/svgs'

/* 
explicar o que é exevo pro
    acesso ilimitado a features exlcusivas
    preço
    forever
read more (link pra landing page)

send 250 TC to Ksu
From
Delivery time tooltip

*/

const Li = ({ className, children, ...props }: JSX.IntrinsicElements['li']) => (
  <li className={clsx('flex items-center gap-1', className)} {...props}>
    <CheckIcon className="fill-greenHighlight" />
    {children}
  </li>
)

const UpgradeToPro = () => {
  console.log(9)

  return (
    <div className="grid gap-8">
      <div className="grid place-items-center gap-8">
        <div className="grid place-items-center gap-2">
          <p className="flex items-center gap-2">
            Upgrade now to{' '}
            <strong className="text-primaryHighlight text-2xl tracking-wider">
              Exevo Pro 🧙
            </strong>
          </p>
          <p>And have access to exclusive features!</p>
        </div>

        <div className="text-tsm grid gap-4">
          <ul className="grid gap-2">
            <Li>Find out how much TC was invested in any Bazaar character</Li>
            <Li>
              {' '}
              Exclusive <strong>auction filters</strong>
            </Li>
            <Li>
              Access to all bosses from <strong>Boss Tracker</strong>
            </Li>
          </ul>
          <p className="text-right">...and more in the future!</p>
        </div>

        <p className="flex items-center gap-2">
          Pay once, yours <strong className="text-2xl">forever 🙌</strong>
        </p>
      </div>
      <LabeledCard labelText="Buy now">
        <span className="text-tsm mb-1 flex items-center gap-1">
          Transfer
          <Text.TibiaCoin value={250} /> Tibia Coins to{' '}
          <strong className="text-primaryHighlight">Ksu</strong>
        </span>

        <div className="flex items-end gap-4">
          <Input
            label="Sending coins character"
            placeholder="e.g, 'Bubble'"
            noAlert
            className="w-full"
          />
          <Button type="button" pill className="mb-[1px] py-3">
            Confirm
          </Button>
        </div>
      </LabeledCard>
    </div>
  )
}

export default UpgradeToPro
