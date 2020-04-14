import React, {useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import cns from 'classnames';
import {useStore} from 'effector-react';
import {createStoreObject} from 'effector';

import classNames from './index.module.scss';
import {statistics$, fetchStatistics} from '../../stores/statistics';
import {totalCount$} from '../../stores/instances';

const store = createStoreObject({
  statistics: statistics$,
  filterCount: totalCount$,
});

function Header() {
  const {
    statistics: {running, withIncidents},
    filterCount,
  } = useStore(store);

  useEffect(() => {
    fetchStatistics();
  }, []);

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
            Running Instances <span>{running}</span>
          </NavLink>
        </li>
        <li className={classNames.linkContainer}>
          <NavLink to="/instances" exact className={classNames.link} activeClassName={classNames.activeLink}>
            Filters <span>{filterCount}</span>
          </NavLink>
        </li>
        <li className={classNames.linkContainer}>
          <NavLink
            to="/instances?incidents=true"
            exact
            isActive={(match, location) => {
              const searchParams = new URLSearchParams(location.search);

              return (
                match !== null && searchParams.get('incidents') === 'true' && searchParams.get('active') !== 'true'
              );
            }}
            className={classNames.link}
            activeClassName={classNames.activeLink}
          >
            Incidents <span>{withIncidents}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export {Header};
