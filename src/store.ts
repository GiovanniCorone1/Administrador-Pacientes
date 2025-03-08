//donde ira el estado y las acciones
import {create} from 'zustand'
import { v4 as uuidv4 } from "uuid";
import { Patient , DraftPatient} from './types'
//2.tipamos el hook "create"
type PatientState = {
  patients : Patient[]
  //funcion que recibe un objeto de tipo DraftPatient y no retorna nada
  addPatient:(data:DraftPatient)=>void
}
//esta funcion recibe un objeto de tipo DraftPatient y retorna un objeto de tipo Patient , es decir que le agrega un id al objeto DraftPatient
const createPatient = (patient:DraftPatient):Patient=>{
  return {
    ...patient,
    id:uuidv4()
  }
}
//1.creamos el store con el hook "create" y le pasamos un objeto con el estado inicial , usePatientStore es el custoomhook que se usara para acceder al estado y las acciones y el parametro "set" es una funcion que se encarga de actualizar el estado
export const usePatientStore = create<PatientState>((set)=>({
  //variable que almacena un array de pacientes
  patients : [],
  //funcion 
  addPatient:(data)=>{
    const newPatient = createPatient(data)
    //el state es el estado actual y se le pasa un objeto con el estado actualizado , en este caso es de tipo Patient(tiene id) lo que dara un error ya que la data es de tipo DraftPatient(no tiene ya que el formulario no posee un input de id) ,por lo que creamos un tipo con id 
    set((state)=>({
      patients:[...state.patients , newPatient]
    }))
  }
}))