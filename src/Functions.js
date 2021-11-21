import axios from "axios";
import {Cookies} from "react-cookie";


const BASE_URL = 'https://dog-meets-api.herokuapp.com/';


export function userLogin(username, password) {
    let url = BASE_URL + 'auth/'
    let bodyFormData = new FormData()
    bodyFormData.append('username', username)
    bodyFormData.append('password', password)
    return axios.post(url, bodyFormData)
        .then(response => {
            console.log(response.data.token)
            let cookies = new Cookies()
            cookies.set('myToken', response.data.token)
            window.location.reload(false);

        }).catch(err => Promise.reject("something wrong"))
}

export function getUserInfo(token){
    let url = BASE_URL + 'api/getuser/'
    return axios.get(url, {headers: {
        'Authorization': 'Token '+token}}).then(response => response.data);
}

export function isMyDog(owner, user){
    if(Object.keys(user).length !==0){
        return user.id === owner
    }
    return false
}

export function isMyActivity(owner, user){
    if(Object.keys(user).length !==0){
        return user.id === owner
    }
    return false
}

// Activities
export function getAllActivities() {
    let url = BASE_URL + 'api/activities/'
    return axios.get(url).then(response => response.data)
}

export function getActivity(activityID){
    let url = BASE_URL + 'api/activities/' + activityID + '/'
    return axios.get(url).then(response => response.data);
}

export function addActivity(token, name, location, startTime, description, owner){
    let url = BASE_URL + 'api/activities/'
    return axios.post(url, {
        "name": name,
        "location": location,
        "startTime": startTime,
        "description": description,
        "owner": owner,
    },{headers: {
		'Authorization': 'Token '+token}})
		.then(response => {
		    alert("Post Added")
            window.location.href = "/";
		})
		.catch(err => Promise.reject('Add Post Failed!'));
}

export function updateActivity(token, activityID, name, location, startTime, owner){
    let url = BASE_URL + 'api/posts/'+activityID+'/'
    return axios.put(url, {
        "name": name,
        // "header_image": header_image,
        "location": location,
        "startTime": startTime,
        "owner": owner,
    },{headers: {
		'Authorization': 'Token '+token}})
		.then(response => {
		    alert("Activity Updated")
            window.location.href = "/";
		})
		.catch(err => Promise.reject('Edit Post Failed!'));
}

export function deleteActivity(token, activityID){
    let url = BASE_URL + 'api/posts/'+activityID+'/'

    return axios.delete(url, {headers: {
		'Authorization': 'Token '+token}})
        .then(response => {
         alert("Activity Deleted")
    });
}


export function attendEvent(token, userID, activityID){
    let url = BASE_URL + 'api/attendevent/'
    return axios.patch(url, {
        "user_id":userID,
        "post_id":activityID
    },{headers: {
		'Authorization': 'Token '+token}})
		.then(response => {
            window.location.reload(false);
		})
		.catch(err => Promise.reject('Something wrong'));
}

export function disAttendEvent(token, userID, activityID){
    let url = BASE_URL + 'api/disattendevent/'
    return axios.patch(url, {
        "user_id":userID,
        "post_id":activityID
    },{headers: {
		'Authorization': 'Token '+token}})
		.then(response => {
            window.location.reload(false);
		})
		.catch(err => Promise.reject('Something wrong'));
}



// Dogs
export function getAllDogs() {
    let url = BASE_URL + 'api/dogs/'
    return axios.get(url).then(response => response.data)
}

export function getTheDog(dogID){
    let url = BASE_URL + 'api/dogs/' + dogID + '/'
    return axios.get(url).then(response => response.data);
}

export function addDog(token, name, breed, height,weight, birthday, image, owner){
    let url = BASE_URL + 'api/dogs/'
    return axios.post(url, {
        "name": name,
        "breed": breed,
        "height": height,
        "weight": weight,
        "birthday": birthday,
        // "image": image,
        "owner": owner,
    },{headers: {
		'Authorization': 'Token '+token}})
		.then(response => {
		    alert("Post Added")
            window.location.href = "/";
		})
		.catch(err => Promise.reject('Add Post Failed!'));
}
