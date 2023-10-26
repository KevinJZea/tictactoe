import MessageCircle from '../../assets/svg/message-circle.svg?react';
import X from '../../assets/svg/x.svg?react';

import { ICONS } from '../../utils/constants';

import './Icon.scss';

const icons = {
  [ICONS.MessageCircle]: <MessageCircle />,
  [ICONS.X]: <X />,
};

export function Icon({ name }) {
  return <div className="Icon">{icons[name]}</div>;
}
