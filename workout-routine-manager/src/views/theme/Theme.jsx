import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardContent,
  Typography,
  useTheme,
  CardContent,
  Typography
} from "@mui/material";

import { BarChart } from "@mui/x-charts";

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
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            transform: 'translateY(-2px)',
            boxShadow: 6,
          },
          transition: 'all 0.2s ease-in-out',
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
          transform: 'translateY(-1px)',
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <IconComponent />
    </Button>
  );
}

<<<<<<< Updated upstream
export function CreateCard({ text, data, subText="", width = "100%" }) {
  return (
    <Card sx={{ height: "95%" }}>
      <CardContent>
        <Typography variant="h6">{text}</Typography>
        <Typography variant="h4">{data}</Typography>
        <Typography variant="body2">{subText}</Typography>
=======
export function CreateCard({ text, data }){
  const theme = useTheme();
  
  return (
    <Card sx={{ 
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: 2,
      '&:hover': {
        boxShadow: 4,
        transform: 'translateY(-2px)',
      },
      transition: 'all 0.2s ease-in-out',
    }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
          {text}
        </Typography>
        <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          {data}
        </Typography>
>>>>>>> Stashed changes
      </CardContent>
    </Card>
  );
}

export function BarsDataset({ data, toShow, keyProp, name = 'This is Chart' }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">
          {name}
        </Typography>
        <BarChart
          dataset={data}
          xAxis={[{ dataKey: keyProp }]}
          height="250"
          series={toShow}
        />
      </CardContent>
    </Card>
  );
}
