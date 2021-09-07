const TextoColorido = ({ texto, impacto, style }) => (
  <div className="flex mb-3 w-100" style={style}>
    <h1 className="font-bold text-xl mr-2">{texto}</h1>
    <h1 className="font-bold text-xl text-indigo-500">{impacto}</h1>
  </div>
)

export default TextoColorido
