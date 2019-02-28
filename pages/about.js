import Link from 'next/link'
//componentes
import Layout from '../components/Layout'

export default class extends React.Component {
    render() {
        return (
            <Layout title="Acerca de..." footer={false}>
                
                <div className="container">
                    <h3>Hecho por 
                        <br /> 
                        <Link href="https://www.instagram.com/thomas_nrg/">
                            <a>@thomas_nrg</a>
                        </Link>
                    </h3>
                    <p>Proyecto Realizado para el curso de NextJs de Platzi.</p>
                    <img className="logo" src="/static/platzi-logo.png" alt="platzi" />
                </div>

                <style jsx>{`
                    .container {
                        padding: 100px 30px;
                    }
                    h3 {
                        color: white;
                        text-align: center;
                    }
                    p {
                        color: white;
                        text-align: center;
                    }
                    .logo {
                        max-width:10%;
                        display: block;
                        margin: 0 auto;
                    }
                `}</style>

                <style jsx global>{`
                    body {
                        background: #8756ca !important;
                    }
                `}</style>
            </Layout>
        )
    }
}