type PatientsDetailItemProps = {
  label:string
  data:string
}
export const PatientsDetailItem = ({label , data}:PatientsDetailItemProps) => {
  return(
  <p className="font-bold mb-3 text-gray-700 uppercase">{label}:{' '}
    <span className="font-normal normal-case">{data}</span>
  </p>
  )
}
