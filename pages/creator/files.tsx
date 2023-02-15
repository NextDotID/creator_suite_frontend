import React, { useState } from "react";
import { folders } from "../../constants/defaultData";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import ForumIcon from "@material-ui/icons/Forum";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";

declare module "csstype" {
  interface Properties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      "&:hover > $content": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:focus > $content, &$selected > $content": {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: "var(--tree-view-color)",
      },
      "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
        {
          backgroundColor: "transparent",
        },
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium as any,
      "$expanded > &": {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      "& $content": {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: "inherit",
      color: "inherit",
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1,
    },
  })
);

function StyledTreeItem(props: StyledTreeItemProps) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

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
  return (
    <div className={classes.container}>
      <div className={classes.cardBox}>
        <TreeView
          className={classes.root}
          defaultExpanded={["0"]}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<div style={{ width: 24 }} />}
        >
          {folders.map((x) => {
            return (
              <StyledTreeItem
                key={x.id}
                nodeId={x.id.toString()}
                labelText={x.name}
                labelIcon={FileCopyIcon}
              >
                {x.children.map((y) => {
                  return (
                    <StyledTreeItem
                      key={y.id}
                      onClick={() => {
                        console.log(y);
                        setCurSelect(y);
                      }}
                      nodeId={y.id.toString()}
                      labelText={y.name}
                      labelIcon={ForumIcon}
                      labelInfo={y.extension + "/" + y.size}
                    />
                  );
                })}
              </StyledTreeItem>
            );
          })}
        </TreeView>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4>Current select file</h4>
          <div>{curSelect.name || "null"}</div>
        </div>

        <div className={classes.btnBox}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<SaveIcon />}
          >
            AES
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            endIcon={<CloudUploadIcon />}
          >
            ECC
          </Button>
          <Button
            variant="contained"
            color="default"
            size="small"
            startIcon={<DeleteIcon />}
          >
            DELETE
          </Button>
        </div>
      </div>
    </div>
  );
}
