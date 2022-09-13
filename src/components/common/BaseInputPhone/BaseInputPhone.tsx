import { useGetVariableColor } from "hooks/useGetVariableColor";
import { FC } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import BaseErrorMessage from "../BaseErrorMessage";
import BaseLabel from "../BaseLabel";

interface Props {
  value: string;
  label: string;
  testId?: string;
  error?: boolean;
  inputName: string;
  setFieldValue: any;
  marginTop?: number;
  disabled?: boolean;
  marginBottom?: number;
  isWithBase?: boolean;
  errorMessage?: string;
  defaultCountry?: string;
  countryList: Array<string>;
}

const BaseInputPhone: FC<Props> = ({
  value,
  label,
  testId,
  inputName,
  countryList,
  setFieldValue,
  marginTop = 0,
  defaultCountry,
  marginBottom = 0,
  disabled = false,
  errorMessage = "",
}) => {
  const inputBackground = useGetVariableColor("--input-backgound");
  const inputError = useGetVariableColor("--input-error");
  const inputBorder = useGetVariableColor("--input-border");
  return (
    <div
      data-testid={`input-phone-${testId}`}
      style={{ marginTop, marginBottom }}
    >
      {label && <BaseLabel bold marginBottom={4} text={label} />}
      <PhoneInput
        inputProps={{
          name: "phone",
          required: false,
          autoFocus: true,
        }}
        value={value}
        disabled={disabled}
        country={defaultCountry}
        onlyCountries={countryList}
        onChange={(phone: any) => setFieldValue(inputName, phone)}
        buttonStyle={{ backgroundColor: inputBackground }}
        inputStyle={{
          outline: "0",
          width: "100%",
          height: "48px",
          borderRadius: "4px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: errorMessage ? inputError : inputBorder,
        }}
      />
      {errorMessage && <BaseErrorMessage text={errorMessage} />}
    </div>
  );
};

export default BaseInputPhone;
