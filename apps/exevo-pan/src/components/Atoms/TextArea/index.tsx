import { forwardRef, useState } from 'react'
import clsx from 'clsx'
import { useUuid } from 'hooks'
import Label from '../Label'
import FormError from '../FormError'
import { TextAreaProps } from './types'

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id: idProp,
      className,
      label,
      value: valueProp,
      defaultValue,
      onChange,
      disabled = false,
      error,
      noAlert = false,
      noResize,
      style,
      ...props
    },
    ref,
  ) => {
    const textboxId = idProp ?? useUuid()
    const errorId = useUuid()

    const [value, setValue] = useState(valueProp ?? defaultValue ?? '')
    const derivedValue = valueProp ?? value

    const handleInput: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      onChange?.(e)
      setValue(e.target.value)
    }

    return (
      <div className={clsx('text-tsm flex flex-col', className)} style={style}>
        <Label htmlFor={textboxId} className="mb-2 shrink-0">
          {label}
        </Label>
        <textarea
          ref={ref}
          id={textboxId}
          aria-invalid={!!error}
          aria-errormessage={error ? errorId : undefined}
          autoComplete="off"
          disabled={disabled}
          onInput={handleInput}
          className={clsx(
            'border-1 text-tsm custom-scrollbar max-w-full grow rounded-md border-solid py-2.5 px-4 leading-tight outline-none transition-colors',
            noResize && 'resize-none',
            error ? 'border-red' : 'border-separator focus:border-primary',
            disabled
              ? 'text-onSurface/50 bg-separator/50'
              : 'text-onSurface bg-surface',
          )}
          style={{ minWidth: 'inherit' }}
          value={derivedValue}
          {...props}
        />
        {!noAlert && (
          <FormError id={errorId} error={error} className="shrink-0" />
        )}
      </div>
    )
  },
)

export default TextArea
