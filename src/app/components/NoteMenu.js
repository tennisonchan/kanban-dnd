import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

const NoteMenu = (props) => {
  const { anchorEl, isOpen, onEdit, onDelete, onClose } = props;

  const handleEdit = () => {
    onEdit();
    onClose();
  };

  const handleDelete = () => {
    onDelete();
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
