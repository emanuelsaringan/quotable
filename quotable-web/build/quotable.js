/** @jsx React.DOM */

var QuoteBooklet = React.createClass({displayName: 'QuoteBooklet',


	render: function() {


		return (
			React.DOM.div({className: "quoteBooklet"}, 
				"This is a Quote Booklet."
			)

			);
	}
});

var QuoteStream = React.createClass({displayName: 'QuoteStream',
	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	componentDidMount: function() {
		this.loadCommentsFromServer();
		console.log("loaded");
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	getInitialState: function() {
		return ({data: []});
	},
	render: function() {
	console.log(this.props.data);
	var contentRow = [];
	var data = this.state.data;
	data.forEach(function(booklet) {
			console.log(booklet.name);
			contentRow.push(QuoteBox({booklet: booklet.name}));
			booklet.quotables.forEach(function(quotable) {
				contentRow.unshift(
					QuoteBox({title: quotable.title, url: quotable.url, text: quotable.text, time: quotable.time})
				);
			});
		}.bind(this));	
		return (
			React.DOM.div({className: "quoteStream"}, 
				React.DOM.h1(null, " QuoteStream "), 
				contentRow
			)
		);
	}
});

var QuoteBox = React.createClass({displayName: 'QuoteBox',
	render: function() {
		return (
			React.DOM.div({className: "quoteBox"}, 
			 	"This is the Quote Box" + ' ' +
			 	"Quotable: ", QuoteText({text: this.props.text}), 
				"Title: ", QuoteTitle({title: this.props.title}), 
				"Time: ", QuoteTime({time: this.props.time}), 
				"URL: ", QuoteUrl({url: this.props.url})
			)

			);
	}
});

var QuoteText = React.createClass({displayName: 'QuoteText',
	render: function() {
		return (
			React.DOM.div({className: "quoteText"}, 
			 	this.props.text
			)
			);
	}
});

var QuoteTitle = React.createClass({displayName: 'QuoteTitle',
	render: function() {
		return (
			React.DOM.div({className: "quoteTitle"}, 
			 	this.props.title
			)
			);
	}
});

var QuoteUrl = React.createClass({displayName: 'QuoteUrl',
	render: function() {
		return (
			React.DOM.div({className: "quoteTitle"}, 
			 	this.props.url
			)
			);
	}
});

var QuoteTime = React.createClass({displayName: 'QuoteTime',
	render: function() {
		return (
			React.DOM.div({className: "quoteTime"}, 
			 	this.props.time
			)
			);
	}
});

var QuoteLogo = React.createClass({displayName: 'QuoteLogo',
	render: function() {
		return (
			React.DOM.div({className: "quoteLogo"}, 
			 	"This is the Quote Hovered Logo"
			)
			);
	}
});

React.renderComponent(
	QuoteStream({url: "sample.json", pollInterval: 2000}),
	document.getElementById("quoteStream")
);