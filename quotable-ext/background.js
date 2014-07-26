chrome.contextMenus.create({
  title: "Send to Quotable",
  contexts:["selection"],
  onclick: function(info) {
    alert("ss");
  }
});
