import profileReduser from "./profile-reduser";
import dialogReduser from "./dialog-reduser";

let store = {
    _state: {
       dialogPage: {
        masaggedata: [
            { id: 1, masagges: 'Hi' },
            { id: 2, masagges: 'My name is Yura' },
            { id: 3, masagges: 'Hi' }
        ],
        dialogsUser: [
            { id: 1, name: 'Yura' },
            { id: 2, name: 'Vova' },
            { id: 3, name: 'Dima' }
        ],
        newMassageText: ""
       },
       postPage: {
        post: [
            { id: 1, name: 'Yura', likes: '15' },
            { id: 2, name: 'Vova', likes: '10' },
            { id: 3, name: 'Dima', likes: '25' }
        ],
        newPostText: 'Hi'
       }
    },
    _callSubscriber() {
        console.log("ok")
    },
    getState() {
        return this._state
    },
    subscriber(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {

        this._state.postPage = profileReduser(this._state.postPage, action)
        this._state.dialogPage = dialogReduser(this._state.dialogPage, action)

        this._callSubscriber(this._state)
    }
}

window.store = store;

export default store