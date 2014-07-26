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
                <Banner/>
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
                <QuoteLogo text={this.props.quotable.text}/>
                <hr/>
            </div>
        );
    }
});

var Banner = React.createClass({
    render: function() {
        if (bookletID) {
            return (
                <img src="/img/angel.jpg" alt="Banner" width="100" height="100"/>
            );
        }

        return (
            <span></span>
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
                    <a href={this.props.url} target="_blank">{this.props.title}</a>
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
                <a href={"http://twitter.com/share?url=" + encodeURIComponent("http://localhost:3000") + "&text=" + this.props.text} target="_blank">
                    <img className="moveToBooklet" src="/img/btnShareTwitter.png" alt="Twitter"/>
                </a>
                <a href={"http://www.facebook.com/sharer.php?u=" + encodeURIComponent("http://localhost:3000")} target="_blank">
                    <img className="moveToBooklet" src="/img/btnShareFB.png" alt="FB"/>
                </a>
                <a><img className="moveToBooklet" src="/img/bookletTechnopreneurship.png" /></a>
                <a><img className="moveToBooklet" src="/img/bookletDesign.png" /></a>
                <a><img className="moveToBooklet" src="/img/bookletBusiness.png" /></a>
            </div>
        );
    }
});

React.renderComponent(
    <QuoteStream url={bookletID ? '/booklet/' + bookletID : '/quote'} pollInterval={2000} />,
    document.getElementById("quoteStream")
);
