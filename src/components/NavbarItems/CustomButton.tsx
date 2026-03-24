import React from 'react';
import type { ReactNode } from 'react';

interface CustomButtonProps {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export default function CustomButton({ label, href, variant = 'primary' }: CustomButtonProps): ReactNode {
  return (
    <a
      href={href}
      className="navbar__item"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 16px',
        borderRadius: 'var(--ifm-button-border-radius)',
        fontWeight: 600,
        textDecoration: 'none',
        background: variant === 'primary'
          ? 'var(--ifm-color-primary)'
          : 'transparent',
        color: variant === 'primary'
          ? 'white'
          : 'var(--ifm-color-primary)',
        border: variant === 'secondary'
          ? '1px solid var(--ifm-color-primary)'
          : 'none',
      }}
    >
      {label}
    </a>
  );
}
