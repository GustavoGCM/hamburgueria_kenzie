/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { iLoginData, UserContext } from '../../../providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Input';

const schema = yup
  .object({
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
  })
  .required();

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLoginData>({ resolver: yupResolver(schema) });
  const { loginSubmit, login, user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      login(user);
    }
  }, [user]);

  return (
    <StyledForm onSubmit={handleSubmit(loginSubmit)}>
      <Input
        type='email'
        register={register}
        label='Email'
        name='email'
        errors={errors.email?.message?.toString()}
      />
      <Input
        type='password'
        register={register}
        label='Senha'
        name='password'
        errors={errors.password?.message?.toString()}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
