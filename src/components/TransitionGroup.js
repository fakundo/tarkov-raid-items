import React, { Fragment } from 'react'
import { TransitionGroup } from 'react-transition-group'

export default (props) => (
  <TransitionGroup
    component={Fragment}
    appear={false}
    exit={false}
    {...props}
  />
)
