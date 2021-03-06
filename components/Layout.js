import Link from 'next/link'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
// componets
import FooterNav from './footer'

Router.events.on('routeChangeStart', url => {
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default class Layout extends React.Component {
    render() {
        const { children, title, footer } = this.props
        return (
            <div>
                <Head>
                    <title>{title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                </Head>
                    
                <header>
                    <Link href="/"><a>¡Boom Podcasts!</a></Link>
                    <Link  href="/about" prefetch>
                        <a className="info">
                            <FontAwesomeIcon className="icon" icon={faInfo} size="sm" color="#a578e2" />
                        </a>
                    </Link>
                </header>

                { children }

                {footer == true &&
                    <FooterNav />
                }

                

                <style jsx>{`
                    header {
                        color: #fff;
                        background: #8756ca;
                        padding: 15px 2px;
                        text-align: center;
                        font-weight: 600;
                        position: fixed;
                        width: 100%;
                        top: 0;
                    }
                    header a {
                        color: #fff;
                        text-decoration: none;
                        font-size: 18px;
                    }
                    .info {
                        position: fixed;
                        left: 10px;
                        top: 13px;
                    }
                `}</style>

                <style jsx global>{`
                    body {
                    margin: 0;
                    font-family: system-ui;
                    background: white;
                    }
                    /* Make clicks pass-through */
                    #nprogress {
                    pointer-events: none;
                    }

                    #nprogress .bar {
                    background: #f9f939;

                    position: fixed;
                    z-index: 1031;
                    top: 0;
                    left: 0;

                    width: 100%;
                    height: 2px;
                    }

                    /* Fancy blur effect */
                    #nprogress .peg {
                    display: block;
                    position: absolute;
                    right: 0px;
                    width: 100px;
                    height: 100%;
                    box-shadow: 0 0 10px #f9f939, 0 0 5px #f9f939;
                    opacity: 1.0;

                    -webkit-transform: rotate(3deg) translate(0px, -4px);
                        -ms-transform: rotate(3deg) translate(0px, -4px);
                            transform: rotate(3deg) translate(0px, -4px);
                    }

                    /* Remove these to get rid of the spinner */
                    #nprogress .spinner {
                    display: block;
                    position: fixed;
                    z-index: 1031;
                    top: 15px;
                    right: 15px;
                    }

                    #nprogress .spinner-icon {
                    width: 18px;
                    height: 18px;
                    box-sizing: border-box;

                    border: solid 2px transparent;
                    border-top-color: #f9f939;
                    border-left-color: #f9f939;
                    border-radius: 50%;

                    -webkit-animation: nprogress-spinner 400ms linear infinite;
                            animation: nprogress-spinner 400ms linear infinite;
                    }

                    .nprogress-custom-parent {
                    overflow: hidden;
                    position: relative;
                    }

                    .nprogress-custom-parent #nprogress .spinner,
                    .nprogress-custom-parent #nprogress .bar {
                    position: absolute;
                    }

                    @-webkit-keyframes nprogress-spinner {
                    0%   { -webkit-transform: rotate(0deg); }
                    100% { -webkit-transform: rotate(360deg); }
                    }
                    @keyframes nprogress-spinner {
                    0%   { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        )
    }
}