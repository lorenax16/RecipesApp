import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';

export default function DefaultTemplate({ children }) {
  return (
    <>
      <Header pageName="App de Receitas" />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

DefaultTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
