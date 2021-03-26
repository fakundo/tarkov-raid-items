import React from 'react'
import Visible from 'components/Visible'
import ItemsVariantGrid from 'components/ItemsVariantGrid'
import ItemsVariantList from 'components/ItemsVariantList'

export default (props) => (
  <>
    <Visible breakpoint="smUp">
      <ItemsVariantGrid {...props} />
    </Visible>
    <Visible breakpoint="xs">
      <ItemsVariantList {...props} />
    </Visible>
  </>
)
