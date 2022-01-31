import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";

const ProjectMenu = (props) => {
  const { anchorEl, isOpen, onEdit, onDelete, onClose } = props;
  const { t } = useTranslation();

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
            <ListItemText>
              {t("ProjectMenu.ListItemText.editProject.text")}
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDelete}>
            <ListItemText>
              {t("ProjectMenu.ListItemText.deleteProject.text")}
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Paper>
  );
};

export default ProjectMenu;
