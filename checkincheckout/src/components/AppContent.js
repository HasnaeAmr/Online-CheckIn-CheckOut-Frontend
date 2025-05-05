import * as React from 'react'
import WelcomeContent from '/WelcomeContent'
import AuthContent from './AuthContent'
import {request , setAuthToken} from '../axios_helper'

export default class AuthContent extends React.Component{
        render(){
            return(
                <div>
                    <WelcomeContent/>
                    <AuthContent/>
                </div>
            )

        }
    }