// import { useEffect } from 'react'
import { useEffect, useState } from 'react';
import { Container, Image } from './styles';
import { Badge } from '../Badge';
import { PermissionsDrawer } from '../PermissionsDrawer';
import { Button } from '@mui/material';

export function Greetings() {
  const [hasGrantedPermissions, setHasGrantedPermissions] = useState<boolean>();
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'active' | 'inactive'>();
  useEffect(() => {
    (window as any).Main.on('status-event', (status: 'active' | 'inactive') => {
      setCurrentStatus(status);
    });
  });

  useEffect(() => {
    (window as any).Main.on(
      'has-accessibility-permission',
      (status: boolean) => {
        // console.debug({ status })
        setHasGrantedPermissions(status);
      }
    );
  });

  return (
    <Container>
      <Image
        src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        alt="ReactJS logo"
      />
      <br />
      {currentStatus ? (
        <>
          <Badge status={currentStatus} />
        </>
      ) : (
        hasGrantedPermissions === false && (
          <>
            <Button
              variant="contained"
              onClick={() => setIsPermissionsDialogOpen(true)}
            >
              Get Started
            </Button>
            <PermissionsDrawer
              hasGrantedPermissions={hasGrantedPermissions}
              isOpen={isPermissionsDialogOpen}
              onClose={() => setIsPermissionsDialogOpen(false)}
            />
          </>
        )
      )}
    </Container>
  );
}
