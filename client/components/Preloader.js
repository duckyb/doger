import React from 'react';

export default () => (
  <React.Fragment>
    <img className="preloader" src="/static/preloader.gif"></img>
    <style jsx>{`
      .preloader {
        height: 200px;
        display: block;
        margin: 0 auto;
      }
    `}</style>
  </React.Fragment>
)