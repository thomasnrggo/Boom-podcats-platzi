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
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"></link>
                </Head>
                    
                <header>
                    <Link href="/">
                        <a>¡Boom Podcats!</a>
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