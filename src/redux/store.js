import { dialogReducer } from "./dialogReducer"
import { profileReducer } from "./profileReducer"



let store = {
    _state: {
        
        
    },

    _callsubscriber() {

    },
    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callsubscriber = observer;
    },

    dispatch(action) {
    
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action)

        this._callsubscriber(this._state)
    },
}





window.store = store
export default store