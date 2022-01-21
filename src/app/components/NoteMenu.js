import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { isNoteOpenStatus } from "app/helpers";

const NoteMenu = (props) => {
  const {
    anchorEl,
    noteStatus,
    onChangeStatus,
    isOpen,
    onEdit,
    onDelete,
    onClose,
  } = props;
  const isOpenStatus = isNoteOpenStatus(noteStatus);

  const handleEdit = () => {
    onEdit();
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const handleToggleStatus = () => {
    onChangeStatus(!isOpenStatus);
    onClose();
  };

  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <Menu
        sx={{ width: 320 }}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
      >
        <MenuList>
          <MenuItem onClick={handleEdit}>
            <ListItemText>Edit note</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleToggleStatus}>
            {isOpenStatus ? (
              <ListItemText>Close issue</ListItemText>
            ) : (
              <ListItemText>Reopen issue</ListItemText>
            )}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDelete}>
            <ListItemText>Delete note</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Paper>
  );
};

export default NoteMenu;
