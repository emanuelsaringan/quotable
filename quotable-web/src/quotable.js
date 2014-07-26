/** @jsx React.DOM */

var QuoteBooklet = React.createClass({


	render: function() {


		return (
			<div className="quoteBooklet">
				This is a Quote Booklet.
			</div>

			);
	}
});

var QuoteStream = React.createClass({
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
			contentRow.push(<QuoteBox booklet={booklet.name}/>);
			booklet.quotables.forEach(function(quotable) {
				contentRow.unshift(
					<QuoteBox title={quotable.title} url={quotable.url} text={quotable.text} time={quotable.time} />
				);
			});
		}.bind(this));	
		return (
			<div className="quoteStream">
				<h1> QuoteStream </h1>
				{contentRow}
			</div>
		);
	}
});

var QuoteBox = React.createClass({
	render: function() {
		return (
			<div className="quoteBox">
			 	This is the Quote Box
			 	Quotable: <QuoteText text={this.props.text}/>
				Title: <QuoteTitle title={this.props.title}/>
				Time: <QuoteTime time={this.props.time}/>
				URL: <QuoteUrl url={this.props.url}/>
			</div>

			);
	}
});

var QuoteText = React.createClass({
	render: function() {
		return (
			<div className="quoteText">
			 	{this.props.text}
			</div>
			);
	}
});

var QuoteTitle = React.createClass({
	render: function() {
		return (
			<div className="quoteTitle">
			 	{this.props.title}
			</div>
			);
	}
});

var QuoteUrl = React.createClass({
	render: function() {
		return (
			<div className="quoteTitle">
			 	{this.props.url}
			</div>
			);
	}
});

var QuoteTime = React.createClass({
	render: function() {
		return (
			<div className="quoteTime">
			 	{this.props.time}
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
	<QuoteStream url="/quote" pollInterval={2000} />,
	document.getElementById("quoteStream")
);