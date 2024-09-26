'use client'
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginService } from '@/services/user.service';
import { useRouter } from 'next/navigation'

function login() {
  const router = useRouter()
  // Estado para los valores del formulario
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  // Estado para los errores
  const [formErrors, setFormErrors] = useState({
    username: null,
    password: null,
  });

  // Función para manejar el cambio de valores en los campos
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Validaciones básicas
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

    // Retorna `true` si no hay errores
    return errors.username === null && errors.password === null;
  };

  // Función para manejar el submit del formulario
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      console.log(formValues)
      // Aquí puedes hacer la lógica de envío de datos al servidor
      loginService(formValues.username, formValues.password).then((res) => {
        router.push('/')
      }).catch((err) => {
        console.log(err)
      })
    }
    else {
      console.log(formErrors)
    }
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
                  <Button variant="contained" type='submit'>Iniciar Sesión</Button>
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