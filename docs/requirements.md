# Requirements: Playwright AI-Assisted Testing Practice

## 1. Project goal

Build a Playwright (JavaScript) test suite that covers the core shopping flow of SauceDemo (UI) and the booking endpoints of Restful-Booker (API), and document how AI assisted each stage of the work.

## 2. Systems under test

| System | URL | Purpose |
|---|---|---|
| SauceDemo | https://www.saucedemo.com | UI: login, inventory, cart, checkout |
| Restful-Booker | https://restful-booker.herokuapp.com | API: booking CRUD and auth |

Restful-Booker API docs: https://restful-booker.herokuapp.com/apidoc/index.html

## 3. Scope

**In scope:** functional UI and API tests, positive and negative cases, response field assertions, element visibility and position assertions.

**Out of scope:** performance, load, visual regression, mobile, accessibility audits, and any real commercial site.

## 4. Functional requirements: UI (SauceDemo)

| ID | Requirement | Type |
|---|---|---|
| REQ-LOGIN-01 | A standard user can log in with valid credentials and lands on the products page. | Positive |
| REQ-LOGIN-02 | Login is rejected with an error message for a wrong password, an empty username, or an empty password. | Negative |
| REQ-LOGIN-03 | A locked-out user cannot log in and sees a specific error message. | Negative |
| REQ-LOGIN-04 | The login page shows the logo, username field, password field, and login button, in the expected positions. | Positive |
| REQ-INV-01 | Products can be sorted by name (A-Z, Z-A) and by price (low-high, high-low). | Positive |
| REQ-INV-02 | Each product shows a name, description, price, image, and an add-to-cart button. | Positive |
| REQ-CART-01 | A user can add and remove items, and the cart badge count updates correctly. | Positive |
| REQ-CART-02 | The cart page lists exactly the items that were added, with correct names and prices. | Positive |
| REQ-CHK-01 | Checkout requires first name, last name, and postal code, with an error shown for each missing field. | Negative |
| REQ-CHK-02 | A completed order shows a confirmation message and the cart is emptied. | Positive |

## 5. Functional requirements: API (Restful-Booker)

Booking fields: `firstname`, `lastname`, `totalprice`, `depositpaid`, `bookingdates.checkin`, `bookingdates.checkout`, `additionalneeds`.

Expected status codes below are from the API docs and must be confirmed against the live API when the tests are written. Where the live behavior differs from the docs, record it in the test and in the defect log.

| ID | Requirement | Type |
|---|---|---|
| REQ-AUTH-01 | `POST /auth` with valid credentials returns a token. | Positive |
| REQ-AUTH-02 | `POST /auth` with invalid credentials does not return a token. | Negative |
| REQ-CREATE-01 | `POST /booking` with a valid payload returns 200, a `bookingid`, and a `booking` object whose fields match the request. | Positive |
| REQ-CREATE-02 | `POST /booking` with a missing or malformed payload is rejected (no booking is created). **Observed: the live API returns 500; a 400 would be the standard status for invalid input.** | Negative |
| REQ-GET-01 | `GET /booking/{id}` for an existing booking returns 200 and all fields with correct types and values. | Positive |
| REQ-GET-02 | `GET /booking/{id}` for a non-existent id returns 404. | Negative |
| REQ-GET-03 | `GET /booking` returns a list of booking ids, and can be filtered by name or dates. | Positive |
| REQ-UPDATE-01 | `PUT /booking/{id}` with a valid token and full payload returns 200 and the updated fields. | Positive |
| REQ-UPDATE-02 | `PUT /booking/{id}` without a token, or with an invalid one, returns 403. | Negative |
| REQ-UPDATE-03 | `PATCH /booking/{id}` with a valid token updates only the fields sent. | Positive |
| REQ-DELETE-01 | `DELETE /booking/{id}` with a valid token removes the booking, and a following `GET` returns 404. | Positive |
| REQ-DELETE-02 | `DELETE /booking/{id}` without a valid token returns 403, and the booking still exists. | Negative |

## 6. Test project requirements

- Both positive and negative coverage for every functional requirement.
- Page objects in `pages/`, an API client layer in `api/` (or `utils/`), and test data in `test-data/`, kept out of the specs.
- UI tests in `tests/ui/`, API tests in `tests/api/`.
- API tests assert status code, response headers where relevant, every response field, and field types.
- UI tests assert element visibility, text, and position where specified.
- Tests create their own data and clean it up afterwards (for example, delete created bookings).
- No hardcoded credentials in specs. Secrets and base URLs come from config or `.env`.
- Run with `npm run test`, `npm run test:ui`, and `npm run test:api`.
- HTML report generated after each run.
- README covers setup, how to run, folder layout, and results.

## 7. AI-assisted workflow requirements

- AI may be used for scenario design, drafting specs and page objects, locator refactoring, and explaining failures.
- Every AI-drafted file is read, run, and edited by me before it is committed.
- Keep a short log in `docs/ai-log.md`: what AI drafted, what I changed, and why.
- The README states clearly which parts were AI-assisted.

## 8. Success criteria

- Every REQ-ID has at least one passing automated test.
- A traceability table maps each REQ-ID to its test file(s).
- The full suite passes three consecutive runs without flaky failures.
- Repo history is clean and attributed to my own account.

## 9. Traceability (to fill in as tests are written)

| REQ-ID | Test file | Test name | Status |
|---|---|---|---|
| REQ-CREATE-01 | tests/api/create-booking.spec.js | creates a booking and returns matching fields | Pass |
| REQ-CREATE-02 | tests/api/create-booking.spec.js | rejects a payload with a missing required field | Pass |
| REQ-GET-01 | tests/api/get-booking.spec.js | returns all fields of an existing booking | Written, confirm after merge run |
| REQ-GET-02 | tests/api/get-booking.spec.js | returns 404 for a booking id that does not exist | Written, confirm after merge run |
| REQ-GET-03 | tests/api/get-booking.spec.js | lists booking ids and filters by name; empty list for no match | Written, confirm after merge run |
| REQ-AUTH-01, REQ-AUTH-02 | | | Not started |
| REQ-UPDATE-01 to 03 | | | Not started |
| REQ-DELETE-01, REQ-DELETE-02 | | | Not started |
| REQ-LOGIN, REQ-INV, REQ-CART, REQ-CHK (UI) | | | Not started |

## 9a. Known deviations (live behavior vs. expected)

| REQ-ID | Expected | Observed |
|---|---|---|
| REQ-CREATE-02 | 400 for invalid input | 500 for a missing `firstname` |

## 10. Assumptions and risks

- Both sites are public demo systems and may be slow, reset data, or change without notice.
- Restful-Booker is shared by many users, so tests must not depend on existing data.
- Some documented behaviors may differ from live behavior and need to be verified.