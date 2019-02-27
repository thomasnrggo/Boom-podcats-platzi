import Link from 'next/link'
import Head from 'next/head'

export default class Layout extends React.Component {
    render() {
        const { children, title } = this.props
        return (
            <div>
                <Head>

                </Head>
                    <title>{ title }</title>
                <header>
                    <Link href="/">
                        <a>¡Boom Podcats!</a>
                    </Link>
                </header>

                { children }

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