import {useState, useEffect} from 'react';
import Error from './Error';

function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {
  

  const [ nombre, setNombre ] = useState('');
  const [ propietario, setPropietario ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ fecha, setFecha ] = useState('');
  const [ sintomas, setSintomas ] = useState('');

  const [error, setError] = useState(false);

  useEffect( () => {
    if( Object.keys(paciente).length > 0 ) {
        const { nombre, propietario, email, fecha, sintomas } = paciente;

        // Llenando el form con el paciente a editar
        setNombre(nombre);
        setPropietario(propietario);
        setEmail(email);
        setFecha(fecha);
        setSintomas(sintomas);
    } 
  },[paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha ;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación del formulario 
    if( [nombre, propietario, email, fecha, sintomas].includes('') ){
      setError(true);
      return;
    } 
      setError(false);

      // Objeto de Paciente que pasará al App.jsx
      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas}

      if(paciente.id) {
        // Editanto el registro
        objetoPaciente.id = paciente.id;


        // objetoPaciente es el que está actualizado
        const pacientesActualizados = pacientes.map ( pacienteState => 
                      pacienteState.id === paciente.id ? objetoPaciente : pacienteState
                       )
        setPacientes(pacientesActualizados)
        setPaciente({}) // Limpiamos el state del paciente al que le dimos actualizar|

      } else {
        // Es nun nuevo registro
        objetoPaciente.id = generarId();
        setPacientes([...pacientes, objetoPaciente]);
      }

      // Reiniciar el form
      setNombre('');
      setPropietario('');
      setEmail('');
      setFecha('');
      setSintomas('');

  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10"> 
        Añade pacientes y {''} 
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        onSubmit = { handleSubmit }
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        { error && <Error>
                        <p>Es necesario llenar todos los campos </p>
                    </Error>}

        <div className="mb-5">
          <label 
              htmlFor="mascota" 
              className="block text-gray-700 uppercase font-bold">
                Nombre Mascota
          </label>
          <input 
              id="mascota"
              type="text"
              placeholder="Nombre de la mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-40 rounded-md"
              value={nombre}
              onChange={ e => setNombre(e.target.value) } 
              />
        </div> {/* Input */ }

        <div className="mb-5">
          <label 
              htmlFor="propietario" 
              className="block text-gray-700 uppercase font-bold">
                Nombre Propietario
          </label>
          <input 
              id="propietario"
              type="text"
              placeholder="Nombre del propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-40 rounded-md"
              value={propietario}
              onChange={ e => setPropietario(e.target.value) } 
              />
         </div> {/* Input */ }

        <div className="mb-5">
          <label 
              htmlFor="email" 
              className="block text-gray-700 uppercase font-bold">
                E-mail
          </label>
          <input 
              id="email"
              type="email"
              placeholder="Email contacto"
              className="border-2 w-full p-2 mt-2 placeholder-gray-40 rounded-md"
              value={email}
              onChange={ e => setEmail(e.target.value) } 
              />
        </div> {/* Input */ }

        <div className="mb-5">
          <label 
              htmlFor="alta" 
              className="block text-gray-700 uppercase font-bold">
                Alta
          </label>
          <input 
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-40 rounded-md"
              value={fecha}
              onChange={ e => setFecha(e.target.value) } 
              />
        </div> {/* Input */ }

        <div className="mb-5">
          <label 
              htmlFor="sintomas" 
              className="block text-gray-700 uppercase font-bold">
               Sintomas
          </label>
          <textarea
              id="sintomas"
              className='border-2 w-full p-2 mt-2 placeholder-gray-400'
              placeholder="Describe los síntomas"
              value={sintomas}
              onChange={ e => setSintomas(e.target.value) } 
          ></textarea>
        </div> {/* Input */ }

        <input type="submit" 
               className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer
                          transition-colors"
               value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' } />

      </form>

    </div>
  )
}

export default Formulario;