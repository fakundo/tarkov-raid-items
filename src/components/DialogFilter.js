import React from 'react'
import { useLocales } from 'hooks'
import { DONE, CRAFT, REWARD, KAPPA } from 'constants/tags'
import DialogTitle from 'components/DialogTitle'
import Spacer from 'components/Spacer'
import DialogFilterGroup from 'components/DialogFilterGroup'

export default () => {
  const { gettext } = useLocales()
  return (
    <>
      <DialogTitle>
        { gettext('Filter settings') }
      </DialogTitle>
      <DialogFilterGroup
        filterKey={DONE}
        labelTrue={gettext('Found')}
        labelFalse={gettext('Not found')}
      />
      <Spacer />
      <DialogFilterGroup
        filterKey={CRAFT}
        labelTrue={gettext('Craftable')}
        labelFalse={gettext('Not craftable')}
      />
      <Spacer />
      <DialogFilterGroup
        filterKey={REWARD}
        labelTrue={gettext('Can be rewarded')}
        labelFalse={gettext('Can\'t be rewarded')}
      />
      <Spacer />
      <DialogFilterGroup
        filterKey={KAPPA}
        labelTrue={gettext('Need for Kappa')}
        labelFalse={gettext('Don\'t need for Kappa')}
      />
    </>
  )
}
