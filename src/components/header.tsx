'use client'
import Image from "next/image";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { MenuItem } from "@mui/material";

export default function header() {

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClick = () => {
    setIsOpenMenu(!isOpenMenu);
  }

  const handleClose = () => {
    setIsOpenMenu(false);
  }

  return (
    <>
      <div className="p-4 w-full">
        <div className="flex items-center justify-between">
          <Image className="color-transparent" src="/logo_aq_black.webp" alt="logo" width={100} height={50} />
          <h1 className="text-2xl font-bold">Interview App</h1>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={isOpenMenu ? 'long-menu' : undefined}
            aria-expanded={isOpenMenu ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            open={isOpenMenu}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
               Profile
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  )
}
