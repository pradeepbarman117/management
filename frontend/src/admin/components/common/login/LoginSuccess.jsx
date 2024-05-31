// App.js
import React, { useState } from 'react';
import Login from './Login';
import Admin from '../../../Admin';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div>
      {authenticated ? (
        <Admin/>
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )}
    </div>
  );
};

export default App;
