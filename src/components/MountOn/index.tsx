import React from 'react'

type Props = {
  children: React.ReactChild
  fallback?: React.ReactElement
  on?: boolean
}
const MountOn: React.FC<Props> = ({ children, on = true, fallback }) => {
  if (on) return <>{children}</>
  return fallback || null
}

export default MountOn
