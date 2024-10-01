import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
const GoogleOAuthProvide = (
    {children}: {children: React.ReactNode}
) => {
  return (
    <>
    <GoogleOAuthProvider clientId={
        '190110108776-8d9ml47jrgbnj1i6d9891ipntn0m1a5f.apps.googleusercontent.com'
    }>
        {children}
    </GoogleOAuthProvider> 
    </>
  )
}

export default GoogleOAuthProvide