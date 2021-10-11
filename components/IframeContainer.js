export default function IframeContainer({ ...rest }) {
  return (
    <span style={{ position: 'relative', display: 'block' }}>
      <iframe
        {...rest}
        style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
      />
    </span>
  )
}
