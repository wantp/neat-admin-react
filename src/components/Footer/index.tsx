import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="Neat admin"
    links={[
      {
        key: 'Neat Admin',
        title: 'Neat Admin',
        href: 'https://github.com/wantp/neat-admin',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/wantp/neat-admin-react',
        blankTarget: true,
      },
      {
        key: 'Neat Admin React',
        title: 'Neat Admin React',
        href: 'https://github.com/wantp/neat-admin-react',
        blankTarget: true,
      },

    ]}
  />
);
