export default class extends React.Component {
    render() {
        return (
            <div>
                <img className="logo" src="/static/platzi-logo.png" alt="platzi" />
                <h3>Hecho por Anthony González</h3>
                <p>Bienvenido al curso de Next.js</p>

                <style jsx>{`
                    .logo {
                        max-width: 30%;
                        display: block;
                        margin: 0 auto;
                    }
                    h3 {
                        color: white;
                        text-align: center;
                    }
                    p {
                        color: white;
                        text-align: center;
                    }
                `}</style>

                <style jsx global>{`
                    body {
                        background: #1c3643;
                    }
                `}</style>
            </div>
        )
    }
}