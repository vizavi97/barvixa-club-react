import React, {useEffect} from 'react'
import {Block} from "../../../config/ui/Block";
import axios from "axios";
import {BACKEND_API_URL} from "../../../config/app.config";

interface ListRequestInterface {
  isCreate: boolean
}

export const ListRequest: React.FC<ListRequestInterface> = ({isCreate}) => {
  useEffect(() => {
    axios.get(`${BACKEND_API_URL}request`, {
      headers: {
        "Authorization": `${localStorage.getItem('token')}`
      }
    })
      .then(resp => console.log(':LIST response:', resp.data))
      .catch(error => console.log(":LIST error:", error))
  }, [isCreate]);

  if (isCreate) return null
  return (
    <Block mt={4}>
      ListRequest
    </Block>
  )
}
