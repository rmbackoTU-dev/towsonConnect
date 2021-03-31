import React, {Component, Fragment} from 'react';


const MyMessages= (props) =>
{
    return(
        <a href={props.endpoint}>
            My Messages
        </a>
    );
}

class NavigationBar extends Component
{
    
    render()
    {
        return(
            <div className='nav-list'>
                <MyMessages />
                <MyMedia />
                <MyClasses />
            </ div>
        )
    }
}

class AccountButton extends Component
{
    constructor(props)
    {
        super(props);
        state=
        {
            loggedin=false
        }
    }

    render()
    {
        return(<Circle />);
    }
}
}