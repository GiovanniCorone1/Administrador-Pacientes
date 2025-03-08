import {useForm} from "react-hook-form"
import { Error } from "./Error"
import { DraftPatient } from '../types/index';
import { usePatientStore } from '../store';
export const PatientsForm=()=> {
  //register , handleSubmit y formState son funciones que se obtienen de useForm
  /*
  register: Se encarga de registrar los campos del formulario y de validarlos.
  handleSubmit:Se encarga de manejar el evento onSubmit del formulario asegurando que los datos sean validados antes de ejecutar la función de envío.
  formState: Objeto que contiene el estado actual del formulario, como errores, si está enviando, si se modificó, etc.
  */
 //realiza la desestructuracion anidada de los metodos que se obtienen de useForm
 //const errors = form.formState.errors; ====> const {formState :{errors}}=useForm()
 //errors tiene la estructura de un objeto que contiene los errores de los campos del formulario
 //cuando se genera y se registra un formulario es de tipo DraftPatient
  const {register,handleSubmit , formState:{errors}}=useForm<DraftPatient>()
  //obtenemos la funcion addPatient del store , unimos el store con el componente , lo que renderiza (lista de pacientes) lo ponemos en otro componente y tambien lo tenemos con reestructuracion
  // const {addPatient} =usePatientStore()
  //otra forma de obtener la funcion addPatient del store , donde "state" puedo cambiarlo por cualquier nombre
  const addPatient=usePatientStore(state=>state.addPatient)
  //funcion que se le pasa al handleSubmit como parametro ,siempre se usa como parametro en react-hook-form , funciona luego que todas las validaciones pasen
  const registerPatient=(data:DraftPatient)=>{
    addPatient(data)
  }
  return (   
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        // cuando damos al btn guardar paciente se ejecuta la funcion handleSubmit que recibe como parametro la funcion registerPatient que se encarga de guardar los datos del formulario
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            //el name identifica el campo en los datos del formulario y no es necesario que sea igual al id
            {...register("name",{
              required:"El nombre del paciente es obligatorio",
              minLength:{
                value:2,
                message:"Debe tener al menos 2 caracteres"
              }
            })}
          />
          {errors.name && (<Error>{errors.name?.message}</Error>)}
        </div>
        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker",{
              required:"El nombre del paciente es obligatorio",
              minLength:{
                value:3,
                message:"Debe tener al menos 3 caracteres"
              }
            })}
          />
          {errors.caretaker && (<Error>{errors.caretaker?.message}</Error>)}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                // expr.regular que valida que el email tenga un formato valido
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email No Válido'
              }
            })} 
          />
          {errors.email && (<Error>{errors.email?.message?.toString()}</Error>)}
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register("date",{
              required:"La fecha de alta es obligatoia"
            })}
          />
          {errors.date && (<Error>{errors.date?.message?.toString()}</Error>)}
        </div>
        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register("symptoms",{
              required:"Los síntomas son obligatorios",
            })}
          />
          {errors.symptoms && (<Error>{errors.symptoms?.message?.toString()}</Error>)}
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Guardar Paciente"
        />
      </form>
    </div>
  );
}