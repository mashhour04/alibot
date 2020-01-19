// eslint-disable-next-line no-unexpected-multiline
(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "Messenger");


window.verifyToken = () => {
  const token = new URL(window.location).searchParams.get('token');
  if (token) {
    // eslint-disable-next-line no-undef
    const client = jwt_decode(token);
    if (client.fbid) {
      window.client = client;
      return client;
    }
  }

}
window.extAsyncInit = function () {
  // the Messenger Extensions JS SDK is done loading 
  console.log('messenger extension loaded');
  window.MessengerExtensions.getSupportedFeatures(function success(result) {
    let features = result.supported_features;
    console.log('supported features', features);
  }, function error(err) {
    // error retrieving supported features
    console.log('error getting supported features', err);
    window.MessengerExtensionsError = err;
  });
};


export const init = () => {
  console.log('loader')
}