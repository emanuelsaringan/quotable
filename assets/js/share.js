var URL = 'http://getquotable.io';

$('.btn-share').click(
  function() {
    var shareURL = 'https://www.facebook.com/dialog/feed';
    shareURL += '?app_id=721191361280674';
    shareURL += '&caption=' + encodeURIComponent('I just signed up for quotable - the slickest way to highlight and remember content online.');
    shareURL += '&link=' + encodeURIComponent(URL);
    shareURL += '&redirect_uri=' + encodeURIComponent(URL + '/thanks.html');

    window.open(shareURL, '_blank');
  }
);

$('.btn-tweet').click(
  function() {
    var tweetURL = 'http://twitter.com/share';
    tweetURL += '?url=' + encodeURIComponent(URL);
    tweetURL += '&text=' + encodeURIComponent('I just signed up for quotable - the slickest way to highlight and remember content online. ');

    window.open(tweetURL, '_blank');
  }
);
