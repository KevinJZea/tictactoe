import MessageCircle from '../../assets/svg/message-circle.svg?react';
import Moon from '../../assets/svg/moon.svg?react';
import Send from '../../assets/svg/send.svg?react';
import Sun from '../../assets/svg/sun.svg?react';
import X from '../../assets/svg/x.svg?react';

import { ICONS } from '../../utils/constants';

import './Icon.scss';

const icons = {
  [ICONS.MessageCircle]: <MessageCircle />,
  [ICONS.Moon]: <Moon />,
  [ICONS.Send]: <Send />,
  [ICONS.Sun]: <Sun />,
  [ICONS.X]: <X />,
};

export function Icon({ name }) {
  return <div className="Icon">{icons[name]}</div>;
}
