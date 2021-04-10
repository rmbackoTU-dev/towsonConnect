import React, {Component, Fragment} from 'react';
import NotifyItemList from '../notifications/NotifyItem';
import Feed from '../feedLayout/Feed'
import './layout.css'

const BodyHeader=() =>
{
    return(
    <Fragment>
        <div className="logo">
            <p>Logo</p>
        </div>
        <div className="header">
            <h1>Welcome to Towson Connect</h1>
        </div>
    </Fragment>
    );
    
}

class Layout extends Component
{

    render()
    {
        return(
            <div className="body-grid-container">
                <BodyHeader />
                <Feed />
                <div className="emptySpace"></div>
            </div>
        );
    }

}

export default Layout;