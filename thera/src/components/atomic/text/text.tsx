import { useState } from "react";
import style from "./text.module.scss";

interface Props {
  label?: string;
  error?: string;
  class?: string;
  onChange?: (value: string) => void;
  password?: boolean;
}

export default function Text(props: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <div className={style.TextContainer + " " + props.class}>
      {props.label ? (
        <label className={style.label}>{props.label}</label>
      ) : null}
      <input
        type={props.password ? "password" : "text"}
        className={style.input}
        value={inputValue}
        onChange={handleInputChange}
      />
      {props.error ? <span className={style.error}>{props.error}</span> : null}
    </div>
  );
}
