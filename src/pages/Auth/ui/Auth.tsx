import { useSendCode } from "@/shared/api/auth/hooks/useSendCode";
import { useVerifyCode } from "@/shared/api/auth/hooks/useVerifyCode";
import { Button, Card, Grid2, Typography } from "@mui/material";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { getDefaultValues } from "../helpers/constants";
import { MaskedInput } from "@/shared/components/MaskedInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { LogoText } from "@/shared/assets/icons/LogoText";
import { authSchema } from "../helpers/validation";
import { FormFields } from "../helpers/types";
import { filterOtp, filterPhoneNumber } from "../helpers/helpers";
import Cookies from "js-cookie";
import useAuth from "@/shared/hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router";

export const Auth = () => {
  const { mutate: sendCode } = useSendCode();
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { mutate: verifyCode } = useVerifyCode({
    onSuccess: (data) => {
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);

      setAuth(jwtDecode(data.accessToken));
      navigate(from, { replace: true });
    },
  });

  const [step, setStep] = useState(1);

  const form = useForm<FormFields>();

  const onSubmit = () => {
    const { phone, otp } = form.getValues();

    if (step === 1) {
      sendCode({ phone: filterPhoneNumber(phone) });
      setStep(2);
      form.setValue("phone", phone, { shouldValidate: true });
    }

    if (step === 2) {
      verifyCode({ otp: filterOtp(otp), phone: filterPhoneNumber(phone) });
    }
  };

  return (
    <FormContainer
      defaultValues={getDefaultValues()}
      resolver={yupResolver(authSchema)}
      formContext={form}
      onSuccess={onSubmit}
    >
      <Grid2 height={"100vh"} width={"100%"} container>
        <Card sx={{ width: 500, height: 500, margin: "auto", padding: 5 }}>
          <Grid2
            container
            direction={"column"}
            gap={1}
            height={"75%"}
            justifyContent={"center"}
          >
            <Typography textAlign={"center"} color={"primary"} variant="body2">
              <LogoText />
            </Typography>
            <TextFieldElement
              name="phone"
              slotProps={{
                input: {
                  inputComponent: MaskedInput as any,
                  inputProps: { mask: "+7(000) 000-00-00" },
                },
              }}
              disabled={step !== 1}
              helperText=" "
            />
            {step === 2 && (
              <TextFieldElement
                name="otp"
                slotProps={{
                  input: {
                    inputComponent: MaskedInput as any,
                    inputProps: { mask: "00-00-00" },
                  },
                }}
                helperText=" "
              />
            )}
            <Button type="submit" variant="contained">
              {step === 1 ? "Отправить код" : "Войти"}
            </Button>
          </Grid2>
        </Card>
      </Grid2>
    </FormContainer>
  );
};
