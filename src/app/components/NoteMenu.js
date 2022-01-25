import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { isNoteOpenStatus } from "app/helpers";
import { useTranslation } from "react-i18next";

const NoteMenu = (props) => {
  const {
    anchorEl,
    noteStatus,
    onChangeStatus,
    isOpen,
    onEdit,
    onDelete,
    onClose,
    onArchive,
  } = props;
  const { t } = useTranslation();
  const isOpenStatus = isNoteOpenStatus(noteStatus);

  const handleEdit = () => {
    onEdit();
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const handleArchive = () => {
    onArchive();
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
            <ListItemText>
              {t("NoteMenu.ListItemText.editNote.text")}
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={handleToggleStatus}>
            {isOpenStatus ? (
              <ListItemText>
                {t("NoteMenu.ListItemText.closeIssue.text")}
              </ListItemText>
            ) : (
              <ListItemText>
                {t("NoteMenu.ListItemText.reopenIssue.text")}
              </ListItemText>
            )}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleArchive}>
            <ListItemText>
              {t("NoteMenu.ListItemText.archiveNote.text")}
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemText>
              {t("NoteMenu.ListItemText.deleteNote.text")}
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Paper>
  );
};

export default NoteMenu;
