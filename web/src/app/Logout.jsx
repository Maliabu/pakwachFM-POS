import { TOKEN } from "./api/Api";

const Logout = (props) => {
    let token = TOKEN;
    localStorage.removeItem('token', token);
    window.location.pathname = "/"
}

export default Logout;