import 'isomorphic-fetch'
import Link from 'next/link'

export default class extends React.Component {

    static async getInitialProps({ query }) {
        let idChannel = query.id

        // paralize promise all
        let [reqChannel, reqSeries, reqAudios] = await Promise.all([
            fetch(`https://api.audioboom.com/channels/${idChannel}`),
            fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
            fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
        ])

        let dataChannel = await reqChannel.json()
        let channel = dataChannel.body.channel

        let dataAudios = await reqAudios.json()
        let audioClips = dataAudios.body.audio_clips

        let dataSeries = await reqSeries.json()
        let series = dataSeries.body.channels

        return { channel, audioClips, series }
    }

    render() {
        const {channel, audioClips, series} = this.props
        return (
            <div>
                <header>Podcast</header>

                <h1>{channel.title}</h1>
                <h2>Series</h2>
                {series.map((serie) => (
                    <div>{serie.title}</div>
                ))}
                <h2>Últimos Podcasts</h2>
                {audioClips.map((clip)=> (
                    <Link href={`/podcats?id=${clip.id}`}>
                        <a className="listItem">{clip.title}</a>
                    </Link>
                    
                ))}


                <style jsx>{`
                    header {
                    color: #fff;
                    background: #8756ca;
                    padding: 15px;
                    text-align: center;
                    }
                    .channels {
                    display: grid;
                    grid-gap: 15px;
                    padding: 15px;
                    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                    }
                    a.channel {
                    display: block;
                    margin-bottom: 0.5em;
                    color: #333;
                    text-decoration: none;
                    }
                    .channel img {
                    border-radius: 3px;
                    box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                    width: 100%;
                    }
                    h1 {
                        font-weight: 600;
                        padding: 15px;
                    }
                    h2 {
                    padding: 5px;
                    font-size: 0.9em;
                    font-weight: 600;
                    margin: 0;
                    text-align: center;
                    }
                    .listItem {
                        color: black;
                        padding: 8px;
                        text-decoration: none;
                        display: block;
                        background: #ded2ef;
                    }
                    .listItem:nth-child (odd) {
                        background: #bcadd1;
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