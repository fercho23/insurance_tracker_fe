import NavLink from '@/components/main-header/nav-link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function MainHeader() {
  return (
    <>
      <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <div className="container-fluid text-white">
          <FontAwesomeIcon icon={faHouse} className="me-2" />
          <NavLink className="navbar-brand" href="/">Insurance Tracker</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink href="/import">Import Data</NavLink>
              </li>
              <li className="nav-item">
                <NavLink href="/data_processed">Data Processed</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
