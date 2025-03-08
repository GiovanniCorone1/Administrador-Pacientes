//cuando registremos en el formulario
export type Patient = {
  id:string
  name:string
  caretaker:string
  date:Date
  email:string
  symptoms:string
}
//usamos un utility type para omitir el id
export type DraftPatient =Omit<Patient,"id">