// import { useEffect } from 'react'
import { useEffect, useState } from 'react';
import { Container } from './styles';
import { PermissionsDrawer } from '../PermissionsDrawer';
import { Button } from '@mui/material';
import { ThemeSwitcher } from '../ThemeSwitcher';

export type Status = 'active' | 'inactive' | undefined;

export function Home() {
  const [hasGrantedPermissions, setHasGrantedPermissions] = useState<boolean>();
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'active' | 'inactive'>();
  useEffect(() => {
    (window as any).Main.on('status-event', (status: Status) => {
      console.log({ status });
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
      <ThemeSwitcher status={currentStatus} />
      {!hasGrantedPermissions && (
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
      )}
    </Container>
  );
}
