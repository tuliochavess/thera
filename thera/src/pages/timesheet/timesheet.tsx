import style from "./timesheet.module.scss";
import logo from "./../../assets/img/logo-blue.svg";
import TableButton from "../../components/atomic/table-button/tableButton";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { timerFromApi } from "./apiResponse/shouldReturnThis";

export default function Timesheet() {
  const navigate = useNavigate();
  const [hourNow, setHourNow] = useState(format(new Date(), "HH:mm:ss"));
  const [arrivedDisabled, setArrivedDisabled] = useState(false);
  const [startLunchDisabled, setStartLunchDisabled] = useState(true);
  const [backFromLunchDisabled, setBackFromLunchDisabled] = useState(true);
  const [exitDisabled, setExitDisabled] = useState(true);
  const [arrivedSelected, setArrivedSelected] = useState(false);
  const [startLunchSelected, setStartLunchSelected] = useState(false);
  const [backFromLunchSelected, setBackFromLunchSelected] = useState(false);
  const [exitSelected, setExitSelected] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const [startTime, setStartTime] = useState("");
  const [startLunchTime, setStartLunchTime] = useState("");
  const [backLunchTime, setBackLunchTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalToday, setTotalToday] = useState("");

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      getHourNow();
    }, 1000);

    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  function formatTime(time: number) {
    const pad = (num: number): string => String(num).padStart(2, "0");
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  function startStopwatch() {
    stopStopwatch();
    setElapsedTime(0);
    const startTime = Date.now();
    intervalRef.current = window.setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
    setRunning(true);
  }

  function stopStopwatch() {
    if (running && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setRunning(false);
    }
  }

  function handleArrived() {
    setArrivedDisabled(true);
    setArrivedSelected(true);
    setStartLunchDisabled(false);
    startStopwatch();
    setStartTime(format(new Date(), "HH:mm:ss"));
  }

  function handleStartLunch() {
    setStartLunchSelected(true);
    setArrivedSelected(false);
    setBackFromLunchDisabled(false);
    setStartLunchDisabled(true);
    startStopwatch();
    setStartLunchTime(format(new Date(), "HH:mm:ss"));
  }

  function handleBackFromLunch() {
    setExitDisabled(false);
    setBackFromLunchSelected(true);
    setStartLunchSelected(false);
    setBackFromLunchDisabled(true);
    startStopwatch();
    setBackLunchTime(format(new Date(), "HH:mm:ss"));
  }

  function handleExit() {
    setExitSelected(true);
    setExitDisabled(true);
    setBackFromLunchSelected(false);
    stopStopwatch();
    setEndTime(format(new Date(), "HH:mm:ss"));
    setTotalToday(
      totalWorked(
        `2023-06-08T${startTime}.1651196Z`,
        `2023-06-08T${startLunchTime}.1651196Z`,
        `2023-06-08T${backLunchTime}.1651196Z`,
        `2023-06-08T${endTime}.1651196Z`
      )
    );
  }

  function getHourNow() {
    setHourNow(format(new Date(), "HH:mm:ss"));
  }

  function totalWorked(
    start: string,
    startLunch: string,
    endLunch: string,
    end: string
  ) {
    const total =
      new Date(end).getTime() -
      new Date(start).getTime() +
      (new Date(endLunch).getTime() - new Date(startLunch).getTime());

    return format(new Date(total), "HH:mm:ss");
  }

  return (
    <>
      <div className={style.timesheet}>
        <div className={style.timesheetContainer}>
          <div className="row">
            <div className={"col-12 " + style.rowLogoAndName}>
              <img src={logo} alt="Logo Thera Soluções" />
              <div className={style.nameContainer}>
                Olá, <span>Túlio Chaves</span>
              </div>
              <span className={style.exit} onClick={() => navigate("/")}>
                SAIR
              </span>
            </div>
          </div>
          <div className="row">
            <div className={"col-12 " + style.hours}>
              <span className={style.todayDay}>
                {format(new Date(), "dd/MM/yyyy")}
              </span>
              <span className={style.todayHour}>{hourNow}</span>
              <span className={style.time}>
                Tempo <span>{formatTime(elapsedTime)}</span>
              </span>
            </div>
          </div>
          <div className="row">
            <div className={"col-12 " + style.tableButtonRow}>
              <TableButton
                content="CHEGUEI"
                onClick={handleArrived}
                disable={arrivedDisabled}
                selected={arrivedSelected}
              />
              <TableButton
                content="FUI ALMOÇAR"
                onClick={handleStartLunch}
                disable={startLunchDisabled}
                selected={startLunchSelected}
              />
              <TableButton
                content="VOLTEI"
                onClick={handleBackFromLunch}
                disable={backFromLunchDisabled}
                selected={backFromLunchSelected}
              />
              <TableButton
                content="FUI"
                onClick={handleExit}
                disable={exitDisabled}
                selected={exitSelected}
              />
            </div>
          </div>
          <div className="row">
            <div className={"col-12 " + style.table}>
              <table>
                <thead>
                  <tr>
                    <th>DATA</th>
                    <th>HORA INÍCIO</th>
                    <th>ALMOÇO INÍCIO</th>
                    <th>ALMOÇO FIM</th>
                    <th>HORA FIM</th>
                    <th>TEMPO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{format(new Date(), "dd/MM/yyyy")}</td>
                    <td>{startTime}</td>
                    <td>{startLunchTime}</td>
                    <td>{backLunchTime}</td>
                    <td>{endTime}</td>
                    <td>{totalToday}</td>
                  </tr>
                  {timerFromApi.map((row, i) => (
                    <tr key={i}>
                      <td>{format(new Date(row.day), "dd/MM/yyyy")}</td>
                      <td>{format(new Date(row.start), "HH:mm:ss")}</td>
                      <td>{format(new Date(row.startLunch), "HH:mm:ss")}</td>
                      <td>{format(new Date(row.endLunch), "HH:mm:ss")}</td>
                      <td>{format(new Date(row.end), "HH:mm:ss")}</td>
                      <td>
                        {totalWorked(
                          row.start,
                          row.startLunch,
                          row.endLunch,
                          row.end
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
