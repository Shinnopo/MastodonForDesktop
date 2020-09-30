import { Mastodon, fs, path, instanceUri } from './register-app'

const token = fs.readFileSync(path.join(__dirname, 'token.json'))

const M = new Mastodon({
    access_token: token,
    timeout_ms: 60 * 1000,
    api_url: instanceUri + '/api/v1/'
})

M.get('timelines/home', {})
    .then(res => {
        const data = res.data
        console.log(data)
    })

export { token, M }