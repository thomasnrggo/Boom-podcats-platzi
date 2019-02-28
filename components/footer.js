import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

export default class FooterNav extends React.Component {
    render() {
        return (
            <nav className="footer">
                <Link href="/about" prefetch>
                    <a>
                        <FontAwesomeIcon className="icon" icon={faInfo} size="lg" color="#fff" />
                    </a>
                </Link>

                <style jsx>{`
                .footer {
                        min-height: 28px;
                        position: fixed;
                        bottom: 0;
                        color: #fff;
                        background: #8756ca;
                        min-width: 100%;
                        padding: 12px 0;
                        display: flex;
                        justify-content: space-around;
                    }
                    .icon {

                    }
                `}</style>
            </nav>
        )
    }
}
