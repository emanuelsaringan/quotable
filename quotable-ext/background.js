chrome.contextMenus.create({
  title: 'Send to Quotable',
  contexts:['selection'],
  onclick: function(info) {
    // Get highlighted text
    chrome.tabs.executeScript( {
      code: 'window.getSelection().toString();'
    }, function(selection) {
      if (selection.length <= 0) {
        return;
      }

      chrome.tabs.getSelected(null,
        function(tab) {
          // Send to Quotable
          var http = new XMLHttpRequest();
          var url = 'http://localhost:3000/quote';

          // Construct query string
          var params = 'text=' + encodeURIComponent(selection[0]);
          params += '&title=' + encodeURIComponent(tab.url);
          params += '&url=' + encodeURIComponent(tab.title);
          http.open('POST', url, true);

          // Construct header
          http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          http.setRequestHeader('Content-length', params.length);
          http.setRequestHeader('Connection', 'close');

          // Handle error
          http.onreadystatechange = function() {
              if (http.readyState == 4 && http.status == 200) {
                  alert(http.responseText);
              }
          };

          http.send(params);
        }
      );
    });
  }
});
