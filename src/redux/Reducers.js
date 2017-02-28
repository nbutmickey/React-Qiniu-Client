import { combineReducers } from 'redux'

import { MODIFY_AK, MODIFY_SK, MODIFY_BUCKET, MODIFY_HOST, MODIFY_CONFIG } from "./Actions"

import { setCookie, AK, SK, HOST, BUCKET } from "../component/Common"

function config(state = [], action) {
    switch (action.type) {
        case MODIFY_AK:
            setCookie(AK, action.ak, 100)
            return {
                host: state.host,
                ak: action.config.ak,
                sk: state.sk,
                bucket: state.bucket
            };

        case MODIFY_SK:
            setCookie(SK, action.sk, 100)
            return {
                host: state.host,
                ak: state.ak,
                sk: action.config.sk,
                bucket: state.bucket
            };

        case MODIFY_BUCKET:
            setCookie(BUCKET, action.bucket, 100)
            return {
                host: state.host,
                ak: state.ak,
                sk: state.sk,
                bucket: action.config.bucket
            };

        case MODIFY_HOST:
            setCookie(HOST, action.host, 100)
            return {
                host: action.config.host,
                ak: state.ak,
                sk: state.sk,
                bucket: state.bucket
            };

        case MODIFY_CONFIG:
            setCookie(HOST, action.config.host, 100)
            setCookie(AK, action.config.ak, 100)
            setCookie(SK, action.config.sk, 100)
            setCookie(BUCKET, action.config.bucket, 100)
            return {
                host: action.config.host,
                ak: action.config.ak,
                sk: action.config.sk,
                bucket: action.config.bucket
            }



        default:
            return state;
    }
}






const AppAction = combineReducers({
    config
})

export default AppAction;