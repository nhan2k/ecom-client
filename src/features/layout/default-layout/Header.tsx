import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { Mail as MailIcon, Notifications as NotificationsIcon, Menu as MenuIcon, PersonAdd, Settings, Logout } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks'
import { getAuthState, resetAuthState, signoutAsyncThunk } from '@/features/redux/slices/auth'
import { removeItem } from '@/features/utils/local.storage'
import { CircularProgress, Divider, ListItemIcon } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import { countCartAsyncThunk, getCartState } from '@/features/redux/slices/cart'
import { getUserState, getOneUserAsyncThunk } from '@/features/redux/slices/user'
import NoAvatar from '@assets/images/no-avatar.jpg'

const pages = ['Products', 'Pricing', 'Blog']

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const dispatch = useAppDispatch()
  const { dataGetOne, getOneLoading } = useAppSelector(getUserState)
  const { count, countLoading } = useAppSelector(getCartState)
  const { auth } = useAppSelector(getAuthState)

  React.useMemo(async () => {
    if (getOneLoading === 'idle') {
      await dispatch(getOneUserAsyncThunk())
    }
    if (auth) {
      dispatch(countCartAsyncThunk())
    }
  }, [])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const [open, setOpen] = React.useState(true)
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSingout = (event: React.SyntheticEvent) => {
    event.preventDefault()
    dispatch(signoutAsyncThunk())
    dispatch(resetAuthState())
    removeItem('client')

    navigate('/')
  }

  return (
    <AppBar position="static" style={{ backgroundColor: '#F8492F' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link to={'/'}>
            <Typography
              variant="h6"
              noWrap
              component="p"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button key={index} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          {auth ? (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Typography sx={{ minWidth: 50 }}>
                    <MailIcon fontSize={'large'} />
                  </Typography>
                  <Typography sx={{ minWidth: 50 }}>
                    <NotificationsIcon fontSize={'large'} />
                  </Typography>

                  {countLoading === 'pending' ? <CircularProgress /> : <></>}
                  {countLoading === 'succeeded' ? (
                    <Link to="/cart">
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={count} color="secondary">
                          <ShoppingCartIcon fontSize={'large'} style={{ color: 'white' }} />
                        </StyledBadge>
                      </IconButton>
                    </Link>
                  ) : (
                    <Link to="/cart">
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={0} color="secondary">
                          <ShoppingCartIcon fontSize={'large'} style={{ color: 'white' }} />
                        </StyledBadge>
                      </IconButton>
                    </Link>
                  )}
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      {dataGetOne.content ? (
                        <Avatar sx={{ width: 32, height: 32 }} src={`${process.env.REACT_APP_API_PUBLIC_IMAGE}/${dataGetOne.content.img}`} />
                      ) : (
                        <Avatar sx={{ width: 32, height: 32 }} src={NoAvatar} />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMenu}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Link to={'/profile'}>
                    <MenuItem>
                      <Avatar /> Profile
                    </MenuItem>
                  </Link>

                  <Divider />

                  <MenuItem onClick={handleSingout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>
            </Box>
          ) : (
            <Button variant="contained" color="secondary" startIcon={<LoginIcon />}>
              <Link to="/signin">Login</Link>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
