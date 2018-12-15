import React, { Component } from 'react'
import Home from '../components/Home'
import Fonts from '../general/Fonts'
import Head from 'next/head'

class Index extends Component {
  componentDidMount() {
    Fonts()
  }

  render() {
    return (
      <>
      <Head>
        <title>Doger</title>
          <link rel="shortcut icon" href="static/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="static/favicon.ico" type="image/x-icon" />
      </Head>
      <Home />
      </>
    )
  }
}

export default Index