import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {Box, Toolbar, List, Avatar, CssBaseline, Typography, Divider, IconButton, ListItemIcon, ListItemText, ListItem}  from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Dashboard from '../../../pages/dashboard/Dashboard';
import DailyUpdates from '../../../pages/dailyupdates/DailyUpdates';
import UpdateIcon from '@mui/icons-material/Update';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import TLdashboard from '../../dailyupdates/dailydashboards/tldashboard';

const drawerWidth = 240; 

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('Dashboard');


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Dashboard':
        return (
          <Dashboard  click={handleTabClick} />
        );
      case 'DailyUpdate':
        return (
          <DailyUpdates/>
        );
      case 'Send email':
        return (
          <Typography paragraph>
            <TLdashboard />
          </Typography>
        );
      case 'Drafts':
        return (
          <Typography paragraph>
            Content for Drafts Tab
          </Typography>
        );
      case 'All mail':
        return (
          <Typography paragraph>
            Content for All mail Tab
          </Typography>
        );
      case 'Trash':
        return (
          <Typography paragraph>
            Content for Trash Tab
          </Typography>
        );
      case 'Spam':
        return (
          <Typography paragraph>
            Content for Spam Tab
          </Typography>
        );
      default:
        return <Dashboard/>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 4,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'space-between', width:'100%' }}>
            <Typography variant="h6" noWrap component="div">
              TaskCentral
            </Typography>
            <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem
            button
            onClick={() => handleTabClick('Dashboard')}
            selected={selectedTab === 'Dashboard'}
            // className='Mui-selected css-bshv44-MuiButtonBase-root-MuiListItem-root'
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleTabClick('DailyUpdate')}
            selected={selectedTab === 'DailyUpdate'}
          >
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="All Employees" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleTabClick('Send email')}
            selected={selectedTab === 'Send email'}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary=" TL And Manager" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleTabClick('Drafts')}
            selected={selectedTab === 'Drafts'}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => handleTabClick('All mail')}
            selected={selectedTab === 'All mail'}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="All mail" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleTabClick('Trash')}
            selected={selectedTab === 'Trash'}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleTabClick('Spam')}
            selected={selectedTab === 'Spam'}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {renderContent()}
      </Box>
    </Box>
  );
}
