import React, {useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import cns from 'classnames';
import {Observer, useLocalStore, observer} from 'mobx-react';
import {useStores} from '../../hooks/useStores';
import classNames from './index.module.scss';

const Header = observer(() => {
  const {instancesStore, filterStore, statisticsStore} = useStores();

  useEffect(() => {
    statisticsStore.init();

    return () => {
      statisticsStore.reset();
    };
  }, [statisticsStore]);

  // could also be moved to filterStore?
  const filter = useLocalStore(() => ({
    get isInstancesActive() {
      const {active, incidents} = filterStore.state;
      return active && !incidents;
    },
    get isIncidentsActive() {
      const {active, incidents} = filterStore.state;
      return !active && incidents;
    },
  }));

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
            isActive={() => filter.isInstancesActive}
            className={classNames.link}
            activeClassName={classNames.activeLink}
          >
            Running Instances <span>{statisticsStore.state.instances}</span>
          </NavLink>
        </li>
        <li className={classNames.linkContainer}>
          <NavLink to="/instances" exact className={classNames.link} activeClassName={classNames.activeLink}>
            Filters <Observer>{() => <span>{instancesStore.state.totalCount}</span>}</Observer>
          </NavLink>
        </li>
        <li className={classNames.linkContainer}>
          <NavLink
            to="/instances?incidents=true"
            exact
            isActive={() => filter.isIncidentsActive}
            className={classNames.link}
            activeClassName={classNames.activeLink}
          >
            Incidents <span>{statisticsStore.state.incidents}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
});

export {Header};
