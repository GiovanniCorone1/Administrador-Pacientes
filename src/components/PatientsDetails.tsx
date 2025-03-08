import { Patient } from '../types';
import { PatientsDetailItem } from './PatientsDetailItem';
type PatientDetailsProps = {
  patient:Patient
}
export const PatientsDetails = ({patient}:PatientDetailsProps) => {
  return (
    <div className='bg-white shadow-md p-5 rounded-md mb-3 uppercase'>
      <PatientsDetailItem label='ID' data={patient.id}/>
      <PatientsDetailItem label='Paciente' data={patient.caretaker}/>
      <PatientsDetailItem label='Propietario' data={patient.name}/>
      <PatientsDetailItem label='Email' data={patient.email}/>
      <PatientsDetailItem label='Fecha' data={patient.date.toString()}/>
      <PatientsDetailItem label='Sintoma' data={patient.symptoms}/>
    </div>
  )
}
