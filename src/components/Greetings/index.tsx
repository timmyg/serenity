// import { useEffect } from 'react'
import { useEffect, useState } from 'react'
// import { Button } from '../Button'
import { Container, Image } from './styles'
import { Badge } from '../Badge'
import { Button } from '../Button'
// import Skeleton from '@mui/material/Skeleton'
// import ReportIcon from '@mui/icons-material/Report'
import { Alert } from '@mui/material'

export function Greetings() {
  // function handleSayHello() {
  // window.Main.sendMessage('Hello World')
  //   console.log('Message sent! Check main process log in terminal.')
  // }

  function handleGrantPermission() {
    console.log('grant permission')
    window.Main.sendMessage('Hello World')
    window.Main.grantAccessibility(true)
  }
  const [hasGrantedPermissions, setHasGrantedPermissions] = useState<boolean>()
  const [currentStatus, setCurrentStatus] = useState<'active' | 'inactive'>()
  useEffect(() => {
    // status-event
    ;(window as any).Main.on(
      'status-event',
      (status: 'active' | 'inactive') => {
        setCurrentStatus(status)
      }
    )
  })

  useEffect(() => {
    ;(window as any).Main.on(
      'has-accessibility-permission',
      (status: boolean) => {
        console.log('**')
        console.log('**')
        console.log('**')
        console.log('**')
        console.log({ status })
        setHasGrantedPermissions(status)
      }
    )
  })

  return (
    <Container>
      <Image
        src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        alt="ReactJS logo"
      />
      <br />
      {currentStatus ? (
        <Badge status={currentStatus} />
      ) : (
        hasGrantedPermissions === false && (
          <>
            <Alert severity="warning">
              Serenity needs accessibility permissions to monitor, not record,
              your keyboard and mouse activity. This is crucial for the optimal
              functionality of the app, helping it adapt to your interactions.
            </Alert>

            {/* <p> */}
            {/* more */}
            {/* It's important to clarify that we do not track specific keys you press or the exact positions of your mouse movements. Instead, we only monitor the general activity status, such as whether the keyboard or mouse is being used or not. This allows our application to better adapt to your workflow and offer a more responsive and customized experience.

We also want to assure you that your privacy is of utmost importance to us. None of the data related to keyboard or mouse activity is sent to any server or used for any purpose other than improving your user experience within the application.

We are committed to maintaining your trust and protecting your privacy. Should you have any questions or concerns, please don't hesitate to reach out to us. */}
            {/* </p> */}
            <Button
              onClick={handleGrantPermission}
              disabled={hasGrantedPermissions}
            >
              Grant Permission
            </Button>
          </>
        )
      )}
    </Container>
  )
}
