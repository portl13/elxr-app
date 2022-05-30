import Link from 'next/link'

const Logo = ({ logo, alt, width = 150, height = 40 }) => {
  return (
    <Link href="/">
      <a
        css={{
          width: 120,
        }}
        className="navbar-brand m-0"
      >
        <img className="img-fluid" src={logo} />
      </a>
    </Link>
  )
}

export default Logo
