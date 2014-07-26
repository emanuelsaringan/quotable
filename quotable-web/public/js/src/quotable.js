/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var QuoteStream = React.createClass({
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
            contentRow.unshift(<QuoteBox quotable={quotable}/>);
        }.bind(this));

        return (
            <div className="quoteStream">
                <div className="quoteBookletTitle">
                    your quotables
                </div>
                <ReactCSSTransitionGroup transitionName="example">
                    {contentRow}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});
 
var QuoteBox = React.createClass({
    render: function() {
        return (
            <div className="quoteBox">
                <QuoteText text={this.props.quotable.text}/>
                <QuoteTitle title={this.props.quotable.title} url={this.props.quotable.url}/>            
                <QuoteTime time={this.props.quotable.createdAt}/>
                <QuoteLogo />
                <hr/>
            </div>
        );
    }
});
 
var QuoteText = React.createClass({
    render: function() {
        return (
            <blockquote className="quoteText">
                {this.props.text}
            </blockquote>
        );
    }
});
 
var QuoteTitle = React.createClass({
    render: function() {
        return (
            <div className="quoteTitle">
                <strong>
                    <a href={this.props.url}>{this.props.title}</a>
                </strong>
            </div>
        );
    }
});
 
var QuoteUrl = React.createClass({
    render: function() {
        return (
            <small className="quoteTitle">
                {this.props.url}
            </small>
        );
    }
});
 
var QuoteTime = React.createClass({
    render: function() {
        return (
            <div>
                <small className="quoteTime timeago" title={this.props.time}></small>
            </div>
        );
    }
});
 
var QuoteLogo = React.createClass({
    render: function() {
        return (
            <div className="quoteLogo">
                <img src="/img/quotableicon.png" />
            </div>
        );
    }
});
 
React.renderComponent(
    <QuoteStream url="/quote" pollInterval={2000} />,
    document.getElementById("quoteStream")
);
