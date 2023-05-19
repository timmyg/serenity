import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { useEffect, useState } from 'react';

interface SimpleDrawerProps {
  isOpen: boolean;
  hasGrantedPermissions: boolean;
  onClose: () => void;
}

function SimpleDrawer(props: SimpleDrawerProps) {
  const { isOpen, hasGrantedPermissions, onClose } = props;
  // const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(isOpen);

  // useEffect(() => {
  //   setIsDrawerOpen(isOpen);
  // }, [isOpen]);

  function handleGrantPermission() {
    // window.Main.sendMessage('Hello World')
    window.Main.grantAccessibility(true);
  }

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={() => onClose()}>
      <Box sx={{ width: 'auto', padding: 2 }}>
        <Typography variant="h6">Grant Permission</Typography>
        <Alert severity="info" sx={{ marginTop: 2 }}>
          Serenity needs accessibility permissions to monitor your keyboard and
          mouse activity. This is crucial for the optimal functionality of the
          app, and activity is <b>never</b> recorded.
        </Alert>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleGrantPermission}
            disabled={hasGrantedPermissions}
            sx={{ marginTop: 2 }}
          >
            Grant Permission
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

interface PermissionsDrawerProps {
  isOpen: boolean;
  hasGrantedPermissions: boolean;
  onClose: () => void;
}

export function PermissionsDrawer(props: PermissionsDrawerProps) {
  const { hasGrantedPermissions, isOpen, onClose } = props;
  return (
    <SimpleDrawer
      hasGrantedPermissions={hasGrantedPermissions}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
