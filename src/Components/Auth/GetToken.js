
import Cookies from 'js-cookie'
import React from 'react'

function GetToken() {
  return Cookies.get("bearerToken")
}

export default GetToken