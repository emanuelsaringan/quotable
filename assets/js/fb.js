$('.fb-share').click(
  function() {
    var shareURL = 'https://www.facebook.com/dialog/feed';
    shareURL += '?app_id=721191361280674';
    shareURL += '&caption=' + encodeURIComponent(' just signed up for quotable - the slickest way to highlight and remember content online.');
    shareURL += '&link=' + encodeURIComponent('http://emanuelsaringan.github.io/quotable');
    shareURL += '&redirect_uri=' + encodeURIComponent('http://emanuelsaringan.github.io/quotable/thanks.html');

    window.open(shareURL, '_blank');
  }
);
