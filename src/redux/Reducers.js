import { combineReducers } from 'redux'

import { MODIFY_AK, MODIFY_SK, MODIFY_BUCKET, MODIFY_HOST,MODIFY_TOKEN_HOST, MODIFY_CONFIG } from "./Actions"

import { setCookie, AK, SK, HOST, BUCKET,TOKEN_HOST } from "../component/Common"

function config(state = [], action) {
    switch (action.type) {
        case MODIFY_AK:
            setCookie(AK, action.config.ak, 100)
            return {
                host: state.host,
                ak: action.config.ak,
                sk: state.sk,
                bucket: state.bucket,
                tokenHost:state.tokenHost
            };

        case MODIFY_TOKEN_HOST:
            setCookie(TOKEN_HOST,action.config.tokenHost,100)
            return{
                host: state.host,
                ak: action.ak,
                sk: state.sk,
                bucket: state.bucket,
                tokenHost:state.config.tokenHost
            }

        case MODIFY_SK:
            setCookie(SK, action.config.sk, 100)
            return {
                host: state.host,
                ak: state.ak,
                sk: action.config.sk,
                bucket: state.bucket,
                tokenHost:state.tokenHost
            };

        case MODIFY_BUCKET:
            setCookie(BUCKET, action.config.bucket, 100)
            return {
                host: state.host,
                ak: state.ak,
                sk: state.sk,
                bucket: action.config.bucket,
                tokenHost:state.tokenHost
            };

        case MODIFY_HOST:
            setCookie(HOST, action.config.host, 100)
            return {
                host: action.config.host,
                ak: state.ak,
                sk: state.sk,
                bucket: state.bucket,
                tokenHost:state.tokenHost
            };

        case MODIFY_CONFIG:
            setCookie(HOST, action.config.host, 100)
            setCookie(AK, action.config.ak, 100)
            setCookie(SK, action.config.sk, 100)
            setCookie(BUCKET, action.config.bucket, 100)
            setCookie(TOKEN_HOST, action.config.tokenHost, 100)
            return {
                host: action.config.host,
                ak: action.config.ak,
                sk: action.config.sk,
                bucket: action.config.bucket,
                tokenHost:action.config.tokenHost
            }



        default:
            return state;
    }
}






const AppAction = combineReducers({
    config
})

export default AppAction;