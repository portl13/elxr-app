import Link from 'next/link'

const Logo = ({ logo, alt, width = 120, height = 40, className = "" }) => {
  return (
    <Link href="/">
      <a
        className={"navbar-brand logo pointer " + className}
      >
        <img className="img-fluid" src={logo} alt={alt} width={width} height={height} />
      </a>
    </Link>
  )
}

export default Logo
