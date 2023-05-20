import CircleIcon from '@mui/icons-material/Circle';
import { useTheme } from '@mui/material';
import { Status } from '../Home/Home';

interface ActivityStatusProps {
  status: Status;
}

export function ActivityStatus(props: ActivityStatusProps) {
  const theme = useTheme();
  const getStatusColor = () => {
    switch (props.status) {
      case 'active':
        // @ts-ignore
        return theme.palette.status.active;
      case 'inactive':
        // @ts-ignore
        return theme.palette.status.inactive;
      case undefined:
      default:
        // @ts-ignore
        return theme.palette.status.unknown;
    }
  };

  return (
    <CircleIcon
      sx={{
        position: 'absolute',
        top: 5,
        left: 5,
        color: getStatusColor(),
      }}
    />
  );
}
