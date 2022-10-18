class Authentication {
    constructor({address, headers}) {
        this._address = address;
        this._headers = headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();//разбирает ответ как JSON;
        }
        return Promise.reject(`Error ${res.status}`);
    }

    addNewUser(item) {
        return fetch(`${this._address}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(item),
        }).then(this._getResponse);
    }

    loginUser(item) {
        return fetch(`${this._address}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(item),
        }).then(this._getResponse);
    }

    checkToken(token) {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(this._getResponse);
    }
}

const authentication = new Authentication({
    // for localhost workflow
    // address: 'http://localhost:3000',
    address: 'https://api.domainname.kmariasha.nomoredomains.sbs',
    headers: {
        "Content-Type":
            "application/json",
        //production
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBiMjJhM2IyYmZlODU1ODE3NjNmYTEiLCJpYXQiOjE2NjE2NzYwNTQsImV4cCI6NjY2NjY5OTk5OX0.oVM0YOHw7dTM54Mt4yPctmggonwM6jXpGRT6xfaX9Wo`,

        //dev
        // authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBiMjJhM2IyYmZlODU1ODE3NjNmYTEiLCJpYXQiOjE2NjE2NzYwNTQsImV4cCI6MTg4ODg4ODg4OH0.5GpFBZ3oTHWobBllSUXY5mhVrVevVuwSwZgUBfj1B9E`,
        // 'Access-Control-Allow-Origin': '*',

    }
});

export default authentication;
