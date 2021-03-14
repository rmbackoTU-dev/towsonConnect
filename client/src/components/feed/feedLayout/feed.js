//page feed
import React, {Component, Fragment} from 'react';
import NotifyItemList from '../notifications/NotifyItem';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync} from '@fortawesome/fontawesome-free-solid';
import "./feed.css"




class Feed extends Component
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

    createnotification= (event) =>
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
         console.log(this.state.notificationCount);
    }


    render()
    {
        return(
            <div className="feed-grid-column">
                    <div id="refreshButton">
                        <button onClick={ this.createnotification}>
                            <FontAwesomeIcon icon="sync" size="sm"/> Refresh Notifications
                        </button>
                    </div>      
                    <div id="feed-items">
                        <NotifyItemList notificationArray={this.state.notifications}
                        notificationNumber={this.state.notificationCount} notificationUpdated={this.state.updated} 
                        />
                    </div>
            </div>
        );
    }
}

export default Feed;
