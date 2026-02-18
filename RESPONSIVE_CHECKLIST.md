# Responsive QA Checklist (480 / 768 / 991)

Objective: validate visual quality and behavior of the portfolio on small and medium screens after responsive fixes.

## Pages under validation

- index.html
- sobre-detalhado.html
- servicos.html
- projects.html
- sobre.html
- galeria.html
- contactos.html

## Breakpoint 480px (mobile)

- [ ] Header: logo centered and action buttons stacked without overlap.
- [ ] Drawer menu: opens/closes correctly and fills available width.
- [ ] Hero: title and subtitle readable, CTA buttons full width.
- [ ] Projects filters: horizontal scroll works, active state visible.
- [ ] Project cards: single column, no clipped text/buttons.
- [ ] Contact: CTA buttons full width and social links aligned.
- [ ] Footer: sections stacked and social links wrapped correctly.
- [ ] Horizontal overflow: no x-scroll on page body.

## Breakpoint 768px (tablet portrait)

- [ ] Header: logo centered, buttons in wrapped row with spacing.
- [ ] Drawer menu: aligned and not clipped.
- [ ] Hero blocks: clean spacing between copy and stats.
- [ ] Projects: one-column cards and clean card spacing.
- [ ] Contact section: two blocks collapse to one column.
- [ ] Social proof and timeline blocks: readable spacing and no overlap.
- [ ] Footer: one-column layout with centered content.

## Breakpoint 991px (tablet/desktop transition)

- [ ] Header: stable row behavior, no jumping between states.
- [ ] Sections: vertical rhythm and spacing remain consistent.
- [ ] Projects and cards: transition to larger layout without broken grid.
- [ ] Contact and footer: no stretched or compressed controls.
- [ ] Services / About pages: cards and grids stay balanced.

## Functional checks

- [ ] Dark mode toggle works on all pages.
- [ ] Menu toggle works on all pages.
- [ ] Anchor/navigation links keep expected targets.
- [ ] Core CTA links (CV, Projects, Contact) work correctly.

## Notes

- Responsive implementation delivered in:
  - css/responsive.css
  - inline nav media queries in major HTML pages.
- Manual visual validation should be done in Chrome DevTools at widths 480, 768 and 991 before release tag.
