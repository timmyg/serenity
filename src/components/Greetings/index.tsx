// import { useEffect } from 'react'
import { useEffect, useState } from 'react'
// import { Button } from '../Button'
import { Container, Image } from './styles'
import { Badge } from '../Badge'
import { Button } from '../Button'
import Skeleton from '@mui/material/Skeleton'

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
          <Button
            onClick={handleGrantPermission}
            disabled={hasGrantedPermissions}
          >
            Grant Permission
          </Button>
        )
      )}
    </Container>
  )
}
