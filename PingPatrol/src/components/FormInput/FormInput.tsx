import {memo} from 'react';
import './FormInput.css'
import { formInput } from '../../types/MainTypes';


function FormInput({ name,type,value,placeholder}:formInput) {


  return (
    <input className='formInput' name={name} type={type} value={value} placeholder={placeholder} />
  )
}

export default memo(FormInput)
