import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#f0a1a8" class="bi bi-house-heart-fill" viewBox="0 0 16 16">
                  <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707L7.293 1.5Z"/>
                  <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9.293Zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z"/>
                </svg>
              </div>
            </a>
          </Link>
          {navBarTitle
            ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
              )
            : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
              )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
