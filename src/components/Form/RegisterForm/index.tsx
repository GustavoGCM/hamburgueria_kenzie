/* eslint-disable import/order */
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { iRegister, UserContext } from '../../../providers/UserContext';
import { useContext, useEffect } from 'react';

const schema = yup
  .object({
    name: yup.string().required('Campo obrigatório'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    password: yup
      .string()
      .matches(/\d/, 'Precisa conter ao menos 1 número')
      .matches(/[a-z]/, 'Precisa conter ao menos 1 letra minúscula')
      .matches(/[A-Z]/, 'Precisa conter ao menos 1 letra maiúscula')
      .matches(/\W|_/, 'Precisa conter ao menos 1 caractere especial')
      .matches(/.{8,}/, 'Precisa conter no mínimo 8 caracteres')
      .required('Este campo é obrigatório'),
    confirmPass: yup
      .string()
      .oneOf([yup.ref('password')], 'Senha precisa ser igual a informada acima')
      .required('Este campo é obrigatório'),
  })
  .required();

const RegisterForm = () => {
  const { registerSubmit, registerUser, newUserInfo } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iRegister>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (newUserInfo) {
      registerUser(newUserInfo);
    }
  }, [newUserInfo]);

  return (
    <StyledForm onSubmit={handleSubmit(registerSubmit)}>
      <Input
        label='Nome'
        register={register}
        name='name'
        errors={errors.name?.message?.toString()}
        type='text'
      />
      <Input
        label='Email'
        register={register}
        name='email'
        errors={errors.email?.message?.toString()}
        type='email'
      />
      <Input
        label='Senha'
        register={register}
        name='password'
        errors={errors.password?.message?.toString()}
        type='password'
      />
      <Input
        label='Confirmar Senha'
        register={register}
        name='confirmPass'
        errors={errors.confirmPass?.message?.toString()}
        type='password'
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
