/** @jsx React.DOM */
 
var QuoteStream = React.createClass({displayName: 'QuoteStream',
    load: function() {
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
        setInterval(this.load, this.props.pollInterval);
    },
    getInitialState: function() {
        return ({data: []});
    },
    render: function() {
        console.log(this.props.data);
        var contentRow = [];
        var data = this.state.data;
        data.forEach(function(quotable) {
            contentRow.unshift(QuoteBox({quotable: quotable}));
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
                "Quotable: ", QuoteText({text: this.props.text}), 
                "Title: ", QuoteTitle({title: this.props.title, url: this.props.url}), 
                "From: ", QuoteUrl({url: this.props.url}), 
                "Time: ", QuoteTime({time: this.props.createdAt}), 
                React.DOM.br(null)
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
                React.DOM.a({href: this.props.url}, 
                    this.props.title
                )
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
    QuoteStream({url: "/quotes", pollInterval: 2000}),
    document.getElementById("quoteStream")
);
