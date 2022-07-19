import { useMemo } from 'react'
import { useStoredState } from 'hooks'
import { useTranslations } from 'contexts/useTranslation'
import { Checkbox, Text } from 'components/Atoms'
import { Select, InfoTooltip, ClientComponent } from 'components/Organisms'
import { isObjectEmpty } from 'utils'
import {
  LabeledCard,
  Chip,
  ChipWrapper,
  Group,
  Empty,
  TimeBubbles,
} from '../../../components'
import {
  autoRequiredWeaponsCount,
  customRequiredWeaponsCount,
  calculateCost,
} from './utils'
import { weaponOptions } from './options'
import * as S from './atoms'
import * as CONSTANTS from './constants'
import { SummaryProps, WeaponOption, WeaponsObject } from './types'

const Summary = ({ pointsRequired }: SummaryProps) => {
  const {
    translations: { common, calculators },
  } = useTranslations()

  const [hasDummy, setHasDummy] = useStoredState('ew-dummy', false)
  const [isDouble, setIsDouble] = useStoredState('ew-double', false)
  const [exerciseWeapon, setExerciseWeapon] = useStoredState<WeaponOption>(
    'ew-exerciseWeapon',
    'auto',
  )

  const weaponsRequired: WeaponsObject = useMemo(() => {
    const finalPointsRequired =
      pointsRequired /
      (hasDummy ? CONSTANTS.DIVIDER.hasDummy : 1) /
      (isDouble ? CONSTANTS.DIVIDER.isDouble : 1)

    return exerciseWeapon === 'auto'
      ? autoRequiredWeaponsCount(finalPointsRequired)
      : customRequiredWeaponsCount(finalPointsRequired, exerciseWeapon)
  }, [pointsRequired, hasDummy, isDouble, exerciseWeapon])

  const cost = useMemo(() => calculateCost(weaponsRequired), [weaponsRequired])

  return (
    <div className="grid gap-6">
      <LabeledCard labelText="Extra">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <ClientComponent className="grid gap-4">
            <Checkbox
              label="Exercise dummy"
              checked={hasDummy}
              onChange={(e) => setHasDummy(e.target.checked)}
            />
            <Checkbox
              label="Double event"
              checked={isDouble}
              onChange={(e) => setIsDouble(e.target.checked)}
            />
          </ClientComponent>

          <Select
            label={calculators.ExerciseWeapons.labels.weaponCharges}
            options={weaponOptions}
            value={exerciseWeapon}
            onChange={(e) => setExerciseWeapon(e.target.value as WeaponOption)}
            noAlert
            className="w-[180px]"
          />
        </div>
      </LabeledCard>

      <LabeledCard labelText={calculators.ExerciseWeapons.labels.results}>
        <Group>
          <InfoTooltip.LabelWrapper className="font-bold">
            {calculators.ExerciseWeapons.labels.moneyCost}
            <InfoTooltip
              labelSize
              content={
                <span className="block w-36 leading-tight">
                  {calculators.ExerciseWeapons.moneyTooltip.a}{' '}
                  <strong>{calculators.ExerciseWeapons.moneyTooltip.b}</strong>{' '}
                  {calculators.ExerciseWeapons.moneyTooltip.c}{' '}
                  <Text.GoldCoin
                    value={10500}
                    style={{ alignItems: 'baseline' }}
                  />{' '}
                  gp {calculators.ExerciseWeapons.moneyTooltip.d}{' '}
                  <strong>{calculators.ExerciseWeapons.moneyTooltip.e}</strong>.
                </span>
              }
            />
          </InfoTooltip.LabelWrapper>
          <ChipWrapper className="shrink-0 flex-wrap">
            <Chip>
              <Text.TibiaCoin value={cost.tc} />
            </Chip>
            <small className="-mx-2.5 font-light">{common.or}</small>
            <Chip>
              <Text.GoldCoin value={cost.gold} />
            </Chip>
          </ChipWrapper>
        </Group>

        <Group>
          <p>
            <strong>{calculators.ExerciseWeapons.labels.weapons}</strong>
          </p>
          <ClientComponent>
            <ChipWrapper className="flex-wrap">
              <Chip aria-hidden={!weaponsRequired.lasting}>
                <S.Weapon.lasting /> lasting weapons
                <S.ActiveCount>{weaponsRequired.lasting}x</S.ActiveCount>
              </Chip>
              <Chip aria-hidden={!weaponsRequired.durable}>
                <S.Weapon.durable /> durable weapons
                <S.ActiveCount>{weaponsRequired.durable}x</S.ActiveCount>
              </Chip>
              <Chip aria-hidden={!weaponsRequired.regular}>
                <S.Weapon.regular /> regular weapons
                <S.ActiveCount>{weaponsRequired.regular}x</S.ActiveCount>
              </Chip>
              <Empty aria-hidden={!isObjectEmpty(weaponsRequired)}>
                {calculators.none}
              </Empty>
            </ChipWrapper>
          </ClientComponent>
        </Group>

        <Group>
          <p>
            <strong>{calculators.ExerciseWeapons.labels.time}</strong>
          </p>
          <ClientComponent>
            <TimeBubbles seconds={cost.seconds} />
          </ClientComponent>
        </Group>
      </LabeledCard>
    </div>
  )
}

export default Summary
