
import React, { useEffect, useState } from 'react'
import api from '../api/AxiosApi';
export const isAuthenticated = async () => {

  try {
    const response = await api.get('/api/v2/check-auth')

    return response?.data;


  } catch (e) {
    console.log(e)
  }
  // return false;

  // console.error(error)
  // console.log("this is error" + error)

  return false;

};
