// import { useEffect } from 'react'
import { useEffect, useState } from 'react'
// import { Button } from '../Button'
import { Container, Image } from './styles'
import { Badge } from '../Badge'

export function Greetings() {
  // function handleSayHello() {
  //   window.Main.sendMessage('Hello World')
  //   console.log('Message sent! Check main process log in terminal.')
  // }

  // useEffect(() => {
  //   ;(window as any).ioHook.start()
  //   ;(window as any).ioHook.on('keydown', (event: any) => {
  //     console.log(`Keydown event: ${event.keycode}`)
  //   })
  //   ;(window as any).ioHook.on('mouseclick', (event: any) => {
  //     console.log(`Mouseclick event!: ${event.x}, ${event.y}`)
  //   })
  //   ;(window as any).ioHook.on('mousemove', (event: any) => {
  //     console.log(`Mousemove event!: ${event.x}, ${event.y}`)
  //   })
  // }, [])
  const [currentStatus, setCurrentStatus] = useState<'active' | 'inactive'>()
  useEffect(() => {
    // status-event
    console.log({ window1: window as any })
    ;(window as any).Main.on(
      'status-event',
      (status: 'active' | 'inactive') => {
        // console.log({ event, arg }) // prints "pong"
        setCurrentStatus(status)
      }
    )
  })

  return (
    <Container>
      <Image
        src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        alt="ReactJS logo"
      />
      {/* <Text> */}
      {/* An Electron boilerplate including TypeScript!, React, Jest and ESLint. */}
      {/* </Text> */}
      {/* <Text>status is {currentStatus}</Text> */}
      <br />
      <Badge status={currentStatus || undefined} />
      {/* <Button onClick={handleSayHello}>Send message to main process</Button> */}
    </Container>
  )
}
