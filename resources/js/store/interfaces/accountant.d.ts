export interface AccountantStateInterface {
  consumables: [] | ConsumablesInterface[]
  isLoading: boolean
  isChoseConsumables: [] | ConsumablesInterface[]
  filteredString: string
}

export interface ConsumablesInterface {
  id: number
  title: string
  type: string
  group: string
  price: string | number
  count: number,
  cost: number,
  amount: number
}

export interface AccountantDispatchInterface {
  consumables: [] | ConsumablesInterface[]
  isLoading: boolean
}

export interface ChooseConsumablesDispatchInterface {
  isChoseConsumables: ConsumablesInterface | number | string | []
}

export interface ChangeFilteredStringDispatchInterface {
  filteredString: string
}

export interface ChangeConsumableInArrayDispatchInterface {
  id: number | string,
  name: string,
  value: number
}
