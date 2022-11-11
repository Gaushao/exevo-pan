import { memo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import { useOnImageLoad } from 'hooks'
import ActiveCount from '../ActiveCount'
import { BackgroundProps, SpritePortraitProps } from './types'

export const Background = ({
  className,
  offset = false,
  highlight = false,
  ...props
}: BackgroundProps) => (
  <div
    className={clsx(
      'relative select-none rounded-md p-2 shadow transition-colors',
      offset ? `h-14 w-14` : 'h-12 w-12',
      highlight ? 'bg-primaryHighlight' : 'bg-primaryVariant',
      className,
    )}
    {...props}
  />
)

const SpritePortrait = ({
  offset = false,
  highlight = false,
  counter,
  src,
  alt,
  width,
  height,
  onError,
  ...props
}: SpritePortraitProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const [loaded, onLoadingComplete] = useOnImageLoad()

  return (
    <Background offset={offset} highlight={highlight} {...props}>
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        onLoadingComplete={onLoadingComplete}
        onError={onError}
        unoptimized
        className={clsx(
          'z-1 transition-opacity',
          offset && '!-ml-6 !-mt-6',
          !loaded && 'opacity-0',
        )}
      />
      {!loaded && (
        <div
          role="alert"
          aria-label={common.LoadingLabel}
          aria-busy="true"
          className={clsx(
            'loading-spinner absolute',
            highlight ? 'after:bg-primaryHighlight' : 'after:bg-primaryVariant',
          )}
          style={{ top: 'calc(50% - 12px)', left: 'calc(50% - 12px)' }}
        />
      )}
      {counter !== undefined && (
        <ActiveCount className="z-1 absolute -top-1.5 -right-1.5">
          {counter}
        </ActiveCount>
      )}
    </Background>
  )
}

export default memo(SpritePortrait)
