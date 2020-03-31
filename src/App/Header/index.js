import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import cns from 'classnames';

import classNames from './index.module.scss';

function Header() {
  return (
    <nav className={classNames.header}>
      <Link to="/" className={cns(classNames.logo, classNames.link)}>
        Camunda Operate
      </Link>
      <ul className={classNames.links}>
        <li className={classNames.linkContainer}>
          <NavLink to="/" exact className={classNames.link} activeClassName={classNames.activeLink}>
            Dashboard
          </NavLink>
        </li>
        <li className={classNames.linkContainer}>
          <NavLink
            to="/instances?active=true"
            exact
            isActive={(match, location) => {
              const searchParams = new URLSearchParams(location.search);

              return (
                match !== null && searchParams.get('incidents') !== 'true' && searchParams.get('active') === 'true'
              );
            }}
            className={classNames.link}
            activeClassName={classNames.activeLink}
          >
            Running Instances <span>0</span>
          </NavLink>
        </li>
        <li className={classNames.linkContainer}>
          <NavLink to="/instances" exact className={classNames.link} activeClassName={classNames.activeLink}>
            Filters <span>0</span>
          </NavLink>
        </li>
        <li className={classNames.linkContainer}>
          <NavLink
            to="/instances?incidents=true"
            exact
            isActive={(match, location) => {
              const searchParams = new URLSearchParams(location.search);

              return match !== null && searchParams.get('incidents') === 'true';
            }}
            className={classNames.link}
            activeClassName={classNames.activeLink}
          >
            Incidents <span>0</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export {Header};
