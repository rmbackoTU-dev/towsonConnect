import React, {Component, Fragment} from 'react';
import NotifyItemList from '../notifications/NotifyItem';
import './layout.css'

const BodyHeader=() =>
{
    return(
    <Fragment>
        <div className="logo">
        </div>
        <div className="header">
            <h1>Welcome to Towson Connect</h1>
        </div>
    </Fragment>
    );
    
}

class Layout extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            notifications:[],
            notificationCount:0,
            updated:false
        };
        
    }

   createnotification()
   {
        console.log("Creating!");
        let updatedNotifications=this.state.notifications;
        let updatedNotificationCount=this.state.notificationCount;
        updatedNotificationCount++;
        let notificationMessage="Hello "+updatedNotificationCount;
        updatedNotifications.push(notificationMessage);
        this.setState(
            {
                notifications:updatedNotifications,
                notificationCount:updatedNotificationCount
            }
        );
   }

   

    render()
    {
        return(
            <div className="body-grid-container">
                <BodyHeader />
                <div className="nav-grid-column">
                    <button onClick={() => this.createnotification()}>Create Sample Notification!</button>
                </div>
                <div className="feed-grid-column">
                    <div id="feed-items">
                        <NotifyItemList notificationArray={this.state.notifications} 
                        notificationNumber={this.state.notificationCount} notificationUpdated={this.state.updated} />
                    </div>
                </div>
                <div className="info-grid-column"></div>
            </div>
        );
    }

}

export default Layout;