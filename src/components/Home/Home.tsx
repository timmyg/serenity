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
// import { ActivityHeatmap } from '../Charts/ActivityHeatmap/ActivityHeatmap';
import ActivityColumnChart from '../Charts/ActivityColumnChart/ActivityColumnChart';

export type Status = 'active' | 'inactive' | undefined;

export function Home() {
  const [hasGrantedPermissions, setHasGrantedPermissions] = useState<boolean>();
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<Status>();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [statusEvents, setStatusEvents] = useState<StatusEvent[]>([]);

  // useEffect(() => {
  //   console.log({ statusEvents: JSON.stringify(statusEvents) });
  // }, [statusEvents]);

  useEffect(() => {
    const statusEventFunction = (statusEvent: StatusEvent) => {
      setCurrentStatus(statusEvent.status);
      setStatusEvents(prevStatusEvents => [...prevStatusEvents, statusEvent]);
    };
    (window as any).Main.on('status-event', statusEventFunction);

    // Return the clean-up function
    return () => {
      (window as any).Main.removeListener('status-event', statusEventFunction);
    };
  }, []);

  useEffect(() => {
    const hasAccessFunction = (status: boolean) => {
      !isReady && setIsReady(true);
      setHasGrantedPermissions(status);
    };
    (window as any).Main.on('has-accessibility-permission', hasAccessFunction);

    // Return the clean-up function
    return () => {
      (window as any).Main.removeListener(
        'has-accessibility-permission',
        hasAccessFunction
      );
    };
  }, []);

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
          {/* <ActivityHeatmap statusEvents={statusEvents} /> */}
          <ActivityColumnChart statusEvents={statusEvents} />
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
