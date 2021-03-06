import 'isomorphic-fetch'
// components
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import Error from './_error'

export default class extends React.Component {

    static async getInitialProps({ res }) {
        try {
            let req = await fetch('https://api.audioboom.com/channels/recommended')
            let { body: channels } = await req.json()

            if (req.statusCode >= 400) {
                res.statusCode = req.statusCode
                return { channels: null, statusCode: req.statusCode }
            }

            return { channels, statusCode: 200 }
        } catch(err) {
            res.statusCode = 503
            return { channels: null, statusCode: 503}
        }
    }

    render() {
        const {channels, statusCode} = this.props

        if (statusCode !== 200) {
            return <Error statusCode={statusCode} />
        }

        return (
            <Layout title="Boom Podcats!" footer={false}>
                <ChannelGrid channels={ channels } />
            </Layout>
        )
    }
}