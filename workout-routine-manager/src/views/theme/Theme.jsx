import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export function CreateListItem({Icon, text}) {
  return (
    <ListItem>
      <ListItemButton
        sx={{
          border: "3px solid",
          borderColor: "#1976d2",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
          <Icon color="primary" />
        </ListItemIcon>
        <ListItemText sx={{ ml: 1, color: "#1976d2" }}>{text}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

/*export function CreateButton(){
    return (

    )
}*/
