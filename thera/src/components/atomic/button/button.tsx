import LoadIcon from "../load-icon/loadIcon";
import style from "./button.module.scss";

interface Props {
  class?: string;
  text: string;
  loading?: boolean;
  onClick: () => void;
}

export default function Button(props: Props) {
  return (
    <button
      className={style.buttonContainer + " " + props.class}
      onClick={props.onClick}
    >
      {props.loading ? <LoadIcon /> : props.text}
    </button>
  );
}
