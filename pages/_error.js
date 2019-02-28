import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props
    return (
      <div>
        <Head>
          <title>Oh no...</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <header>
          <Link href="/">
            <a>¡Boom Podcats!</a>
          </Link>
        </header>

        { statusCode  === 404 ?
          <div className="message">
            <h1 className="error">{statusCode}</h1>
            <h2>La página no existe <br /> :( </h2>

            <Link href="/">
              <a>Vuelve al inicio</a>
            </Link>
          </div>
          :
          <div className="message">
            <h1 className="error">{statusCode}</h1>
            <h2> Oh...algo salio mal<br />Vuelve a intentalo mas tarde.<br />:(</h2>
          </div>
        }

        <style jsx>{`
          header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
            font-weight: 600;
          }
          header a {
            color: #fff;
            text-decoration: none;
            font-size: 18px;
          }
          .message {
            padding: 100px 30px;
            text-align: center;
            color: #8756ca;
          }
          .error {
            font-size: 7.5em;
            color: #8756ca;
            margin-bottom: -24px;
          }
          h1 {
            margin-bottom: 12px;
          }
          a {
            color: #8756ca;
            font-size: 14px;
            text-decoration: none;
          }
        `}</style>

        <style jsx global>{`
          body {
            margin: 0;
            font-family: system-ui;
            background: #fff;
          }
        `}</style>  
      </div>
      
    )
  }
}

export default Error