import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Carousel, Image} from 'antd';
import styles from './Home.less';


export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Carousel autoplay className={styles.carousel}>
        <Image src="home/login.png"/>
        <Image src="home/side.png"/>
        <Image src="home/top.png"/>
        <Image src="home/dark.png"/>
        <Image src="home/dragsort.png"/>
        <Image src="home/i18n.png"/>
      </Carousel>
    </PageContainer>
  );
};
