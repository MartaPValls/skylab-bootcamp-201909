import React from 'react'
const API_URL = process.env.REACT_APP_API_URL

export default function({ friend : { name, id, wishes }, deleteFriend}){
    return <li className="friends__item">
    <div className="friends__info">
        <span className="friends__name"> {name} </span>
        <img className="friends__photo" src={`${API_URL}/users/profileimage/${id}?timestamp=${Date.now()}`} alt="profile photo"/>
        <button className="friends__delete" onClick={event => { event.preventDefault(); deleteFriend(id) }}> Delete friend</button>
    </div>
    <div className="friends__wishes">
    <ul className="friends__wisheslist">
            {wishes.map(wish => <li>
             <img src={`${API_URL}/wishes/${id}/wish/${wish._id.toString()}?timestamp=${Date.now()}`} alt="wish photo" className="friends__wish"/>
            </li>)}
        </ul>
    </div>
</li>
}