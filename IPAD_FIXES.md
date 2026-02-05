# iPad View Fixes

## Issues Addressed
- **Navigation**: Desktop menu was breaking on tablet widths (768px - 1024px).
- **Layout**: 3-column grids were becoming too narrow.
- **Top Bar**: Crowded on smaller screens.

## Changes Made
- Added `@media (max-width: 1024px)` block in `styles.css`.
- **Navigation**: Enabled hamburger menu for resolutions up to 1024px.
- **Grids**: Switched `.focus-grid`, `.programs-grid`, `.vision-grid`, etc., to 2 columns on tablets.
- **Top Bar**: Hidden on tablets (`display: none`) for a cleaner look.
- **Cleanup**: Refactored existing mobile styles to inherit from the new tablet block.
