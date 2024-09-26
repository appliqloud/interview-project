// Resources React and Next
'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

// Services
import { getUserService, loginService } from '@/services/user.service';
import { IUser } from '../interfaces/user';

function login() {

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: null,
    password: null,
  });
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    return () => {
      setLoading(false)
    }
  }, [])


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true)
      handleLogin()
    }
  };

  const handleLogin = () => { 
    loginService(formValues.username, formValues.password).then((res) => {
      const fetchUser = async () => {
        const user: IUser = await getUserService(res.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
      };
      fetchUser();
      router.push('/')
    })
  }
  
  const validate = () => {
    let errors: { username: string | null, password: string | null } = {
      username: null,
      password: null,
    };

    if (!formValues.username) {
      errors.username = "El usuario es obligatorio";
    } else if (formValues.username.length < 3) {
      errors.username = "El usuario debe tener al menos 3 caracteres";
    }


    if (!formValues.password) {
      errors.password = "La contraseña es obligatoria";
    } else if (formValues.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setFormErrors(errors as any);

    return errors.username === null && errors.password === null;
  };


  return (
    <div className='w-full h-screen'>
      <div className='w-full h-full'>
        <div className='flex items-center justify-center pt-[10%]'>
          <div className='w-max flex items-center justify-center flex-col gap-8 bg-blue w-[350px] p-5'>
            <div className='flex items-center justify-center w-full'>
              <Image src={'/logo_aq_black.webp'} width={150} height={150} alt='logo' />
            </div>
            <form onSubmit={handleSubmit} noValidate className='w-full'>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col w-full gap-2'>
                  <label htmlFor="email">Usuario</label>
                  <TextField
                    name='username'
                    value={formValues.username}
                    onChange={handleInputChange}
                    size='small'
                    id="username"
                    helperText={formErrors.username}
                    error={Boolean(formErrors.username)}
                  />
                </div>
                <div className='flex flex-col w-full gap-2'>
                  <label htmlFor="password">Contraseña</label>
                  <TextField
                    type='password'
                    size='small'
                    id="password"
                    name='password'
                    value={formValues.password}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.password)}
                    helperText={formErrors.password}
                  />
                </div>
                <div className='flex items-center justify-center w-full'>
                  {loading ? <CircularProgress /> : (
                    <Button variant="contained" type='submit'>Iniciar Sesión</Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login