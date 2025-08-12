import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  useTheme,
  CardContent,
  Typography
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
  const theme = useTheme();

  return (
    <ListItem>
      <ListItemButton
        sx={{
          border: "3px solid",
          borderColor: theme.palette.primary.main,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: theme.palette.background.paper,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
          <IconComponent color="primary" />
        </ListItemIcon>
        <ListItemText sx={{ ml: 1, color: theme.palette.primary.main }}>{text}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

export function BasicButton({ iconName }) {
  const IconComponent = iconMap[iconName]
  const theme = useTheme();

  return (
    <Button 
      variant="outlined" 
      sx={{ 
        mr: 2,
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover': {
          borderColor: theme.palette.primary.dark,
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <IconComponent />
    </Button>
  );
}

export function CreateCard({ text, data }){
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