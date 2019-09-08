'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Notification  from 'react-web-notification';

//allow react dev tools work
window.React = React;

class NotificationComponent extends React.Component {
  constructor(props) {
    super(props);
    const { ignore } = this.props;
    this.state = {
      ignore,
      title: '',
      sound: 'https://cdn0.iconfinder.com/data/icons/essentials-solid/100/Notification-512.png',
    };
  }

  handlePermissionGranted(){
    console.log('Permission Granted');
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied(){
    console.log('Permission Denied');
    this.setState({
      ignore: true
    });
  }
  handleNotSupported(){
    console.log('Web Notification not Supported');
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag){
    console.log(e, 'Notification clicked tag:' + tag);
  }

  handleNotificationOnError(e, tag){
    console.log(e, 'Notification error tag:' + tag);
  }

  handleNotificationOnClose(e, tag){
    console.log(e, 'Notification closed tag:' + tag);
  }

  handleNotificationOnShow(e, tag){
    this.playSound();
    console.log(e, 'Notification shown tag:' + tag);
  }

  playSound(filename){
    const { sound } = this.state;
    document.getElementById('sound').children[0].src = sound;
    document.getElementById('sound').children[1].src = sound;
    document.getElementById('sound').play();
  }

  componentWillReceiveProps(nextProps) {
    console.log('notification component receiving props', nextProps);
    if(nextProps.ignore) {
      return;
    }

    const now = Date.now();

    let { body, title, sound, icon } = nextProps;
    let tag = now;
    icon = icon || 'https://cdn0.iconfinder.com/data/icons/essentials-solid/100/Notification-512.png';
    title = title || '';
    // const icon = 'http://localhost:3000/Notifications_button_24.png';
    // Available options
    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    const options = {
      tag: tag,
      body: body,
      icon: icon,
      lang: 'en',
      dir: 'ltr',
      sound  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
    }
    this.setState({
      title,
      sound,
      options
    });
  }

  render() {

    return (
      <div>
       
        <Notification
          ignore={this.state.ignore && this.state.title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title}
          options={this.state.options}
        />
        <audio id='sound' preload='auto'>
          <source src='https://notificationsounds.com/soundfiles/dd458505749b2941217ddd59394240e8/file-sounds-1111-to-the-point.mp3' type='audio/mpeg' />
          <source src='https://notificationsounds.com/soundfiles/dd458505749b2941217ddd59394240e8/file-sounds-1111-to-the-point.mp3' type='audio/ogg' />
          <embed hidden={true} autostart='false' loop={false} src='https://notificationsounds.com/soundfiles/dd458505749b2941217ddd59394240e8/file-sounds-1111-to-the-point.mp3' />
        </audio>
      </div>
    )
  }
};

export default NotificationComponent;