import http from 'superagent';

export default function(username, password) {
  return http.post('/api/login').send({ username, password });
}
