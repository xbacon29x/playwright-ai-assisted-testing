import { credentials } from '../test-data/credentials.js';

export class BookingClient {
  constructor(request) {
    this.request = request;
  }

  async getToken(username = credentials.username, password = credentials.password) {
    const response = await this.request.post('/auth', { data: { username, password } });
    const body = await response.json();
    return body.token;
  }

  create(payload) {
    return this.request.post('/booking', { data: payload });
  }

  get(id) {
    return this.request.get(`/booking/${id}`);
  }

   list(params = {}) {
    return this.request.get('/booking', { params });
  }

  remove(id, token) {
    return this.request.delete(`/booking/${id}`, {
      headers: { Cookie: `token=${token}` },
    });
  }
}