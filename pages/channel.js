import 'isomorphic-fetch'
import Link from 'next/link'
// components
import Error from './_error'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastList'

export default class extends React.Component {

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

    render() {
        const {channel, audioClips, series, statusCode} = this.props

        if (statusCode !== 200) {
            return <Error statusCode={statusCode} />
        }

        return (

            <Layout title={channel.title} footer={true}>
                <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
                <h1>{channel.title}</h1>

                {series.length > 0 &&
                    <div>
                        <h2>Series</h2>
                        <ChannelGrid channels={series} />
                    </div>
                }

                <h2>Ultimos Podcasts</h2>
                <PodcastList podcasts={audioClips} />

                <style jsx>{`
                    .banner {
                    width: 100%;
                    padding-bottom: 25%;
                    background-position: 50% 50%;
                    background-size: cover;
                    background-color: #aaa;
                    }
                    h1 {
                    font-weight: 600;
                    padding: 15px;
                    }
                    h2 {
                    padding: 15px;
                    font-size: 1.8em;
                    font-weight: 600;
                    margin: 0;
                    color: #8756ca;
                    }
                `}</style>
            </Layout>
        )
    }
}