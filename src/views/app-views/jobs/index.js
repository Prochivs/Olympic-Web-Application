import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import JobsList from './JobsList'
import AddProduct from './add-job'
import EditProduct from './job-details'

const Ecommerce = (props) => {
  const { match } = props
  return <JobsList />
}

export default Ecommerce
