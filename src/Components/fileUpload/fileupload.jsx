import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { UserContext } from '../../hooks/Context';
import { useContext } from 'react';
import FileUploadComponent from './fileUploadComponent';
import LoadingCom from '../Loading/LoadingCom';

export default function BasicModal() {
    const {open,setOpen}=useContext(UserContext)
  return (
   <div className={`absolute inset-0 z-10 bg-transparent backdrop-blur-sm ${open && "openfileUpload"} fileupload `}>
    <FileUploadComponent/>
   </div>
  );
}