import axios from 'axios';

class Auth {
    async login(email, pass) {
        if (localStorage.jwt) {
            this.onChange(true)
            return true;
        }
        const response = await SignIn(email, pass);
        console.log('fetched token', response);
        if (response.data.authenticated) {
            localStorage.jwt = response.data.token
            this.onChange(true)
            return true;
        } else {
            this.onChange(false)
            return false;
        }
    }

    getToken() {
        return localStorage.jwt
    }

    logout() {
        delete localStorage.jwt
        this.onChange(false)
    }

    loggedIn() {
        return !!localStorage.token
    }

    onChange() { }
}

async function SignIn(email, pass, cb) {
    console.log('email and pass', email, pass)
    const response = await axios.post('http://localhost:8000/login', { username: email, password: pass })
    // const response = await fetch('http://localhost:8000/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, pass })
    // });
    console.log('the respnose after axios', response);
    if (response.status === 200) {
        return response.data;
    }
}
const auth = new Auth();

export default auth
// exports = { auth: new Auth() };