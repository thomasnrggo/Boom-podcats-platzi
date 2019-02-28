import Link from 'next/link'
import Head from 'next/head'
// componets
import FooterNav from './footer'

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
                    <Link href="/">
                        <a>¡Boom Podcasts!</a>
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
                        padding: 15px;
                        text-align: center;
                        font-weight: 600;
                    }
                    header a {
                        color: #fff;
                        text-decoration: none;
                        font-size: 18px;
                    }
                `}</style>

                <style jsx global>{`
                    body {
                        margin: 0;
                        font-family: system-ui;
                        background: white;
                    }
                `}</style>
            </div>
        )
    }
}