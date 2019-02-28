import 'isomorphic-fetch'
import Link from 'next/link'
// components
import Error from './_error'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
// import PodcastList from '../components/PodcastList'
import PodcastListWithClick from '../components/PodcastListWithClick'
import PodcastPlayer from '../components/PodcastPlayer'

export default class extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            openPodcast: null
        }
    }

    static async getInitialProps({ query, res }) {
        try {
            let idChannel = query.id

            // paralize promise all
            let [reqChannel, reqSeries, reqAudios] = await Promise.all([
                fetch(`https://api.audioboom.com/channels/${idChannel}`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
            ])

            if (reqChannel.status >= 400) {
                res.statusCode = reqChannel.status
                return { channel: null, audioClips: null, series: null, statusCode: reqChannel.status }
            }

            let dataChannel = await reqChannel.json()
            let channel = dataChannel.body.channel

            let dataAudios = await reqAudios.json()
            let audioClips = dataAudios.body.audio_clips

            let dataSeries = await reqSeries.json()
            let series = dataSeries.body.channels

            return { channel, audioClips, series, statusCode: 200 }
        } catch(err) {
            return { channel: null, audioClips: null, series: null, statusCode: 503 }
        }
    }

    openPodcast = (event, podcast) => {
        event.preventDefault()
        this.setState({
            openPodcast: podcast
        })
    }

    closePodcast = (event) => {
        event.preventDefault()
        this.setState({
            openPodcast: null
        })
    }

    render() {
        const {channel, audioClips, series, statusCode} = this.props
        const { openPodcast } = this.state

        if (statusCode !== 200) {
            return <Error statusCode={statusCode} />
        }

        return (

            <Layout title={channel.title} footer={false}>
                <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

                {  openPodcast && 
                <div className="modal">
                    <PodcastPlayer clip={openPodcast} onClose={this.closePodcast} />
                </div>
                }

                <h1>{channel.title}</h1>

                {series.length > 0 &&
                    <div>
                        <h2>Series</h2>
                        <div className="seriesContainer">
                            <ChannelGrid channels={series} />
                        </div>
                        
                    </div>
                }

                <h2>Ultimos Podcasts</h2>
                <PodcastListWithClick 
                    podcasts={audioClips} 
                    onClickPodcast={this.openPodcast}
                />

                <style jsx>{`
                    .banner {
                    width: 100%;
                    min-height: 20vh;
                    padding-bottom: 4%;
                    background-position: 50% 50%;
                    background-size: cover;
                    background-color: #aaa;
                    margin-top: 36px;
                    }
                    .seriesContainer {
                        margin-top: -4em;
                    }
                    h1 {
                    font-weight: 600;
                    padding: 15px;
                    margin: 0px;
                    }
                    h2 {
                    padding: 15px;
                    font-size: 1.6em;
                    font-weight: 600;
                    margin: 0;
                    color: #8756ca;
                    }
                    .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 99999;
                    }
                `}</style>
            </Layout>
        )
    }
}