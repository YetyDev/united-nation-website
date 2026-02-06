# Mobile View Fixes

## Updates Header
- **Issue**: The "Latest Updates" header with the search bar was cramped on mobile screens.
- **Fix**: Updated `.updates-header` at `@media (max-width: 768px)` to use `flex-direction: column` and `align-items: stretch`.
- **Search Bar**: Set width to `100%` and centered it.

## Verification
- **Forms**: Verified that `.form-row` and `.form-grid` switch to single column on smaller screens (`max-width: 600px` and `768px`).
- **Hero**: Confirmed adjusted font sizes for `hero-title` on mobile.
- **Grids**: All major grids (`.focus-grid`, `.programs-grid`, etc.) are set to single column at `max-width: 768px`.

## Next Steps
- User to review the mobile view on their device or simulator.
