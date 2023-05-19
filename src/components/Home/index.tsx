// import { useEffect } from 'react'
import { useContext, useEffect, useState } from 'react';
import { Container } from './styles';
import { PermissionsDrawer } from '../PermissionsDrawer';
import { Button, Skeleton, useTheme } from '@mui/material';
import { ActivityStatus } from '../ActivityStatus';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { ColorModeContext } from '../../App';
import { ElectronChannel } from '../../../electron/main';

export type Status = 'active' | 'inactive' | undefined;

export function Home() {
  const [hasGrantedPermissions, setHasGrantedPermissions] = useState<boolean>();
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'active' | 'inactive'>();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  useEffect(() => {
    (window as any).Main.on('status-event', (status: Status) => {
      // console.log({ status });
      setCurrentStatus(status);
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

  return (
    <Container>
      {isReady ? (
        <>
          <ActivityStatus status={currentStatus} />
          <ThemeSwitcher
            themeMode={theme.palette.mode}
            onToggle={() => colorMode.toggleColorMode()}
          />
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
