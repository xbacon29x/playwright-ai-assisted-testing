# AI Assistance Log

## 2026-11-04: API foundation and CreateBooking tests
- **AI drafted:** Playwright config with `api` and `ui` projects, `BookingClient`, test data builders, CreateBooking tests.
- **I changed or fixed:** renamed `api/` to `clients/` so it does not clash with `tests/api/`; fixed a bracket error in `playwright.config.js`; removed a redundant assertion.
- **I verified:** ran the tests against the live API and found it returns 500 (not 400) for a missing required field, then pinned the exact status.
- **Learned:** review and run generated code before committing; confirm documented status codes against the live API.

## 2026-11-04: GetBooking tests
- **AI drafted:** `list()` client method and `tests/api/get-booking.spec.js` (REQ-GET-01 to 03).
- **I changed or fixed:** (add anything you edited)
- **I verified:** (add what you saw when you ran it, including any status codes that differed from the docs)
- **Learned:** (add one line)