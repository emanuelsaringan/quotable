chrome.contextMenus.create({
  title: 'Send to Quotable',
  contexts:['selection'],
  onclick: function(info) {
    // Send to Quotable
    var http = new XMLHttpRequest();
    var url = 'http://localhost:3000/quote';
    var params = 'text=' + encodeURIComponent('ANGELHACK!!!');
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Content-length', params.length);
    http.setRequestHeader('Connection', 'close');

    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    };
    http.send(params);
  }
});
