import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import { useAppSelector } from '@/features/hooks/reduxHooks'
import { getCategoryState } from '@/features/redux/slices/category'
import { Box, CircularProgress, Typography } from '@mui/material'

export default function ListCategory() {
  const [checked, setChecked] = React.useState([0])
  const { getAllLoading, dataGetAll, getAllError } = useAppSelector(getCategoryState)

  //   const handleToggle = (value: number) => () => {
  //     const currentIndex = checked.indexOf(value)
  //     const newChecked = [...checked]

  //     if (currentIndex === -1) {
  //       newChecked.push(value)
  //     } else {
  //       newChecked.splice(currentIndex, 1)
  //     }

  //     setChecked(newChecked)
  //   }

  return (
    <React.Fragment>
      {getAllLoading === 'pending' ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <React.Fragment />
      )}
      {getAllLoading === 'failed' ? (
        <Typography gutterBottom variant="h5" component="div">
          {getAllError}
        </Typography>
      ) : (
        <React.Fragment />
      )}
      {getAllLoading === 'succeeded' ? (
        dataGetAll.map((element: any, index: number) => {
          return (
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} key={index}>
              <ListItem disablePadding>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox edge="start" tabIndex={-1} disableRipple />
                  </ListItemIcon>
                  <ListItemText primary={element.title} />
                </ListItemButton>
              </ListItem>
            </List>
          )
        })
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  )
}
