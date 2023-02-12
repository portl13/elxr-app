import Link from 'next/link'

const Logo = ({ logo, alt, className = "" }) => {
  return (
    <Link href="/">
      <a
        className={"navbar-brand logo-new pointer " + className}
      >
        <img className="img-fluid " src={"/img/logo.png"} alt={alt}  />
      </a>
    </Link>
  )
}

export default Logo
