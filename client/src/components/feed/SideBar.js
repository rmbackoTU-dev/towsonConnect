//Feed-Sidebar
import React, {Component} from 'react';
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/fontawesome-free-solid"
import "./feed.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class SideBarLink extends Component
{
    constructor(props)
    {
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(e)
    {
        e.preventDefault();
        this.props.onSelect(this.props.itemNum ,this.props.notificationType);
    }


    render()
    {
        if(this.props.isSelected)
        {
            return(
                <div className='notificationButton'>
                    <button  className='sideBarLink' onClick={this.handleClick}>
                        <FontAwesomeIcon 
                        className="highlighted"
                        icon={["fas", this.props.fontAwesomeIcon]}
                        size='3x'/>
                    </button>
                </div>
            );
        }
        else
        {
            return(
                <div className='notificationButton'>
                    <button onClick={this.handleClick}>
                        <FontAwesomeIcon 
                        className="unhighlighted"
                        icon={["fas", this.props.fontAwesomeIcon]}
                        size='3x'/>
                    </button>
                </div>
            );
        }

    }
};


class SideBar extends Component
{

    constructor(props)
    {
        super(props)
        this.state={
            highlighted:0
        }
        this.handleNavigation=this.handleNavigation.bind(this);
    }

    handleNavigation(highlightedButton, notificationType)
    {
        this.setState({highlighted: highlightedButton });
        this.props.onNavigation(notificationType);
    }

    render()
    {
        if(this.state.highlighted === 0)
        {
            return(
                <div className='sideBar'>
                    <SideBarLink
                        isSelected={true}
                        fontAwesomeIcon={"bell"}
                        className={"bellIcon"}
                        onSelect={this.handleNavigation}
                        notificationType="Notification"
                        itemNum={0}
                    ></SideBarLink>
                    <SideBarLink
                        isSelected={false}
                        fontAwesomeIcon={"comment"}
                        className={"messageIcon"}
                        onSelect={this.handleNavigation}
                        notificationType="Message"
                        itemNum={1}
                    ></SideBarLink>
                </div>
            );
        }
        else if(this.state.highlighted === 1)
        {
            return(
                <div className='sideBar'>
                    <SideBarLink
                        isSelected={false}
                        fontAwesomeIcon={"bell"}
                        className={"bellIcon"}
                        onSelect={this.handleNavigation}
                        notificationType="Notification"
                        itemNum={0}
                    ></SideBarLink>
                    <SideBarLink
                        isSelected={true}
                        fontAwesomeIcon={"comment"}
                        className={"messageIcon"}
                        onSelect={this.handleNavigation}
                        notificationType="Message"
                        itemNum={1}
                    ></SideBarLink>
                </div>
            );
        }
    }
}

export default SideBar;
