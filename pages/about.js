import Link from 'next/link'
//componentes
import Layout from '../components/Layout'

export default class extends React.Component {
    render() {
        return (
            <Layout title="Acerca de..." footer={false}>
                
                <div className="container">

                    <img className="logo" src="/static/platzi-logo.png" alt="platzi" /> 
                    <p>
                        <b>¡Boom podcats!</b> nace del proyecto realizado bajo la guía del profesor 
                        <Link href="https://twitter.com/robertcode"><a> @robertcode </a></Link> ‏
                        en el curso de next de platzi. La aplicación funciona gracias al api de 
                        <Link href="https://github.com/audioBoom/api"><a> audioBoom </a></Link> 
                        y esta hecha desde 0 con nextJs, puedes ver el codigo de la aplicacion 
                        <Link href="https://github.com/thomasnrggo/Boom-podcats-platzi"><a> aquí.</a></Link>
                    </p>
                    <div className="volver">
                        <Link href="/">
                            <a>Volver a Inicio</a>
                        </Link>
                    </div>
                      
                </div>

                <h3>Hecho por<Link href="https://twitter.com/thomas_nrg" prefetch><a> @thomas_nrg </a></Link></h3>

                <style jsx>{`
                    .container {
                        padding: 100px 30px;
                        max-width: 450px;
                        margin: 0 auto;
                    }
                    h3 {
                        width: 100%;
                        position: fixed;
                        bottom: 2.5%;
                        margin: 0 auto;
                        font-size: .9em;
                        color: white;
                        text-align: center;
                    }
                    p {
                        color: white;
                        text-align: center;
                        line-height: 1.3em;
                    }
                    .logo {
                        max-width:180px;
                        display: block;
                        margin: 0 auto;
                    }
                    a {
                        color: #fff;
                        text-decoration: none;
                        transition: ease .4s;
                        font-weight: bold;
                    }
                    a:hover {
                        color: #f9f939;
                    }
                    .volver {
                        padding: 50px 12px;
                        text-align: center;
                    }
                    @media (max-width: 680px) {
                        .logo {
                            max-width: 20%;
                        }
                        .container {
                        padding: 100px 30px;
                    }
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