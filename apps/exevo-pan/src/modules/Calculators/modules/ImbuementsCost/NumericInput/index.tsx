/* eslint-disable react/require-default-props */
import { useState, useCallback } from 'react'
import { Input } from 'components/Atoms'
import { formatNumberWithCommas } from 'utils'
import { parseValue } from './utils'
import { NumericInputProps } from './types'

const NumericInput = ({
  value = 0,
  step = 100,
  onChange,
  ...props
}: NumericInputProps) => {
  const [touched, setTouched] = useState(false)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setTouched(true)
      const parsed = parseValue(e.target.value)
      if (Number.isInteger(parsed)) onChange(parsed)
    },
    [onChange],
  )

  const handleKey: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        setTouched(true)
        const modifier = e.key === 'ArrowUp' ? 1 : -1
        const parsed = parseValue(e.currentTarget.value)
        if (Number.isInteger(parsed))
          onChange(Math.max(parsed + modifier * step, 0))
      }
    },
    [step, onChange],
  )

  const isZero = value === 0
  const displayedValue = isZero ? '' : formatNumberWithCommas(value)

  return (
    <Input
      inputMode="numeric"
      noAlert
      value={displayedValue}
      onChange={handleChange}
      onKeyDown={handleKey}
      placeholder="GP value"
      error={touched && isZero}
      {...props}
    />
  )
}

export default NumericInput
