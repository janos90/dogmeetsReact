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

        }).catch(err => Promise.reject("something wrong" + err))
}

export function registerUser(firstName, lastName, email, phone, bio, username, password){
    let url = BASE_URL + 'api/users/'
    return axios.post(url, {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "username": username,
        "password": password,
    })
        .then(() => {
            alert("User Created")
            window.location.href = "/login";
        })
        .catch(err => Promise.reject('Add User Failed!' + err));
}

export function getProfile(token, profileId){
    let url = BASE_URL + 'api/profiles/' + profileId + '/'
    return axios.get(url, {headers: {
            'Authorization': 'Token '+token}}).then(response => response.data);
}


export function updateProfile(token, userId, profileId, firstName, lastName, imageURL, email, phone, bio, username){
    let url = BASE_URL + 'api/users/'+userId+'/'
    return axios.patch(url, {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "username": username,
    },{headers: {
            'Authorization': 'Token '+token}})
        .then(() => {
            let url = BASE_URL + 'api/profiles/'+profileId+'/'
            return axios.patch(url, {
                "bio": bio,
                "phone": phone,
                        "imageURL": imageURL,

            },{headers: {
                    'Authorization': 'Token '+token}})
                .then(() => {
                    alert("Profile Updated")
                    window.location.href = "/";
                })
                .catch(err => Promise.reject('Edit Profile Failed!' + err));
        })
        .catch(err => Promise.reject('Edit Profile Failed!' + err));

}



export function getUserInfo(token){
    let url = BASE_URL + 'api/getuser/'
    return axios.get(url, {headers: {
            'Authorization': 'Token '+token}}).then(response => response.data);
}


export function getUserById(token, userID){
    let url = BASE_URL + 'api/users/' + userID + '/'
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

export function getDistance(lat1, lat2, lon1, lon2) {

        // The math module contains a function
        // named toRadians which converts from
        // degrees to radians.
        lon1 =  lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;

        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.pow(Math.sin(dlon / 2),2);

        let c = 2 * Math.asin(Math.sqrt(a));

        // Radius of earth in kilometers. Use 3956
        // for miles
        let r = 6371;

        // calculate the result
        return(c * r);
    }


// Activities
export function getAllActivities() {
    let url = BASE_URL + 'api/activities/'
    return axios.get(url).then(response => {
        return response.data
    })
}

export function getActivity(activityID){
    let url = BASE_URL + 'api/activities/' + activityID + '/'
    return axios.get(url).then(response => response.data);
}

export function addActivity(token, name, location, startTime, description, imageURL, owner, lat, lng){
    let url = BASE_URL + 'api/activities/'
    return axios.post(url, {
        "name": name,
        "location": location,
        "startTime": startTime,
        "description": description,
        "imageURL": imageURL,
        "owner": owner,
        "lat": lat,
        "lng": lng,
    },{headers: {
            'Authorization': 'Token '+token}})
        .then(() => {
            alert("Post Added")
            window.location.href = "/";
        })
        .catch(err => Promise.reject('Add Post Failed!' + err));
}

export function updateActivity(token, activityID, name, location, startTime, description, imageURL, lat, lng){
    let url = BASE_URL + 'api/activities/'+activityID+'/'
    return axios.patch(url, {
        "name": name,
        "location": location,
        "startTime": startTime,
        "description": description,
        'imageURL': imageURL,
        "lat": lat,
        "lng": lng
    },{headers: {
            'Authorization': 'Token '+token}})
        .then(() => {
            alert("Activity Updated")
            window.location.href = "/";
        })
        .catch(err => Promise.reject('Edit Activity Failed!' + err));
}

export function deleteActivity(token, activityID){
    let url = BASE_URL + 'api/activities/'+activityID+'/'

    return axios.delete(url, {headers: {
            'Authorization': 'Token '+token}})
        .then(() => {
            alert("Activity Deleted")
        });
}

export function attendEvent(token, userID, activityID){
    let url = BASE_URL + 'api/attendevent/'
    return axios.patch(url, {
        "user_id":userID,
        "activity_id":activityID
    },{headers: {
            'Authorization': 'Token '+token}})
        .then(() => {
            window.location.reload(false);
        })
        .catch(err => Promise.reject('Something wrong'));
}

export function disAttendEvent(token, userID, activityID){
    let url = BASE_URL + 'api/disattendevent/'
    return axios.patch(url, {
        "user_id":userID,
        "activity_id":activityID
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

export function addDog(token, name, breed, height,weight, birthday, imageURL, owner){
    let url = BASE_URL + 'api/dogs/'
    return axios.post(url, {
        "name": name,
        "breed": breed,
        "height": height,
        "weight": weight,
        "owner": owner,
        "imageURL": imageURL,

        "birthday": birthday,
    },{headers: {
            'Authorization': 'Token '+token}})
        .then(response => {
            alert("Dog Added")
            window.location.href = "/dogs";
        })
        .catch(err => Promise.reject('Add Dog Failed!'));
}

export function updateDog(token, dogID, name, breed, height,weight, birthday, imageURL, owner){
    let url = BASE_URL + 'api/dogs/'+dogID+'/'
    return axios.put(url, {
        "name": name,
        // "image": image,
        "breed": breed,
        "height": height,
        "weight": weight,
        "birthday": birthday,
        "imageURL": imageURL,
        "owner": owner,
    },{headers: {
            'Authorization': 'Token '+token}})
        .then(response => {
            alert("Dog Updated")
            window.location.href = "/";
        })
        .catch(err => Promise.reject('Edit Activity Failed!'));
}

export function deleteDog(token, dogID){
    let url = BASE_URL + 'api/dogs/'+dogID+'/'

    return axios.delete(url, {headers: {
            'Authorization': 'Token '+token}})
        .then(response => {
            alert("Dog Deleted")
        });
}

