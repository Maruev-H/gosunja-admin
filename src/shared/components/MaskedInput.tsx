import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

export const MaskedInput = forwardRef<HTMLInputElement, any>(
  function MaskedInput(props, ref) {
    return <IMaskInput {...props} inputRef={ref} />;
  }
);
