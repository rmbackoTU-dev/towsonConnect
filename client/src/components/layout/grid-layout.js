import React, {Component} from 'react';
import {HeaderTop, HeaderBottom } from '../header/Header';
import './layout.css';


class Layout extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            content:'Notifications'
        }
        this.handleContent=this.handleContent.bind(this);
    }

    handleContent(page)
    {
        console.log("Called from NavBar");
        this.setState({content: page});
    }

    render()
    {
        return(
            <div className="wrapper">
                <div className='header'>
                    <HeaderTop />
                    <HeaderBottom 
                    selected={this.state.content}
                    onNavigation={this.handleContent}
                    />
                </div>
                <div className='box2'>
                    <p>{this.state.content}</p>
                </div>
            </div>
        );
    }

}

export default Layout;