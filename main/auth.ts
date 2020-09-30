import { Mastodon, fs, path, instanceUri } from './register-app'

const readlineSync = require('readline-sync')
const file_cli_app = path.join(__dirname, 'cli-app.json')
const file_user = path.join(__dirname, 'token.json')
const info = JSON.parse(fs.readFileSync(file_cli_app))

Mastodon.getAuthorizationUrl(
    info.client_id,
    info.client_secret,
    instanceUri)
    .then(url => {
        console.log('以下のURLにアクセスしてコードを取得してください')
        console.log(url)
        const code = readlineSync.question('code: ')
        return Mastodon.getAccessToken(
            info.client_id,
            info.client_secret,
            code,
            instanceUri
        )
    })
    .then(token => {
        console.log('access token: ', token)
        fs.writeFileSync(file_user, token)
    })
