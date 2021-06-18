import React from 'react'
import { useLocales } from 'hooks'
import { DONE, CRAFT, REWARD, KAPPA } from 'constants/tags'
import DialogTitle from 'components/DialogTitle'
import Spacer from 'components/Spacer'
import DialogFilterGroup from 'components/DialogFilterGroup'

export default () => {
  const { __ } = useLocales()
  return (
    <>
      <DialogTitle>
        {__`Filter settings`}
      </DialogTitle>
      <DialogFilterGroup
        filterKey={DONE}
        labelTrue={__`Found`}
        labelFalse={__`Not found`}
      />
      <Spacer />
      <DialogFilterGroup
        filterKey={CRAFT}
        labelTrue={__`Craftable`}
        labelFalse={__`Not craftable`}
      />
      <Spacer />
      <DialogFilterGroup
        filterKey={REWARD}
        labelTrue={__`Can be rewarded`}
        labelFalse={__`Can't be rewarded`}
      />
      <Spacer />
      <DialogFilterGroup
        filterKey={KAPPA}
        labelTrue={__`Need for Kappa`}
        labelFalse={__`Don't need for Kappa`}
      />
    </>
  )
}
