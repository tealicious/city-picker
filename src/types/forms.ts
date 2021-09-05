export interface Option {
  value: string
  label: string
}

export interface Select {
  name: string
  label: string
  options: Option[]
  value: string
  disabled?: boolean
  placeholder?: string
}
