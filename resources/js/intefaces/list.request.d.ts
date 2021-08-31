export interface ListRequest {
  amount: number
  cashier_id: number
  id: number
  products: [] | ProductFromRequestInterface[]
  hall_id: number
  place_id: number
  status_id: number
  waiter_id: number
  created_at: Date
  updated_at: Date
  closed_at: Date
}


export interface ProductFromRequestInterface {
  count: number
  id: number
  product_id: number
  request_id: number
  total_value: number
  created_at: Date
  updated_at: Date
}
