import React, {Component} from 'react';
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/fontawesome-free-solid"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



class Notification extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            display: {display: 'none'},
        }
        this.handleClick=this.handleClick.bind(this);
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
        const feedItemKey=this.props.feedItemKey;
        const header=this.props.header;
        const shortDescription=this.props.short_Description;
        const longDescription=this.props.long_Description;
        const location=this.props.location;

        console.log("id in Component: "+feedItemKey);
        console.log("header in Component: "+header);
        console.log("short_description in Component: "+shortDescription);
        console.log("long_description in Component: "+longDescription);
        console.log("location in Component: "+location)
        console.log("The props in the component: "+JSON.stringify(this.props));
        


        return(
            <div className='feed-item' >
                <h2 className='notificationTitle'>{this.props.header}</h2>
                <div className="collapsible">
                    {this.props.short_description}
                    <FontAwesomeIcon onClick={this.handleClick} icon={["fas", "sort-down"]} 
                    className='expandIcon'
                    />
                    <div className='long-description' style={this.state.display} >
                        <p>{this.props.long_description}</p>
                        <a href={this.props.location}>Go to</a>
                    </div>
                </div>
            </div>
        );
    }
}



export default Notification;
