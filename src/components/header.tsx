'use client'
import Image from "next/image";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { MenuItem } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';

export default function Header() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  return (
    <>
      <div className="p-4 w-full">
        <div className="flex items-center justify-between">
          <Image className="color-transparent" src="/logo_aq_black.webp" alt="logo" width={100} height={50} />
          <h1 className="text-2xl font-bold">Interview App</h1>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <div className="flex items-center gap-2">
                <LanguageIcon />
                <p>Cambiar Idioma</p>
              </div>
            </MenuItem>
            <MenuItem onClick={logOut}>
              <div className="flex items-center gap-2">
                <LogoutIcon />
                <p>Cerrar Sesión</p>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  )
}
