import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Modal from "../../components/Modal";

const useTreeViewStyles = makeStyles((theme) =>
  createStyles({
    container: {
      marginTop: "96px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      padding: "0 24px",
    },
    cardBox: {
      background: "#fff",
      borderRadius: "1rem",
      padding: "1.5rem",
      minWidth: "400px",
    },
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
    },
    btnBox: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

export default function FilesPage() {
  const classes = useTreeViewStyles();
  const [curSelect, setCurSelect] = useState<any>("");
  const [dialog, setDialog] = useState(true);
  const router = useRouter();
  return (
    <div className={classes.container}>
      {dialog && <Modal />}
      <div className={classes.cardBox}>{
        123
      }</div>
    </div>
  );
}
