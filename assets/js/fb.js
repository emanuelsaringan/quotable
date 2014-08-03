window.fbAsyncInit = function() {
  FB.init({
    appId      : '721191361280674',
    xfbml      : true,
    version    : 'v2.0'
  });

  $('.fb-share').click(
    function() {
      FB.ui(
        {
          method: 'feed',
          href: 'http://emanuelsaringan.github.io/quotable',
          caption: 'I just signed up for quotable - the slickest way to highlight and remember content online.'
        },
        function(response) {
          if (response && !response.error_code) {
            alert('Posting completed.');
          } else {
            alert('Error while posting.');
          }
        }
      );
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
