import React, { ReactNode } from 'react'
import Link from 'next/link'

type AProps = JSX.IntrinsicElements['a']

export interface AnchorProps extends AProps {
  href: string
  as?: string
  label?: string
  children?: ReactNode
}

export function Anchor({
  href,
  as = undefined,
  label = undefined,
  children = undefined,
  ...rest
}: AnchorProps) {
  return (
    <Link href={href} as={as} passHref>
      <a {...rest}>{children || label}</a>
    </Link>
  )
}
