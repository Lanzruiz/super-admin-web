import { officerMenuItems } from '@/routes';
import { List } from '@material-tailwind/react';
import React from 'react';
import RenderListItem from './RenderListItem';
import { nanoid } from 'nanoid';

export default function MainMenuItems({ menuItems }) {
  return (
    <>
      {menuItems.map(({ title, menuItems }) => (
        <div className="pb-2" key={nanoid()}>
          <h3
            className="text-primary font-bold pl-4 text-sm"
            style={{ textTransform: 'uppercase' }}
          >
            {title}
          </h3>
          {menuItems.map((item) => (
            <li key={item.url} className="my-1 ">
              <RenderListItem item={item} />
            </li>
          ))}
        </div>
      ))}
    </>
  );
}
