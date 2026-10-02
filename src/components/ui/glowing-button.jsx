import './glowing-button.css';

export function GlowingButton({
  children,
  href,
  glowColor = '#9b5360',
  variant = 'soft',
  className = '',
  style,
  type = 'button',
  onPointerMove,
  onPointerLeave,
  ...props
}) {
  const Element = href ? 'a' : 'button';

  function moveGlow(event) {
    if (event.pointerType === 'mouse') {
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
      event.currentTarget.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
    }
    onPointerMove?.(event);
  }

  function resetGlow(event) {
    event.currentTarget.style.removeProperty('--glow-x');
    event.currentTarget.style.removeProperty('--glow-y');
    onPointerLeave?.(event);
  }

  return (
    <Element
      {...props}
      href={href}
      type={href ? undefined : type}
      className={`glowing-button glowing-button--${variant} ${className}`.trim()}
      style={{ '--glow-color': glowColor, ...style }}
      onPointerMove={moveGlow}
      onPointerLeave={resetGlow}
    >
      {children}
    </Element>
  );
}
