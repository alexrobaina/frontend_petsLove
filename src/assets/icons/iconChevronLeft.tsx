const IconChevronLeft = ({ width = 18, height = 18, color = '#2c3e50' }) => (
  <svg
    width={width}
    height={height}
    stroke={color}
    viewBox="0 0 24 24"
    strokeWidth="3"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M15 6l-6 6l6 6" />
  </svg>
)

export default IconChevronLeft
