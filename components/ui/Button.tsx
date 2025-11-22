// components/ui/Button.tsx
'use client'
import React from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  as?: 'button' | 'a'
  href?: string
  className?: string
}

/**
 * Reusable Button component
 * - variant: primary | outline | ghost
 * - size: sm | md | lg
 * - as: 'a' (anchor) or 'button'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  className,
  href,
  ...rest
}: ButtonProps) {
  const base = 'btn'
  const cls = clsx(
    base,
    `${base}--${variant}`,
    `${base}--${size}`,
    className
  )

  if (as === 'a') {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return (
      <a
        href={href}
        className={cls}
        role="button"
        tabIndex={0}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
