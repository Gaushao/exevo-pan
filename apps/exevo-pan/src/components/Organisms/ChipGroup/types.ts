import { InputHTMLAttributes } from 'react'

export type Option = {
  name: string | React.ReactNode
  value: string
}

export type TypedOption<T> = {
  value: T
} & Omit<Option, 'value'>

type CustomProps = {
  options: Option[]
}

type ExtendedProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'label'>

export type ChipGroupProps = CustomProps & ExtendedProps & AccessibleLabelProps

export type OptionProps = {
  groupName?: string
} & Option &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>
