import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeMode } from '../../App';

interface Props {
  onToggle: () => void;
  themeMode: ThemeMode;
}

export function ThemeSwitcher(props: Props) {
  const { onToggle, themeMode } = props;
  return (
    <IconButton
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: 0,
      }}
      onClick={onToggle}
      color="inherit"
    >
      {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
