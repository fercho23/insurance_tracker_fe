'use client';

import { usePathname } from 'next/navigation'
import Link from 'next/link';

export default function NavLink({ href, children }) {
  const path = usePathname();
  const className = (
    href === '/' ? path === href : path.startsWith(href)
  ) ? 'nav-link active' : 'nav-link';

  return (
    <Link
      href={href}
      className={className}
    >
      { children }
    </Link>
  );
}
