import React, { Suspense } from "react";
import routes from "./router";
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<h2></ h2>}>
          {renderRoutes(routes)}
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
