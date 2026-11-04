import { test, expect } from '@playwright/test';
import { BookingClient } from '../../clients/bookingClient.js';
import { buildBooking } from '../../test-data/booking.js';

test.describe('CreateBooking', () => {
  const createdIds = [];

  // Clean up every booking the tests created
  test.afterEach(async ({ request }) => {
    const client = new BookingClient(request);
    const token = await client.getToken();
    for (const id of createdIds.splice(0)) {
      await client.remove(id, token);
    }
  });

  test('REQ-CREATE-01: creates a booking and returns matching fields', async ({ request }) => {
    const client = new BookingClient(request);
    const payload = buildBooking();

    const response = await client.create(payload);
    expect(response.status()).toBe(200);

    const body = await response.json();
    createdIds.push(body.bookingid);

    expect(body.bookingid).toEqual(expect.any(Number));
    expect(body.booking).toEqual(payload);
  });

  test('REQ-CREATE-02: rejects a payload with a missing required field', async ({ request }) => {
    const client = new BookingClient(request);
    const incomplete = buildBooking();
    delete incomplete.firstname;

    const response = await client.create(incomplete);
    expect(response.status()).toBe(500);
  });
});