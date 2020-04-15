import React, {useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import cns from 'classnames';
import {getStatistics} from '../../actions';
import {connect} from 'react-redux';

import classNames from './index.module.scss';

function Header({getStatistics, statistics, totalInstanceCount}) {
  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

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
            Running Instances <span>{statistics ? statistics.running : 0}</span>
          </NavLink>
        </li>
        <li className={classNames.linkContainer}>
          <NavLink to="/instances" exact className={classNames.link} activeClassName={classNames.activeLink}>
            Filters <span>{totalInstanceCount ? totalInstanceCount : statistics.running}</span>
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
            Incidents <span>{statistics ? statistics.withIncidents : 0}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    statistics: state.statistics.statistics,
    totalInstanceCount: state.instances.totalCount,
  };
};
export default connect(mapStateToProps, {getStatistics})(Header);
