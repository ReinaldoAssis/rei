const baseStyle = {
  boxShadow: '0px 6px 7px rgba(0,0,0,0.3)',
}

const Painel = ({ children, style }) => (
  <div
    className="dark:bg-roxo bg-gray-30 py-10 grid place-items-center transform transition duration-300 hover:scale-105 w-4/5"
    style={{ ...style, ...baseStyle }}
  >
    {children}
  </div>
)

export default Painel
