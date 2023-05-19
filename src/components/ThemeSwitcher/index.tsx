import CircleIcon from '@mui/icons-material/Circle';
import { Status } from '../Home';

interface ThemeSwitcherProps {
  status: Status;
}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
  const getStatusColor = () => {
    switch (props.status) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'gray';
      case undefined:
      default:
        return 'yellow';
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
