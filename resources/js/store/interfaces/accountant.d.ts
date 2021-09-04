export interface AccountantStateInterface {
  consumables: [] | ConsumablesInterface[]
  isLoading: boolean
  isChoseConsumables: [] | ConsumablesInterface[]
}

export interface ConsumablesInterface {
  id: number
  title: string
  type: string
  group: string
  price: string | number
}

export interface AccountantDispatchInterface {
  consumables: [] | ConsumablesInterface[]
  isLoading: boolean
}

export interface chooseConsumablesDispatchInterface {
  isChoseConsumables: ConsumablesInterface | number | string
}
