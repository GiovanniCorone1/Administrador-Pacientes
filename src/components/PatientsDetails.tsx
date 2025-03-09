import { toast } from 'react-toastify';
import { usePatientStore } from '../store';
import { Patient } from '../types';
import { PatientsDetailItem } from './PatientsDetailItem';
type PatientDetailsProps = {
  patient:Patient
}
export const PatientsDetails = ({patient}:PatientDetailsProps) => {
  const deletePatient = usePatientStore(state=>state.deletePatient)
  const editPatient = usePatientStore(state=>state.editPatient)
  const handleClick = ()=>{
    deletePatient(patient.id)
    toast("Paciente eliminado correctamente",{type:"error"})
  }
  return (
    <div className='bg-white shadow-md p-5 rounded-md mb-3 uppercase'>
      <PatientsDetailItem label='ID' data={patient.id}/>
      <PatientsDetailItem label='Paciente' data={patient.caretaker}/>
      <PatientsDetailItem label='Propietario' data={patient.name}/>
      <PatientsDetailItem label='Email' data={patient.email}/>
      <PatientsDetailItem label='Fecha' data={patient.date.toString()}/>
      <PatientsDetailItem label='Sintoma' data={patient.symptoms}/>
      <section className='flex flex-col lg:flex-row justify-between gap-3 mt-10'>
        <button type='button' className='bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 px-10 font-bold uppercase' onClick={()=>editPatient(patient.id)}>Editar</button>
        <button type='button' className='bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 px-10 font-bold uppercase' onClick={handleClick}>Eliminar</button>
      </section>
    </div>

  )
}