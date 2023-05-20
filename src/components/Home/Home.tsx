// import { useEffect } from 'react'
import { useContext, useEffect, useState } from 'react';
import { Container } from './styles';
import { PermissionsDrawer } from '../PermissionsDrawer';
import { Button, Skeleton, useTheme } from '@mui/material';
import { ActivityStatus } from '../ActivityStatus';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { ColorModeContext } from '../../App';
import { Brand } from '../Brand';
import { StatusEvent } from '../../../electron/main';

export type Status = 'active' | 'inactive' | undefined;

export function Home() {
  const [hasGrantedPermissions, setHasGrantedPermissions] = useState<boolean>();
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<Status>();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  useEffect(() => {
    (window as any).Main.on('status-event', (statusEvent: StatusEvent) => {
      console.log({ statusEvent });
      setCurrentStatus(statusEvent.status);
    });
  });

  useEffect(() => {
    (window as any).Main.on(
      'has-accessibility-permission',
      (status: boolean) => {
        !isReady && setIsReady(true);
        setHasGrantedPermissions(status);
      }
    );
  });

  console.log({ isReady });
  return (
    <Container>
      {isReady ? (
        <>
          <ActivityStatus status={currentStatus} />
          <ThemeSwitcher
            themeMode={theme.palette.mode}
            onToggle={() => colorMode.toggleColorMode()}
          />
          <Brand />
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
        </>
      ) : (
        <>
          <Skeleton variant="rectangular" width={210} height={60} />
          <br />
          <Skeleton variant="rectangular" width={210} height={60} />
          <br />
          <Skeleton variant="rectangular" width={210} height={60} />
        </>
      )}
    </Container>
  );
}
