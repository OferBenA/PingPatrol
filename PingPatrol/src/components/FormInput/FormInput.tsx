import {memo} from 'react';
import './FormInput.css'

type formInput = {

    name:string;
    type:string;
    value:string;
    placeholder:string;
}
function FormInput({ name,type,value,placeholder}:formInput) {


  return (
    <input className='formInput' name={name} type={type} value={value} placeholder={placeholder} />
  )
}

export default memo(FormInput)
