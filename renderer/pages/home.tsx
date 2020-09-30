import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import { Mastodon, fs, path } from '../../main/register-app';

interface MyState {
  tootdata: any;
  timelines: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

export default class App extends Component<{}, MyState> {
  apiUri: string;
  token: any;
  mstdn: any;
  constructor(props) {
    super(props)
    this.apiUri = 'https://pawoo.net/api/v1/'
    this.loadInfo()
    this.state = {
      tootdata: '',
      timelines: []
    }
  }
  componentWillMount() {
    this.loadTimelines()
    setInterval(() => {
      this.loadTimelines()
    }, 1000 * 30)
  }
  loadInfo() {
    const f = path.join('token.json')
    try {
      fs.stateSync(f)
    } catch(err) {
      console.log('先にアクセストークンを取得してください')
      return
    }
    this.token = fs.readFileSync(f)
    this.mstdn = new Mastodon({
      access_token: this.token,
      timeout_ms: 60 * 1000,
      api_url: this.apiUri
    })
  }
  loadTimelines() {
    if(typeof get !== 'undefined')
    this.mstdn.get('timelines/home', {})
    .then(res => {
      this.setState({timelines: res.data})
    })
  }
  handleText(e) {
    this.setState({tootdata: e.target.value})
  }
  toot(e) {
    this.mstdn.post(
      'statuses',
      {status: this.state.tootdata},
      (err, data, res) => {
        if(err) {
          console.log(err)
          return
        }
        this.setState({tootdata: ''})
        this.loadTimelines()
      }
    )
  }
  render() {
    return (
      <>
      <div>
        <h1>HOME</h1>
      </div>
      </>
    )
  }
  renderTimelines() {
    const lines = this.state.timelines.map(e => {
      console.log(e)
      let memo = null
      if(e.reblog) {
        memo = (<p>
          {e.account.display_name}さんがブーストしました
        </p>)
        e = e.reblog
      }
      return (<div key={e.id}>
        <Avatar>S</Avatar>
        <div>{memo}{e.account.display_name}
        <span dangerouslySetInnerHTML={{__html: e.content}} />
        </div>
        <div style={{clear: 'both'}} />
      </div>)
    })
  }
}
