import React, {Component} from 'react';


const ListNotifications=(props) =>
{

    var notifications=props.notificationArray;
    var notificationItems=notifications.map((notification, index) =>

            <div className="notify-item" key={("key")+index}>
                <p>{notification}</p>
            </div>
    )
    var listKey="Notification "+props.notificationNumber;
    return (
        <div className="notify-list" key={listKey}>
            {notificationItems}
        </div>
    );
}



class NotifyItemList extends Component
{
    constructor(props)
    {
        super(props);
        this.notifications=props.notificationArray;
        this.notifyNum=props.notificationNumer;
    }

    render()
    {
        return(
            <ListNotifications notificationArray={this.notifications} 
            notifyNum={this.notificationNumber} />
        );
    }
}




export default NotifyItemList;