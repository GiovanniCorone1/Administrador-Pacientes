//chilren es un prop que se le pasa al componente y se renderiza donde se coloca {children}.
//en nuestro caso es el texto "El nombre del paciente es obligatorio"
//es buena practica en componentes genericos que se puedan reutilizar(error, alertas ) y cuando no solo pasamos texto sino tambien otros componentes,etiquetas ,imagenes, etc.
export const Error = ({children}:{children:React.ReactNode}) => {
  return (
    <p className="text-center text-white text-sm font-bold uppercase my-4 p-3 bg-red-600">{children}</p>
  )
}
