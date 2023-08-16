import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppLayout } from '@cloudscape-design/components';
import Counter from './components/Counter';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppLayout
          content={
            <Routes>
              <Route path="/" element={<Counter initialValue={1} />} />
            </Routes>
          }
        />
      </BrowserRouter>
    </>
  );
}

export default App;
