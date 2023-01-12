import Link from 'next/link'

const Logo = ({ logo, alt, className = "" }) => {
  return (
    <Link href="/">
      <a
        className={"navbar-brand logo pointer " + className}
      >
        <img className="img-fluid" src={logo} alt={alt}  />
      </a>
    </Link>
  )
}

export default Logo
