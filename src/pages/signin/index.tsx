import * as React from 'react'

import { SignUpIn } from '@/features/layout'
import SignIn from '@features/templates/sign-in/'

interface ISignin {}
const Signin: React.FunctionComponent<ISignin> = () => {
  return (
    <SignUpIn>
      <SignIn />
    </SignUpIn>
  )
}

export default Signin
