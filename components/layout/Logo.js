import Link from 'next/link'

const Logo = ({ logo, alt, width = 120, height = 40 }) => {
  return (
    <Link href="/">
      <a
        css={{width: width}}
        className="navbar-brand m-0 logo"
      >
        <img className="img-fluid" src={logo} alt={alt} />
      </a>
    </Link>
  )
}

export default Logo
