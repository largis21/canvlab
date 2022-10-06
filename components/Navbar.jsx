import Link from "next/link";
import { useRouter } from "next/router";

const navRoutes = ["editor", "docs", "resources", "preferences"]

export default function Navbar( page ) {
  const router = useRouter()
  return (
    <div className="navbar">
      <Link href="/">
        <a id="navbar-title">
          LarsLab 1.0
        </a>
      </Link>
      <ul>
        {navRoutes.map((currRoute) => 
          <NavigationLink 
            key={currRoute}
            href={`/${currRoute}`}
            text={currRoute}
            router={router}
          />
        )}
      </ul>
    </div>
  )
}

function NavigationLink({ href, text, router}) {
  const isActive = router.asPath === (href === "/home" ? "/" : href);

  return (
    <li 
      key={text}
      className={`${isActive && "nav_item_active"} nav_item`}
    >
      <Link href={`/${text}`}>
        <a>
          {text[0].toUpperCase() + text.slice(1, text.length)}
        </a>
      </Link>
    </li>
  )
}
