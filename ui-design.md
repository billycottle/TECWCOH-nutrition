# UI Design Principles

This document outlines the design principles and guidelines for building user interfaces in this project.

## Core Principles

### 1. Code Structure
- Write all UI code in HTML/Tailwind in a single code block
- Any CSS styles should be inline using the `style` attribute
- Always include `html`, `head`, and `body` tags in complete implementations

### 2. Communication Style
- Start with a response explaining the approach
- Provide the code implementation
- Finish with a response summarizing what was built
- Never mention tokens, Tailwind, or HTML in explanations

### 3. Design Aesthetic
- Design in the style of modern SaaS applications (Linear, Stripe, Vercel, Tailwind UI)
- Clean, minimalist, professional appearance
- Focus on clarity and usability

### 4. Icons
- Use Lucide icons for JavaScript implementations
- Set stroke width to 1.5 for consistent line weight

### 5. Custom Components
- Checkboxes, sliders, dropdowns, and toggles should be custom-styled
- Only include these elements if they are part of the specified UI
- Avoid using default browser styles

### 6. Typography
- Be extremely accurate with fonts
- Use one level stronger font weight than specified (Bold → Semibold, Medium → Semibold)
- Titles above 20px should be bold (or semibold per weight rule)
- Maintain consistent typography hierarchy

### 7. Responsive Design
- All layouts must be responsive across device sizes
- Use Tailwind's responsive utilities (sm:, md:, lg:, xl:)
- Test layouts for mobile, tablet, and desktop

### 8. Tailwind Usage
- Avoid setting Tailwind config or separate CSS classes
- Apply Tailwind utilities directly in HTML tags
- Don't put Tailwind classes in the `html` tag - use `body` tags instead

### 9. Data Visualization
- Use Chart.js for charts and graphs
- **Important bug prevention**: Avoid placing canvas at the same level as other nodes
  - ❌ Wrong: `h2 p canvas div` (causes infinite growth)
  - ✅ Correct: `h2 p div>canvas div` (works as intended)

### 10. Visual Refinement
- Add subtle dividers and outlines where appropriate
- Create visual hierarchy through spacing and borders
- Use shadows and borders sparingly but effectively

### 11. Images
- If no images are specified, use Unsplash images
- Categories: faces, 3d renders, abstract, nature
- Ensure images fit the context and design

### 12. Creativity & Detail
- Be creative with fonts and layouts
- Pay extreme attention to detail
- Make interfaces fully functional, not just visual mockups

### 13. Respecting Existing Design
- **IMPORTANT**: When design, code, or HTML is provided, respect the original:
  - Colors and color schemes
  - Font choices and sizes
  - Layout structure and spacing
  - Overall style and aesthetic
- Make improvements while maintaining design integrity

### 14. Animations & Interactions
- Don't use JavaScript for animations
- Use Tailwind's transition and animation utilities
- Add hover states with color and outline changes
- Create smooth, subtle interactions

## Implementation Checklist

When building a new UI component or page, ensure:

- [ ] All HTML structure is complete (html, head, body tags)
- [ ] Styles are inline or using Tailwind utilities
- [ ] Typography follows weight and size rules
- [ ] Responsive breakpoints are implemented
- [ ] Hover states and interactions are added
- [ ] Custom components are styled appropriately
- [ ] Layout includes subtle dividers where needed
- [ ] Design matches modern SaaS aesthetic
- [ ] No JavaScript used for animations
- [ ] Charts (if any) are properly structured to avoid bugs

## File Location & Usage

**Location**: `/Users/billycottle/Documents/nutrition/ui-design.md`

**How to use this file**:
1. Reference these principles when designing new UI components
2. Share this file with collaborators or AI assistants working on the UI
3. When requesting UI changes or new features, mention: "Follow the design principles in ui-design.md"
4. Update this file as design standards evolve

**Example usage in prompts**:
- "Create a new dashboard following ui-design.md principles"
- "Update the calculator component according to our UI design guidelines"
- "Build a settings page respecting the design principles document"

## Notes

These principles ensure consistency across the application and maintain a high-quality, professional appearance that aligns with modern web design standards.
