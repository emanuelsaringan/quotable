/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
/*
 Get param value from URL (Source: StackOverflow)
*/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var bookletID = getParameterByName('booklet');

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

        $('.timeago').timeago();
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

        data.forEach(function(quotable) {
            contentRow.unshift(QuoteBox({quotable: quotable}));
        }.bind(this));

        return (
            React.DOM.div({className: "quoteStream"}, 
                React.DOM.div({className: "quoteBookletTitle"}, 
                    "your quotables"
                ), 
                Banner(null), 
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
                QuoteText({text: this.props.quotable.text}), 
                QuoteTitle({title: this.props.quotable.title, url: this.props.quotable.url}), 
                QuoteTime({time: this.props.quotable.createdAt}), 
                QuoteLogo(null), 
                React.DOM.hr(null)
            )
        );
    }
});

var Banner = React.createClass({displayName: 'Banner',
    render: function() {
        if (bookletID) {
            return (
                React.DOM.img({src: "/img/angel.jpg", alt: "Banner", width: "100", height: "100"})
            );
        }

        return (
            React.DOM.span(null)
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
                    React.DOM.a({href: this.props.url, target: "_blank"}, this.props.title)
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
                React.DOM.small({className: "quoteTime timeago", title: this.props.time})
            )
        );
    }
});
 
var QuoteLogo = React.createClass({displayName: 'QuoteLogo',
    render: function() {
        return (
            React.DOM.div({className: "quoteLogo"}, 
                React.DOM.img({src: "/img/quotableicon.png"})
            )
        );
    }
});

React.renderComponent(
    QuoteStream({url: bookletID ? '/booklet/' + bookletID : '/quote', pollInterval: 2000}),
    document.getElementById("quoteStream")
);
