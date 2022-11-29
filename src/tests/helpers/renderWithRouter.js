import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
  const history = createMemoryHistory();
  const allSelectors = render(
    <Router history={ history }>
      {component}
    </Router>,
  );
  return { ...allSelectors, history };
}

export default renderWithRouter;
