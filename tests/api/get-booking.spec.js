import { test, expect } from '@playwright/test';
import { BookingClient } from '../../clients/bookingClient.js';
import { buildBooking } from '../../test-data/booking.js';

test.describe('GetBooking', () => {
  let client;
  let token;
  let bookingId;
  let payload;

  // Each test gets its own booking, with a unique lastname so filters are reliable
  test.beforeEach(async ({ request }) => {
    client = new BookingClient(request);
    token = await client.getToken();
    payload = buildBooking({ lastname: `Doe${Date.now()}` });

    const response = await client.create(payload);
    bookingId = (await response.json()).bookingid;
  });

  test.afterEach(async () => {
    await client.remove(bookingId, token);
  });

  test('REQ-GET-01: returns all fields of an existing booking', async () => {
    const response = await client.get(bookingId);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body).toEqual(payload);
    expect(typeof body.totalprice).toBe('number');
    expect(typeof body.depositpaid).toBe('boolean');
  });

  test('REQ-GET-02: returns 404 for a booking id that does not exist', async () => {
    const response = await client.get(999999999);
    expect(response.status()).toBe(404);
  });

  test('REQ-GET-03: lists booking ids and filters by name', async () => {
    const response = await client.list({
      firstname: payload.firstname,
      lastname: payload.lastname,
    });
    expect(response.status()).toBe(200);

    const ids = await response.json();
    expect(Array.isArray(ids)).toBe(true);
    expect(ids).toContainEqual({ bookingid: bookingId });
  });

  test('REQ-GET-03: a filter with no match returns an empty list', async () => {
    const response = await client.list({ lastname: `NoSuchPerson${Date.now()}` });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual([]);
  });
});