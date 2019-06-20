import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';

const Navigation = ({location}) => {
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname])

  return (
    <ul className="nav nav-pills nav-fill justify-content-center">
      <li className="nav-item">
        <Link
          className={`nav-link ${active === '/recaptcha-v3' ? 'active' : ''}`}
          to="/recaptcha-v3"
          onClick={() => setActive('/recaptcha-v3')}>
          Recaptcha V3
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${
            active === '/recaptcha-v2-checkbox' ? 'active' : ''
          }`}
          to="/recaptcha-v2-checkbox"
          onClick={() => setActive('/recaptcha-v2-checkbox')}>
          Recaptcha V2 Checkbox
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${
            active === '/recaptcha-v2-invisible' ? 'active' : ''
          }`}
          to="/recaptcha-v2-invisible"
          onClick={() => setActive('/recaptcha-v2-invisible')}>
          Recaptcha V2 Invisible
        </Link>
      </li>
    </ul>
  );
};

export default withRouter(Navigation);
