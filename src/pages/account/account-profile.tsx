import { useAppSelector } from '@/features/hooks/reduxHooks'
import { getUserState } from '@/features/redux/slices/user'
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import * as React from 'react'
import NoAvatar from '@assets/images/no-avatar.jpg'

interface IAccountProfile {}
const AccountProfile: React.FC<IAccountProfile> = () => {
  const { dataGetOne, getOneLoading } = useAppSelector(getUserState)

  return (
    <Card style={{ flexGrow: '3' }}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {getOneLoading === 'succeeded' ? (
            <>
              {dataGetOne.content ? (
                <Avatar sx={{ height: 64, mb: 2, width: 64 }} src={`${process.env.REACT_APP_API_PUBLIC_IMAGE}/${dataGetOne.content.img}`} />
              ) : (
                <Avatar sx={{ height: 64, mb: 2, width: 64 }} src={NoAvatar} />
              )}

              <Typography color="textPrimary" gutterBottom variant="h5">
                {`${dataGetOne.firstName} ${dataGetOne.lastName}`}
              </Typography>
            </>
          ) : (
            <></>
          )}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  )
}

export default AccountProfile
