//donde ira el estado y las acciones
import {create} from 'zustand'
import {devtools , persist} from 'zustand/middleware' //middleware para ver el estado en la consola y la persistencia de datos
import { v4 as uuidv4 } from "uuid";
import { Patient , DraftPatient} from './types'
import { createJSONStorage } from 'zustand/middleware';
//2.tipamos el hook "create"
type PatientState = {
  //types de los valores de estado inicial
  patients : Patient[]
  editId:Patient["id"]
  //funcion que recibe un objeto de tipo DraftPatient y no retorna nada
  addPatient:(data:DraftPatient)=>void
  deletePatient :(id:Patient["id"])=>void
  editPatient:(id:Patient["id"])=>void
  //como con el editId rellenamos el formulario con los datos del paciente que se quiere editar , necesitamos una funcion que actualize los datos del paciente sin que se repita los que ya estan renderizados , es decir, solo cambie los datos a la seccion que le dimos ediat el id
  updatePatient:(data:DraftPatient)=>void
}
//esta funcion recibe un objeto de tipo DraftPatient y retorna un objeto de tipo Patient , es decir que le agrega un id al objeto DraftPatient
const createPatient = (patient:DraftPatient):Patient=>{
  return {
    ...patient,
    id:uuidv4()
  }
}
//1.creamos el store con el hook "create" y le pasamos un objeto con el estado inicial , usePatientStore es el custoomhook que se usara para acceder al estado y las acciones y el parametro "set" es una funcion que se encarga de actualizar el estado
export const usePatientStore = create<PatientState>()(
  devtools(persist((set)=>({
  //variable iniciales
  patients : [],
  editId:"",
  //funcion 
  addPatient:(data)=>{
    const newPatient = createPatient(data)
    //el state es el estado actual y se le pasa un objeto con el estado actualizado , en este caso es de tipo Patient(tiene id) lo que dara un error ya que la data es de tipo DraftPatient(no tiene ya que el formulario no posee un input de id) ,por lo que creamos un tipo con id 
    set((state)=>({
      patients:[...state.patients , newPatient]
    }))
  },
  deletePatient:(id)=>{
    set((state)=>({
      patients : state.patients.filter(patient=>patient.id!==id)
    }))
  },
  // 
  editPatient:(id)=>{
    set(()=>({
      editId:id
    }))
  },
  updatePatient:(data)=>{
    set((state)=>({
      patients:state.patients.map(patient=>patient.id === state.editId ? {id:state.editId , ...data}:patient),
      //para que indique que no se esta editando ningun paciente
      editId:""
    }))
  }
}),{ name :"patient-storage", storage :createJSONStorage(()=>sessionStorage)}) ))