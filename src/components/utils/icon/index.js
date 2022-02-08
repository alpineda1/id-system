import { Icon } from '@mui/material';
import Phosphor from './components/phosphor';

const IconComponent = ({
  className,
  color = 'default',
  sx = {},
  icon = 'house',
  iconType = 'phosphor',
  weight = 'duotone',
}) => {
  return (
    <Icon
      color={color}
      sx={{ ...sx, display: 'inline-flex' }}
      className={className}
    >
      {iconType === 'phosphor' ? (
        <Phosphor icon={icon} weight={weight} />
      ) : null}
    </Icon>
  );
};

export default IconComponent;
