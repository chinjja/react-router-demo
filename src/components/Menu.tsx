import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

export default class Menu extends React.Component {
    render() {
        const activeStyle: CSSProperties = {
            color: 'green',
            fontSize: '2rem',
        };

        return (
            <div>
                <ul>
                    <li><NavLink exact to='/' activeStyle={activeStyle}>Home</NavLink></li>
                    <li><NavLink exact to='/about' activeStyle={activeStyle}>About</NavLink></li>
                    <li><NavLink to='/about/foo' activeStyle={activeStyle}>About Foo</NavLink></li>
                    <li><NavLink to='/posts' activeStyle={activeStyle}>Posts</NavLink></li>
                </ul>
                <hr/>
            </div>
        );
    };
}