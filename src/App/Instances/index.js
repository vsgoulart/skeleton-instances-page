import React from 'react';

import Filters from './Filters';
import {Modeler} from './Modeler';
import Table from './Table';
import Operations from './Operations';

import classNames from './index.module.scss';

function Instances() {
  return (
    <div className={classNames.instances}>
      <div className={classNames.column}>
        <Filters />
      </div>
      <div className={classNames.column}>
        <Modeler />
        <Table />
      </div>
      <div className={classNames.column}>
        <Operations />
      </div>
    </div>
  );
}

export {Instances};
