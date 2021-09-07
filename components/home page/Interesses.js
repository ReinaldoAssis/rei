import TextoColorido from 'components/TextoColorido'
import Painel from 'components/Painel'

const pt = [
  'Filosofia',
  'Machine Learning',
  'Linguística',
  'Física quântica',
  'Literatura ciêntifica',
  'Poesia',
  'Psicologia comportamental',
  'Matemática',
  'Astronomia',
]
const en = [
  'Philosophy',
  'Machine Learning',
  'Linguistics',
  'Quantum Physics',
  'Scientific Literature',
  'Poetry',
  'Behavioral Psychology',
  'Mathematics',
  'Astronomy',
]

const Interesses = () => (
  <div className="grid" style={{ justifyItems: 'center', alignContent: 'start' }}>
    <TextoColorido
      texto="My"
      impacto="interests"
      style={{ minHeight: 'fit-content', flex: '0 1 auto' }}
    />
    <Painel
      style={{ wordWrap: 'break-word', display: 'flex', flexWrap: 'wrap', alignSelf: 'start' }}
    >
      <div className="border-indigo-600 border-2 mb-3 rounded mx-1 ml-4 p-1 border-dashed">
        {en[0]}
      </div>
      <div className="border-indigo-600 border-2 mb-3 rounded mx-1 ml-4 p-1 border-dashed">
        {en[1]}
      </div>
      <div className="border-indigo-600 border-2 mb-3 rounded mx-1 ml-4 p-1 border-dashed">
        {en[2]}
      </div>
      <div className="border-indigo-600 border-2 mb-3 rounded mx-1 ml-4 p-1 border-dashed">
        {en[3]}
      </div>
      <div className="border-indigo-600 border-2 mb-3 rounded mx-1 ml-4 p-1 border-dashed">
        {en[4]}
      </div>
      <div className="border-indigo-600 border-2 mb-3 rounded mx-1 ml-4 p-1 border-dashed">
        {en[5]}
      </div>
      <div className="border-indigo-600 border-2 mb-3 rounded mx-1 ml-4 p-1 border-dashed">
        {en[6]}
      </div>
      <div className="border-indigo-600 border-2 mb-3 rounded mx-1 ml-4 p-1 border-dashed">
        {en[7]}
      </div>
      <div className="border-indigo-600 border-2 mb-3 rounded mx-1 ml-4 p-1 border-dashed">
        {en[8]}
      </div>
    </Painel>
  </div>
)

export default Interesses
