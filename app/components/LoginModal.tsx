"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useAtom } from "jotai";
import { lastTimeOtpAtom, phoneLocalAtom } from "../state/utils/utilsAtom";
import { DefaultService } from "@/generated";
import BasicModal from './SendCodeModal';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  widthResponsive: {
    xs: "90%",
    sm: "70%",
    md: "60%",
    lg: 400,
  },
  maxWidth: "100%",
};
interface SendPhoneProps {
  onCodeSent?: () => void;
}
export default function SendPhoneModal({ onCodeSent }: SendPhoneProps) {
  const [phoneLocal, setPhoneLocal] = useAtom(phoneLocalAtom);
  const [lastTimeOtp, setLastTimeOtp] = useAtom(lastTimeOtpAtom);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]+$/;
    if (phoneLocal.trim().length === 0) {
      alert("Номер телефона не должен быть пустым.");
      return;
    }
    if (/[A-Za-zА-Яа-яЁё]/.test(phoneLocal)) {
      alert("Некорректный номер телефона: должны быть только цифры.");
      return;
    }
    if (phoneLocal.length !== 11) {
      alert("Некорректный номер телефона: должно быть 11 цифр.");
      return;
    }
    DefaultService.authControllerSendCode({ phone: phoneLocal })
      .then(() => {
        setPhoneLocal(phoneLocal);
        setLastTimeOtp(Date.now());
        if (typeof onCodeSent === 'function') {
          onCodeSent();
        }
        setIsCodeModalOpen(true);
      })
      .catch((error) => {
        console.error("Ошибка при отправке кода верификации:", error);
      });
      setOpen(false);
  };

  return (
    <div>
      <button
        className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
        onClick={handleOpen}
      >
        Войти
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit}>
          <Box sx={style}>
            <TextField
              name="phone"
              value={phoneLocal}
              onChange={(e) => setPhoneLocal(e.target.value)}
              margin="normal"
              type={"tel"}
              label="Телефонный номер"
              id="phone"
              placeholder="8707777777"
              helperText="Введите номер телефона"
              sx={{
                width: "100%",
                "@media (max-width: 600px)": {
                  width: "100%",
                },
              }}
            />
            <Button
              type="submit"
              // onClick={() => setIsSignUp(!isSignUp)}
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="warning"
            >
              ОТПРАВИТЬ СМС
            </Button>
          </Box>
        </form>
      </Modal>
      <BasicModal open={isCodeModalOpen} onClose={() => setIsCodeModalOpen(false)} />
    </div>
  );
}
