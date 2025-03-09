import {usePatientStore} from '../store'
import { PatientsDetails } from './PatientsDetails';
export const PatientsList = () => {
  //obtenemos la lista de pacientes del store
  const patients = usePatientStore(state => state.patients)
  return (
    <section className='md:w-1/2 lg:3/5 md:h-screen overflow-y-auto'>
      { patients.length ?
      (<>
        <h2 className='font-black text-3xl text-center'>Listado de Pacientes</h2>
        <p className='text-xl mt-5 mb-10 text-center'>Administra tus {" "}
          <span className='text-indigo-600 font-bold'>Pacientes y citas</span>
        </p>
        {
          patients.map(patient=>(
            <PatientsDetails key={patient.id} patient={patient}/>
          ))
        }
      </>):
      (<>
        <h2 className='font-black text-3xl text-center'>No hay Pacientes</h2>
        <p className='text-xl mt-5 mb-10 text-center'>Comienza agregando pacientes {" "}
          <span className='text-indigo-600 font-bold'>y apareceran en este lugar</span>
        </p>
      </>)}
    </section>
  )
}
