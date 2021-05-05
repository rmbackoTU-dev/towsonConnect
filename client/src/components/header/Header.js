import React, {Component,Fragment} from 'react';
import LoginFlex from './LoginFlex';

const HeaderTop=(props) =>
{
    
    return(
        <Fragment>
            <div className='header-top'>
                <div className='logo-icon'>
                    <img src={process.env.PUBLIC_URL +'/towson-branded-logos/TowsonU_ConnectLogo.png'}
                        alt='Towson University Logo'
                        className='towsonLogo'/>
                </div>
                <LoginFlex isLoggedIn={props.success}/>
            </div>
        </Fragment>
    );
}

class NavLink extends Component
{

        constructor(props)
        {
            super(props);
            this.handleClick=this.handleClick.bind(this);
        }

        handleClick(e)
        {
            e.preventDefault();
            this.props.onSelect(this.props.selectedId);
        }

        render()
        {
            if(this.props.selected)
            {
                return(
                <div className='linkSelected'>
                    <a href={this.props.href} onClick={this.handleClick} >
                        {this.props.linkName}
                    </a>
                </div>
                );
            }
            else
            {
                return(
                <div className='linkUnselected'>
                <a href={this.props.href}  onClick={this.handleClick}>
                    {this.props.linkName}
                </a>
                </div>
                );
            }
        }
}

class HeaderBottom  extends Component
{



    render() {
        const selection=this.props.selectedItem;
       
        if(selection === 0)
        {
            console.log('Notification');
            return(
                <div className='navbox'>
                    <NavLink linkName='Courses' href='/courses'
                    selected={false}
                    onSelect={this.props.onNavigation}
                    selectedId={1}/>
                    <NavLink linkName='Notifications'href='/notifications'
                    selected={true}
                    onSelect={this.props.onNavigation} 
                    selectedId={0}/>
                </div>
            );
        }
        else if(selection === 1)
        {
            console.log('Courses');
            return(
                <div className='navbox'>
                    <NavLink linkName='Courses' href='/courses'
                    selected={true}
                    onSelect={this.props.onNavigation}
                    selectedId={1}/>
                    <NavLink linkName='Notifications'href='/notifications' 
                    isSelected={false}
                    onSelect={this.props.onNavigation}
                    selectedId={0}
                     />
                </div>
            );
        }
    }
}

export {HeaderTop, HeaderBottom};
