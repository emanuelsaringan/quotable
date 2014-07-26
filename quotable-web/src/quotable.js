/** @jsx React.DOM */

var QuoteStream = React.createClass({
	render: function() {
		return (
			<div className="quoteStream">
			<QuoteBox />
			</div>
			);
	}
});

var QuoteBox = React.createClass({
	render: function() {
		return (
			<div className="quoteBox">
			 	This is the Quote Box
			 	<QuoteText />
				<QuoteTitle />
				<QuoteTime />
			</div>

			);
	}
});

var QuoteText = React.createClass({
	render: function() {
		return (
			<div className="quoteText">
			 	This is the Quote Text
			</div>
			);
	}
});

var QuoteTitle = React.createClass({
	render: function() {
		return (
			<div className="quoteTitle">
			 	This is the Quote Title
			</div>
			);
	}
});

var QuoteUrl = React.createClass({
	render: function() {
		return (
			<div className="quoteTitle">
			 	This is the Quote Url
			</div>
			);
	}
});

var QuoteTime = React.createClass({
	render: function() {
		return (
			<div className="quoteTime">
			 	This is the Quote Time
			</div>
			);
	}
});

var QuoteLogo = React.createClass({
	render: function() {
		return (
			<div className="quoteLogo">
			 	This is the Quote Hovered Logo
			</div>
			);
	}
});

React.renderComponent(
	<QuoteStream/>,
	document.getElementById("quoteStream")
);