/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
        this.load();
        setInterval(this.load, this.props.pollInterval);
    },
    getInitialState: function() {
        return ({data: []});
    },
    render: function() {
        var contentRow = [];
        var data = this.state.data;

        for (var i = data.length - 1; i >= 0; i--) {
            var quotable = data[i];
            data.forEach(function(quotable) {
                contentRow.push(QuoteBox({quotable: quotable}));
            }.bind(this));
        }

        return (
            React.DOM.div({className: "quoteStream"}, 
                React.DOM.h1(null, " QuoteStream "), 
                ReactCSSTransitionGroup({transitionName: "example"}, 
                    contentRow
                )
            )
        );
    }
});
 
var QuoteBox = React.createClass({displayName: 'QuoteBox',
    render: function() {
        return (
            React.DOM.div({className: "quoteBox"}, 
                QuoteTitle({title: this.props.quotable.title, url: this.props.quotable.url}), 
                QuoteText({text: this.props.quotable.text}), 
                QuoteTime({time: this.props.quotable.createdAt}), 
                React.DOM.hr(null)
            )
        );
    }
});
 
var QuoteText = React.createClass({displayName: 'QuoteText',
    render: function() {
        return (
            React.DOM.blockquote({className: "quoteText"}, 
                this.props.text
            )
        );
    }
});
 
var QuoteTitle = React.createClass({displayName: 'QuoteTitle',
    render: function() {
        return (
            React.DOM.div({className: "quoteTitle"}, 
                React.DOM.strong(null, 
                    React.DOM.a({href: this.props.url}, this.props.title)
                )
            )
        );
    }
});
 
var QuoteUrl = React.createClass({displayName: 'QuoteUrl',
    render: function() {
        return (
            React.DOM.small({className: "quoteTitle"}, 
                this.props.url
            )
        );
    }
});
 
var QuoteTime = React.createClass({displayName: 'QuoteTime',
    render: function() {
        return (
            React.DOM.div(null, 
                React.DOM.small({className: "quoteTime"}, 
                    this.props.time
                )
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
    QuoteStream({url: "/quote", pollInterval: 2000}),
    document.getElementById("quoteStream")
);
