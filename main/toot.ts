import { Mastodon, fs, path, instanceUri } from './register-app'
import { token, M } from './get-timeline'

M.post('statuses',
    {status: 'Test Test Test by cli'},
    (err, data, res) => {
        if(err) {
            console.error(err)
            return
        }
        console.log(res)
    })
    