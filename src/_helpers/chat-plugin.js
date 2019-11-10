import loadScript from 'load-script';

let initialized = false;
let queue = [];

export function chatPlugin(callback) {
    if(initialized) {
      callback(window.FB);
    } else {
      queue.push(callback);
      if (!window.fbAsyncInit) {
        window.fbAsyncInit = () => {
          window.FB.init({
            appId: process.env.REACT_APP_FACEBOOK_APP_ID,
            autoLogAppEvents: true,
            status: true,
            cookie: true,
            xfbml: false,
            version: 'v4.0',
          });
          initialized = true;
          queue.forEach(cb => cb(window.FB));
          queue = null;
        };
        const script = window.localStorage.getItem('fb:debug') === 'true'
          ? 'xfbml.customerchat/debug.js'
          : 'xfbml.customerchat.js';
        loadScript(`https://connect.facebook.net/en_US/sdk/${script}`, { async: true });
      }
    }
}

export function createDiv() {
  const div = document.createElement("div");
  div.setAttribute("class","fb-customerchat");
  div.setAttribute("attribution","setup_tool");
  div.setAttribute("color","#FF7B00");
  div.setAttribute("page_id", process.env.REACT_APP_FACEBOOK_PAGE_ID);
  div.setAttribute("ref",JSON.stringify({  user: JSON.parse(localStorage.user) }));
  window.document.body.append(div);
  console.log('appended div')
}