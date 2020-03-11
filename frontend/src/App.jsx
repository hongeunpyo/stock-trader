import React from 'react';

import Header from './layout/header/Header';
import BodyWrapper from './layout/body/BodyWrapper';
import Footer from './layout/footer/Footer';
import RegisterPage from './pages/register-page/RegisterPage';

function App() {
  return (
    <div className="app flex flex-column flex-1">
      <Header />
      <BodyWrapper>
        <RegisterPage />
      </BodyWrapper>
      <Footer />
    </div>
  );
}

export default App;
