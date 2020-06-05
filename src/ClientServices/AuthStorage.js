class Auth {

  check() {
    return !!this.token();
  }

  token() {
    let token = null;
    try {
      token = localStorage.getItem('auth_token')
    } catch(e) {}
    return token;
  }

  setToken(token) {
    return localStorage.setItem('auth_token', token)
  }

  logout() {
    localStorage.removeItem('auth_token')
  }
}

export default new Auth();
