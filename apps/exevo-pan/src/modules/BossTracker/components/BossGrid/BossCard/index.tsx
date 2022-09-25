import clsx from 'clsx'
import { SpritePortrait } from 'components/Atoms'
import { InfoTooltip, Tooltip, ClientComponent } from 'components/Organisms'
import { loadBossSrc } from 'utils'
import PinIcon from 'assets/svgs/pin.svg'
import useTimeAgo from './useTimeAgo'
import { formatChance, getChanceClass } from './utils'
import { BossCardProps } from './types'

const BossCard = ({ bossStats, pinned, onPìn }: BossCardProps) => {
  const {
    name,
    currentChance,
    daysLeftForPossibleSpawns,
    expectedIn,
    lastAppearence,
  } = bossStats

  const lastSeenText = useTimeAgo(lastAppearence)

  const chancePercent = formatChance(currentChance)
  const chanceClass = getChanceClass(currentChance)

  return (
    <li className="card flex items-center gap-2">
      <SpritePortrait
        src={loadBossSrc(name)}
        alt={name}
        offset
        width={64}
        height={64}
      />
      <div className="grid gap-1">
        <h4 className="text-base">
          {name}{' '}
          {lastSeenText && <InfoTooltip content={lastSeenText} labelSize />}
        </h4>

        {daysLeftForPossibleSpawns ? (
          <div className="flex flex-wrap items-center gap-2">
            {daysLeftForPossibleSpawns.map((daysLeft, index) => {
              const isAvailable = daysLeft <= 0

              return (
                <Tooltip
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${name}-${index}-${daysLeft}`}
                  content={
                    <div className="grid gap-2">
                      <p>
                        This creature has{' '}
                        <strong>{daysLeftForPossibleSpawns.length}</strong>{' '}
                        different spawn locations.
                      </p>

                      <p>
                        {isAvailable ? (
                          <>
                            It is{' '}
                            <strong className="text-green">possible</strong> to
                            spawn at this spot.
                          </>
                        ) : (
                          <>
                            There are{' '}
                            <strong className="text-red">
                              {daysLeft} days left
                            </strong>{' '}
                            before it can spawn at this spot.
                          </>
                        )}
                      </p>

                      <p>
                        It&apos;s up to you to figure out which spot this is 🕵️‍♂️
                      </p>
                    </div>
                  }
                >
                  <small>{daysLeft > 0 ? '🟥' : '🟩'}</small>
                </Tooltip>
              )
            })}
          </div>
        ) : (
          <>
            <small
              title="Chance to spawn today"
              className={clsx(
                'text-tsm',
                {
                  UNKNOWN: 'text-separator',
                  ZERO: 'text-red',
                  POSSIBLE: 'text-onSurface',
                  LIKELY: 'text-greenHighlight',
                }[chanceClass],
              )}
            >
              {
                {
                  UNKNOWN: 'Unknown',
                  ZERO: 'No chance',
                  POSSIBLE: chancePercent,
                  LIKELY: chancePercent,
                }[chanceClass]
              }
            </small>

            {expectedIn && (
              <small className="text-onSurface text-xs font-light">
                Expected in:{' '}
                <span className="font-normal">{expectedIn} days</span>
              </small>
            )}
          </>
        )}
      </div>

      <button
        type="button"
        className="clickable ml-auto grid place-items-center self-start rounded p-1"
        onClick={() => onPìn(name)}
      >
        <ClientComponent>
          <PinIcon
            className={clsx(
              'h-4 w-4 transition-all',
              pinned ? 'fill-primaryHighlight' : 'fill-separator',
            )}
            style={{ rotate: pinned ? 'unset' : '45deg' }}
          />
        </ClientComponent>
      </button>
    </li>
  )
}

export default BossCard
