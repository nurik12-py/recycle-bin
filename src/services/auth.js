export function getUser() {
    if (localStorage.getItem("loginData") !== null) {
        const isValid = localStorage.getItem("loginData") === "sclabs.12@gmail.comtrashbin123";
        return isValid;
    } else {
        return false;
    }
}