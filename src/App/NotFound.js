import React from 'react';
import {Link} from 'react-router-dom';

function NotFound() {
  return (
    <h3>
      Not found. <Link to="/">Go to home</Link>
    </h3>
  );
}

export {NotFound};
