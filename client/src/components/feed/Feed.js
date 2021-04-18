import React, {Component} from 'react';



class Notification extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            display: {display: 'none'},
        }
        this.handleClick.bind(this);
    }

    handleClick(e)
    {
        if(this.state.display.display === "none")
        {
            this.setState({display: {display: "block"}});
        }
        else
        {
            this.setState({display: {display: "none"}});
        }
    }

    render(){
        return(
            <div className='feedItem' key={this.props.feedItemKey}>
                <h2>this.props.header</h2>
                <button onClick={this.handleClick} className="collapsible">
                    {this.props.shortDescription}
                </button>
                <div className='long-description' style={this.state.display} >
                    <p>{this.props.longDescription}</p>
                    <a href={this.props.location}>Go to</a>
                </div>
            </div>
        );
    }
}



function Feed(props)
{
    const notificationObjList=props.notifications;
    notificationObjList.map( (notificationObj, index) =>
    {
        return(
        <Notification
        header={notificationObjList.header}
        shortDescription={notificationObjList.short_description}
        longDescription={notificationObjList.long_description}
        location={notificationObjList.hyperlink}
        key={notificationObjList._id} />
        );
    } );

    return(
    <div className='feed-items'>
        {notificationObjList}
    </div>
    );
}


export default Feed;
