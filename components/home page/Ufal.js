import TextoColorido from 'components/TextoColorido'
import Painel from 'components/Painel'
import Image from 'next/image'

const Ufal = () => (
  <div className="grid content-center" style={{ justifyItems: 'center' }}>
    <TextoColorido texto="Studying" impacto="Computer Engineering" />

    {/* <div className="flex mb-3 w-100" style={{ justifyItems: 'center' }}>
      <h1 className="font-bold text-xl mr-2">Cursando</h1>
      <h1 className="font-bold text-xl text-indigo-500">Engenharia de Computação</h1>
    </div> */}
    <Painel>
      <Image
        src="/static/images/ufal.png"
        alt="brasão da universidade federal de alagoas"
        width={200}
        height={300}
      />
    </Painel>
  </div>
)

export default Ufal
