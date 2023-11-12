import { lazy } from 'react';
import { ICONS } from '../../utils/constants';
import './Icon.scss';

const ArrowLeft = lazy(() => import('../../assets/svg/arrow-left.svg?react'));
const MessageCircle = lazy(() =>
  import('../../assets/svg/message-circle.svg?react')
);
const Moon = lazy(() => import('../../assets/svg/moon.svg?react'));
const Send = lazy(() => import('../../assets/svg/send.svg?react'));
const Sun = lazy(() => import('../../assets/svg/sun.svg?react'));
const X = lazy(() => import('../../assets/svg/x.svg?react'));

const icons = {
  [ICONS.ArrowLeft]: <ArrowLeft />,
  [ICONS.MessageCircle]: <MessageCircle />,
  [ICONS.Moon]: <Moon />,
  [ICONS.Send]: <Send />,
  [ICONS.Sun]: <Sun />,
  [ICONS.X]: <X />,
};

export function Icon({ name }) {
  return <div className={`Icon Icon--${name}`}>{icons[name]}</div>;
}
