import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { useAtom } from "jotai";
import {
  isSignInAtom,
  isSignUpAtom,
  lastTimeOtpAtom,
  phoneLocalAtom,
} from "../state/utils/utilsAtom";
import { DefaultService, SignInUserDto } from "@/generated";

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
};

export default function BasicModal({
  open,
  onClose,
  onLoginSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}) {
  const [phone, setPhone] = useAtom(phoneLocalAtom);
  const [lastTimeOtp, setLastTimeOtp] = useAtom(lastTimeOtpAtom);
  const [code, setCode] = useState("");
  const [isSignIn, setIsSignIn] = useAtom(isSignInAtom);
  const [isSignUp, setIsSignUp] = useAtom(isSignUpAtom);
  const [openOn, setOpenOn] = useState(false);
  //   const [isModalOpen, setIsModalOpen] = React.useState(false);
  //   const handleOpen = () => setIsModalOpen(true);
  //   const handleClose = () => setIsModalOpen(false);

  const [seconds, setSeconds] = useState(getDiffTimeLocalStorage());

  function getDiffTimeLocalStorage() {
    const now = Date.now();
    const diff = now - (lastTimeOtp || 0);
    const diffSeconds = Math.floor(diff / 1000);
    return diffSeconds < 60 ? 60 - diffSeconds : 0;
  }

  React.useEffect(() => {
    setSeconds(getDiffTimeLocalStorage());
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastTimeOtp]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone) {
      console.error("Phone number is not defined!");
      return;
    }
  
    const signInUser: SignInUserDto = {
      phone,
      code: parseInt(code),
    };
  
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signInUser)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Login successful");
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      setOpenOn(false); // закрываем модальное окно после успешного входа
      setCode(""); // очищаем поле ввода кода
      onClose(); // закрываем модальное окно после успешного входа
    })
    .catch((error) => {
      console.error("Ошибка при входе в систему:", error);
    });
  };
  

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit}>
          <Box sx={style}>
            <Typography>Введите полученный код</Typography>
            {seconds > 0 ? (
              <Typography>{seconds}</Typography>
            ) : (
              <Button type="submit" 
            //   
            >
                Повторить
              </Button>
            )}
            <MuiOtpInput
              value={code}
              onChange={(value) => {
                if (/^\d*$/.test(value)) {
                  setCode(value);
                } else {
                  alert("Вводите только цифры");
                }
              }}
              sx={{
                input: {
                  width: "2.5rem",
                  height: "3rem",
                  fontSize: "1.5rem",
                  "@media (max-width: 600px)": {
                    width: "2rem",
                    height: "2.5rem",
                    fontSize: "1.2rem",
                  },
                },
                inputContainer: {
                  justifyContent: "space-around",
                  width: "100%",
                  "@media (max-width: 600px)": {
                    justifyContent: "space-between",
                  },
                },
              }}
            />
            <Button
              type="submit"
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="warning"
            >
              Войти
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
