// window.fbAsyncInit = function() {
//   FB.init({
//     appId      : '721191361280674',
//     xfbml      : true,
//     version    : 'v2.0'
//   });

//   $('.fb-share').click(
//     function() {
//       FB.ui({
//         method: 'share',
//         href: 'http://emanuelsaringan.github.io/quotable',
//       }, function(response){});
//     }
//   );
// };

// (function(d, s, id){
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {return;}
//    js = d.createElement(s); js.id = id;
//    js.src = "http://connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//  }(document, 'script', 'facebook-jssdk'));

$('.fb-share').click(
  function() {
    var shareURL = 'https://www.facebook.com/dialog/feed';
    shareURL += '?app_id=page';
    shareURL += '&caption=' + encodeURIComponent('Quotable - The slickest way to highlight and remember content online.');
    shareURL += '&link=' + encodeURIComponent('http://emanuelsaringan.github.io/quotable');
    shareURL += '&redirect_uri=' + encodeURIComponent('http://emanuelsaringan.github.io/quotable/thanks.html');
    window.open(shareURL, '_blank');
  }
);
