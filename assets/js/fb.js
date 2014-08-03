function openFbPopUp() {
    var fburl = 'http://emanuelsaringan.github.io/quotable';
    var fbimgurl = 'http://emanuelsaringan.github.io/quotable/assets/images/LandingLogo2.png';
    var fbtitle = 'Quotable';
    var fbsummary = 'the slickest way to highlight and remember content online';
    var sharerURL = "http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURI(fburl) + "&p[images][0]=" + encodeURI(fbimgurl) + "&p[title]=" + encodeURI(fbtitle) + "&p[summary]=" + encodeURI(fbsummary);
    window.open(
      sharerURL,
      'facebook-share-dialog', 
      'width=626,height=436'); 
    return  false;
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '721191361280674',
    xfbml      : true,
    version    : 'v2.0'
  });

  $('.fb-share').click(
    function() {
      // FB.ui(
      //   {
      //     method: 'share',
      //     href: 'http://emanuelsaringan.github.io/quotable',
      //     post: false
      //   },
      //   function(response) {
      //     if (response && !response.error_code) {
      //       alert('Posting completed.');
      //     } else {
      //       alert('Error while posting.');
      //     }
      //   }
      // );
      openFbPopUp();
    }
  );
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "http://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
