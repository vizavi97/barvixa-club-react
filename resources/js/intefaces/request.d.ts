export interface MainInterface {
  hallId: null | number | string
  placeId: null | number | string
  categoryId: null | number | string
  request: [] | RequestFoodInterface[]
  amount: number
}

export interface RequestFoodInterface {
  title: string,
  count: number,
  cost: number
  id: number,
}



export interface sameProductCheckedInterface {
  isSame: boolean,
  key: null | number
}
