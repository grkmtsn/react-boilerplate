import { BehaviorSubject } from 'rxjs';

import { request, Role } from '@/helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

function login(username, password) {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password,
    },
  }).then(({ token }) => {
    const user = {
      username,
      token,
      role: Role.Admin,
      firstName: 'Eve',
      lastName: 'Holt',
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUserSubject.next(user);
    return user;
  });
}

function logout() {
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}

const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

export { authenticationService };
