import * as React from 'react';

export default function Header(props){
    return(
        <header>
            <h1>{props.pageTitle}</h1>
        </header>
    );
}