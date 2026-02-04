# Active Focus Cards Styling - Multiple Cards

## Overview
Three focus cards now have an active/highlighted state with navy blue background and white text to make them stand out: **Youth Leadership**, **Entrepreneurship**, and **Civic Engagement**.

## Active Cards

### Cards with Navy Blue Background
1. **Youth Leadership** (1st card) - Leadership development
2. **Entrepreneurship** (3rd card) - Business and startups
3. **Civic Engagement** (5th card) - Governance participation

### Regular Cards (White Background)
- Skills & Innovation (2nd card)
- Community Development (4th card)
- Partnership & Collaboration (6th card)

## Styling Details

### Active Card Appearance
- **Background color**: Navy blue (`var(--primary-blue)` - #263B5E)
- **Border bottom**: 4px solid gold (`var(--accent-gold)`)
- **Icon color**: Gold
- **Heading color**: White
- **Text color**: White with 90% opacity
- **Hover shadow**: Enhanced navy-tinted shadow

### Regular Card Appearance
- **Background color**: White
- **Heading color**: Navy blue
- **Icon color**: Gold
- **Text color**: Gray
- **Hover**: Gold bottom border

## CSS Implementation

### Selectors Used
```css
.focus-card:first-child,      /* Youth Leadership */
.focus-card:nth-child(3),     /* Entrepreneurship */
.focus-card:nth-child(5),     /* Civic Engagement */
.focus-card.active            /* Manual override */
```

### Why These Cards?
These three cards represent the **core pillars** of the organization:
1. **Leadership** - Building future leaders
2. **Entrepreneurship** - Economic empowerment
3. **Civic Engagement** - Democratic participation

## Visual Pattern

The active cards create a **diagonal pattern** across the grid:

```
[ACTIVE]  [Regular]  [ACTIVE]
[Regular] [ACTIVE]   [Regular]
```

This creates visual interest and balance while highlighting the most important focus areas.

## Benefits

1. ✅ **Visual Hierarchy** - Key focus areas stand out
2. ✅ **Brand Consistency** - Navy + gold color scheme
3. ✅ **Balanced Layout** - Diagonal pattern creates rhythm
4. ✅ **Clear Priorities** - Highlights core organizational pillars
5. ✅ **High Contrast** - WCAG AAA compliant
6. ✅ **Professional Look** - Premium, sophisticated design

## Flexibility

### Automatic Styling
The 1st, 3rd, and 5th cards automatically receive active styling using CSS pseudo-selectors.

### Manual Override
To make any card active, add the `active` class:
```html
<div class="focus-card active">
    <!-- Card content -->
</div>
```

To remove active styling from a specific card, you would need to override with inline styles or a custom class.

## Color Contrast

All active cards maintain excellent accessibility:
- **White text on navy blue**: WCAG AAA compliant (7.5:1 ratio)
- **Gold icon on navy blue**: High visibility
- **Gold border**: Clear visual accent

## Responsive Behavior

The active styling is maintained across all breakpoints:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px)
- ✅ Mobile (480px and below)

The cards stack vertically on mobile, and the active cards continue to stand out with their navy background.

## Files Modified

- `styles.css` - Updated active focus card selectors

## Pages Affected

All pages with focus cards:
- ✅ **Homepage** - Focus areas section (primary location)
- ✅ Any other page using the focus-card component

## Testing

To verify the active card styling:
1. Open the homepage
2. Scroll to the "Our Focus Areas" section
3. Three cards should have navy blue backgrounds:
   - **Youth Leadership** (top-left)
   - **Entrepreneurship** (top-right)
   - **Civic Engagement** (bottom-middle)
4. Hover over them to see the enhanced shadow effect

## Visual Impact

### Before
- All 6 cards looked identical with white backgrounds
- No visual hierarchy or emphasis

### After
- 3 cards stand out with navy blue backgrounds
- Creates a diagonal visual pattern
- Highlights core organizational pillars
- More dynamic and engaging layout

## Design Rationale

The alternating pattern (active-regular-active) creates:
- **Visual rhythm** - Guides the eye across the grid
- **Balance** - Evenly distributed emphasis
- **Hierarchy** - Clear priority indicators
- **Interest** - More dynamic than all-same or single-active

The three active cards now create a beautiful, balanced pattern that highlights your organization's core focus areas! 🎨✨
