import React, {Component,Fragment} from 'react';
import LoginFlex from './LoginFlex';

const HeaderTop=() =>
{
    return(
        <Fragment>
            <div className='header-top'>
                <div className='logo-icon'>
                <img src={process.env.PUBLIC_URL +'/towson-branded-logos/TowsonUlogo-horiz-color-rev_logoSize.png'}
                        alt='Towson University Logo'
                        className='towsonLogo'/>
                </div>
                <LoginFlex />
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
            this.state=
            {
                selected:props.isSelected
            };
        }

        handleClick(e)
        {
            e.preventDefault();
            let selected=this.state.selected;
            if(selected)
            {
                this.setState({selected: false});
            }
            else
            {
                this.setState({selected:true})
            }
            this.props.onSelect(this.props.linkName);
        }

        render()
        {
            if(this.state.selected)
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
        const selection=this.props.selected;
        console.log(selection);
        if(selection ==='Courses')
        {
            return(
                <div className='navBox'>
                    <NavLink linkName='Courses' href='/courses'
                    isSelected={false}
                    onSelect={this.props.onNavigation}/>
                    <NavLink linkName='Notifications'href='/notifications'
                    isSelected={true}
                    onSelect={this.props.onNavigation} />
                </div>
            );
        }
        else if(selection === 'Notifications')
        {
            console.log("if works");
            return(
                <div className='navBox'>
                    <NavLink linkName='Courses' href='/courses'
                    isSelected={false}
                    onSelect={this.props.onNavigation}/>
                    <NavLink linkName='Notifications'href='/notifications' 
                    isSelected={true}
                    onSelect={this.props.onNavigation} />
                </div>
            );
        }
    }
}

export {HeaderTop, HeaderBottom};
