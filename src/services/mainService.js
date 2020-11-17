import http from "./httpService";

const apiEndpoint = "https://polar-ocean-69018.herokuapp.com/api";

export function getLocations() {
    return http.get(apiEndpoint + "/location");
}

export function postLocation(data) {
    return http.post(apiEndpoint + "/location", data);
}

export function updateLocation(phoneNumber, data) {
    return http.put(apiEndpoint + "/location/" + phoneNumber, data);
}

export function getLogs(phoneNumber) {
    return http.get(apiEndpoint + `/logs/${phoneNumber}`);
}

export function getLocation(phoneNumber) {
    return http.get(apiEndpoint + '/location/' + phoneNumber);
}

export function getStatus() {
    return http.get(apiEndpoint + `/status`);
}