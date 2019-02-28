import 'isomorphic-fetch'
import Link from 'next/link'
import Error from './_error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

export default class extends React.Component {

    static async getInitialProps( {query, res} ) {
        let id = query.id
        try {
            let dataClip = await fetch(`https://api.audioboom.com/audio_clips/${id}.mp3`)
            let clip = (await dataClip.json()).body.audio_clip

            if (dataClip.status >= 400) {
                res.statusCode = dataClip.status
                return { clip: null, statusCode: dataClip.status }
            }

            return { clip, statusCode: 200 }
        } catch(err) {
            return { clip: null, statusCode: 503 }
        }
    }

    render() {
        const { clip, statusCode } = this.props

        if (statusCode !== 200) {
            return <Error statusCode={ statusCode} />
        }

        return (
            <div>
                <div className="modal">
                    <div className="clip">
                        <nav>
                            <Link href={`/channel?id=${clip.channel.id}`}>
                                <a className="close">
                                    <FontAwesomeIcon icon={faChevronCircleLeft} size="2x" color="#fff" />
                                </a>
                            </Link>
                        </nav>

                        <picture>
                            <div style={{ backgroundImage: `url(${clip.urls.image || clip.channel.urls.logo_image.original})` }} />
                        </picture>

                        <div className='player'>
                            <h3>{clip.title}</h3>
                            <h6>{clip.channel.title}</h6>
                            <audio controls autoPlay={true}>
                                <source src={clip.urls.high_mp3} type='audio/mpeg' />
                            </audio>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    nav {
                    background: none;
                    }
                    nav a {
                    display: inline-block;
                    padding: 15px;
                    color: white;
                    cursor: pointer;
                    text-decoration: none;
                    }
                    .clip {
                    display: flex;
                    height: 100%;
                    flex-direction: column;
                    background: #8756ca;
                    color: white;
                    }
                    picture {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: 1 1;
                    flex-direction: column;
                    width: auto;
                    padding: 10%;
                    }
                    picture div {
                    width: 100%;
                    height: 100%;
                    background-position: 50% 50%;
                    background-size: contain;
                    background-repeat: no-repeat;
                    }
                    .player {
                    padding: 30px;
                    background: rgba(0,0,0,0.3);
                    text-align: center;
                    }
                    h3 {
                    margin: 0;
                    }
                    h6 {
                    margin: 0;
                    margin-top: 1em;
                    }
                    audio {
                    margin-top: 2em;
                    width: 100%;
                    }
                    
                `}</style>
            </div>
        )
    }
}