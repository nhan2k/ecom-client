import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, List, CssBaseline, Typography, Divider, IconButton, Box, Badge } from '@mui/material'
import {
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { Menu, Avatar, Tooltip, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'

import DrawerHeader from './DrawerHeader'
import SearchIconWrapper from './SearchIconWrapper'
import StyledInputBase from './StyledInputBase'
import { navMainItems, mobileMenuId, mails, notifications } from './items'
import Drawer from './Drawer'
import AppBar from './AppBar'
import Search from './Search'
import { MiniDrawerInterface } from './type'
import BasicBreadcrumbs from '@features/navigation/breadcrumbs'

const MiniDrawer: React.FunctionComponent<MiniDrawerInterface> = ({ children }) => {
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

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
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={mails} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={notifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        </DrawerHeader>
        {navMainItems.map(({ Icon, label, divider, link }, index) => (
          <React.Fragment key={index}>
            {divider && <Divider />}
            <List>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <Link to={link}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {<Icon />}
                    </ListItemIcon>
                    <ListItemText primary={label.toUpperCase()} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </React.Fragment>
        ))}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <DrawerHeader sx={{ justifyContent: 'flex-start' }}>
          <BasicBreadcrumbs />
        </DrawerHeader>
        {children}
      </Box>
    </Box>
  )
}

export default MiniDrawer
