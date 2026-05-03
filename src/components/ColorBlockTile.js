// Tiny generic surface used to wrap product images / hero illustrations on a
// consistent color-blocked background. Variants resolve to CSS classes from
// globals.css.
const VARIANT_CLASS = {
  sand:  'color-block-sand',
  sage:  'color-block-sage',
  blush: 'color-block-blush',
  slate: 'color-block-slate',
}

export default function ColorBlockTile({ variant, children, style, className }) {
  var v = VARIANT_CLASS[variant] || VARIANT_CLASS.sand
  return (
    <div className={(className ? className + ' ' : '') + v} style={Object.assign({
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    }, style || {})}>
      {children}
    </div>
  )
}
