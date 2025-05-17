import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const roleContext = createContext()

export const RolesProvider = ({ children }) => {
  const auth = useSelector(state => state.auth)
  const token = auth.token
  const [rolesDrop, setRolesDrop] = React.useState('')
  const [roles, setRoles] = useState([])

  const handleRolesChange = event => {
    setRolesDrop(event.target.value)
  }

  const fetchAllRoles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/ap/admin/all/roles`, {
        headers: {
          'x-access-token': token
        }
      })
      const data = response.data.data
      setRoles(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchAllRoles()
      const intervalId = setInterval(fetchAllRoles, 5000)
      return () => clearInterval(intervalId)
    }
  }, [])

  return <roleContext.Provider value={{ roles, handleRolesChange, rolesDrop }}>{children}</roleContext.Provider>
}
