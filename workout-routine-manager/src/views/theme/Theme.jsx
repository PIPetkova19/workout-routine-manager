import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  SpaceDashboardTwoTone,
  FitnessCenterTwoTone,
  CalendarMonthTwoTone,
  SmartToyTwoTone,
  SettingsTwoTone,
  AccountCircleTwoTone,
  FitbitTwoTone,
  MenuTwoTone,
} from "@mui/icons-material";

export const iconMap = {
  Dashboard: SpaceDashboardTwoTone,
  Routines: FitnessCenterTwoTone,
  Calendar: CalendarMonthTwoTone,
  Assistant: SmartToyTwoTone,
  Settings: SettingsTwoTone,
  Account: AccountCircleTwoTone,
  FitBit: FitbitTwoTone,
  Menu: MenuTwoTone,
};

export function CreateListItem({ iconName, text }) {
  const IconComponent = iconMap[iconName]

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
          <IconComponent color="primary" />
        </ListItemIcon>
        <ListItemText sx={{ ml: 1, color: "#1976d2" }}>{text}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

export function BasicButton({ iconName }) {
  const IconComponent = iconMap[iconName]

  return (
    <Button variant="outlined" sx={{ mr: 2 }}>
      <IconComponent />
    </Button>
  );
}

export function CreateCard({ text, data, width = "100%" }){
  return (
    <Card >
      <CardContent >
        <Typography variant="h6">
          {text}
        </Typography>
        <Typography variant="h4">
          {data}
        </Typography>
      </CardContent>
    </Card>
  );
}