import React from 'react'
import SvgIcon from 'components/SvgIcon'
import menuSvg from 'assets/icons/menu.svg'
import languageSvg from 'assets/icons/language.svg'
import visibilitySvg from 'assets/icons/visibility.svg'
import visibilityOffSvg from 'assets/icons/visibility-off.svg'
import addSvg from 'assets/icons/add.svg'
import removeSvg from 'assets/icons/remove.svg'
import closeSvg from 'assets/icons/close.svg'
import filterSvg from 'assets/icons/filter.svg'
import checkCircleOutlineSvg from 'assets/icons/check-circle-outline.svg'
import errorOutlineSvg from 'assets/icons/error-outline.svg'
import searchSvg from 'assets/icons/search.svg'

export const MenuIcon = (props) => (
  <SvgIcon {...menuSvg} {...props} />
)

export const LanguageIcon = (props) => (
  <SvgIcon {...languageSvg} {...props} />
)

export const VisibilityIcon = (props) => (
  <SvgIcon {...visibilitySvg} {...props} />
)

export const VisibilityOffIcon = (props) => (
  <SvgIcon {...visibilityOffSvg} {...props} />
)

export const AddIcon = (props) => (
  <SvgIcon {...addSvg} {...props} />
)

export const RemoveIcon = (props) => (
  <SvgIcon {...removeSvg} {...props} />
)

export const CloseIcon = (props) => (
  <SvgIcon {...closeSvg} {...props} />
)

export const FilterIcon = (props) => (
  <SvgIcon {...filterSvg} {...props} />
)

export const CheckCircleOutlineIcon = (props) => (
  <SvgIcon {...checkCircleOutlineSvg} {...props} />
)

export const ErrorOutlineIcon = (props) => (
  <SvgIcon {...errorOutlineSvg} {...props} />
)

export const SearchIcon = (props) => (
  <SvgIcon {...searchSvg} {...props} />
)
