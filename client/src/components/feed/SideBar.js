//Feed-Sidebar
import React, {Component} from 'react';
import "./feed.css"


class SideBarLink extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            selected: props.isSelected
        };
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(e)
    {
        e.preventDefault();
        this.setState( (state) => {
            const letSelected=this.state.selected;
            return({selected: !(state.selected)});
        })
        this.props.onSelect(this.props.notificationType);
    }


    render()
    {
        if(this.state.selected)
        {
            return(
                <div className='notificationButton'>
                    <button onClick={this.handleClick}>
                        <img src={this.props.imgHighlightedUrl} 
                        alt={this.props.imgHighlightedAlt}
                        className={this.props.imgClassName}/>
                    </button>
                </div>
            );
        }
        else
        {
            return(
                <div className='notificationButton'>
                    <button onClick={this.handleClick}>
                        <img src={this.props.imgUnhighlightedUrl} 
                        alt={this.props.imgUnhighlightedAlt}
                        className={this.props.imgClassName}/>
                    </button>
                </div>
            );
        }

    }
};


class SideBar extends Component
{
    render(){
        const navigationHandler=this.props.onNavigation;
        return(
            <div className='sideBar'>
                <SideBarLink
                    isSelected={true}
                    imgHighlightedUrl={process.env.PUBLIC_URL+'/nav-logos/bell_highlighted.png'}
                    imgHighlightedAlt={"Highlighted Bell Icon"}
                    imgUnhighlightedUrl={process.env.PUBLIC_URL+'/nav-logos/bell_unhighlighted.png'}
                    imgUnhighlightedAlt={"Unhighlighted Bell Icon"}
                    className={"bellIcon"}
                    onSelect={navigationHandler}
                    notificationType="Notifications"
                />
                 <SideBarLink
                    isSelected={true}
                    imgHighlightedUrl={process.env.PUBLIC_URL+'/nav-logos/message_highlighted.png'}
                    imgHighlightedAlt={"Highlighted Message Icon"}
                    imgUnhighlightedUrl={process.env.PUBLIC_URL+'/nav-logos/message_unhighlighted.png'}
                    imgUnhighlightedAlt={"Unhilighted Message Icon"}
                    className={"messageIcon"}
                    onSelect={navigationHandler}
                    notificationType="Messages"
                />
            </div>
        )
    }
}

export default SideBar;
