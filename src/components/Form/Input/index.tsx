/* eslint-disable import/no-unresolved */
import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { iRegister } from '../../../providers/UserContext';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface iInput extends InputHTMLAttributes<HTMLInputElement> {
  name: 'password' | 'email' | 'name' | 'confirmPass';
  label: string;
  type: string;
  errors?: string | undefined;
  register: UseFormRegister<iRegister>;
}

const Input = ({ name, errors, label, register, type }: iInput) => (
  <fieldset>
    <StyledTextField label={label} type={type} id={name} {...register(name)} />
    <StyledParagraph fontColor='red'>{errors}</StyledParagraph>
  </fieldset>
);

export default Input;
