import style from "./tableButton.module.scss";

interface Props {
  content: string;
  onClick?: () => void;
  selected?: boolean;
  disable?: boolean;
}

export default function TableButton(props: Props) {
  return (
    <button
      className={props.selected ? style.selected : style.button}
      disabled={props.disable}
      onClick={props.onClick}
    >
      {props.content}
    </button>
  );
}
