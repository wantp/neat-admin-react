import {
  AlipayCircleOutlined,
  LockTwoTone,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {Space, message} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormText} from '@ant-design/pro-form';
import {useIntl, Link, history, SelectLang, useModel} from 'umi';
import Footer from '@/components/Footer';
import {login, LoginParamsType} from '@/services/login';
import {setAccessToken} from '@/utils/acessToken';
import styles from './index.less';
import {queryCurrentMenus} from "@/services/current";
import {getMenuPaths} from "@/utils/menu";

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const {query} = history.location;
    const {redirect} = query as {
      redirect: string;
    };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false);
  const {initialState, setInitialState} = useModel('@@initialState');
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      const menuData = await queryCurrentMenus();
      const menuPaths = getMenuPaths(menuData);
      setInitialState({...initialState, currentUser: userInfo, menuData, menuPaths});
    }
  };

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);

    try {
      // 登录
      const msg = await login({...values});

      if (msg.access_token) {
        message.success(intl.formatMessage({id: "pages.login.success"}));
        setAccessToken(msg.access_token);
        await fetchUserInfo();
        goto();
        return;
      }
    } catch (error) {
      const {response} = error;
      const body = await response.json();
      message.error(body.message);
    }

    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang}>{SelectLang && <SelectLang/>}</div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg"/>
              <span className={styles.title}>{intl.formatMessage({id: 'common.app.name'})}</span>
            </Link>
          </div>
          <div className={styles.desc}>{intl.formatMessage({id: 'common.app.description'})}</div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({id: 'pages.login.submit'}),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values: LoginParamsType) => {
              await handleSubmit(values);
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon}/>,
              }}
              placeholder={intl.formatMessage({id: 'pages.login.username.placeholder'})}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({id: 'pages.login.username.required'}),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockTwoTone className={styles.prefixIcon}/>,
              }}
              placeholder={intl.formatMessage({id: 'pages.login.password.placeholder'})}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({id: 'pages.login.password.required'}),
                },
              ]}
            />

            <div
              style={{
                marginBottom: 24,
              }}
            />
          </ProForm>
          <Space className={styles.other}>
            {intl.formatMessage({id: 'pages.login.loginWith'})}
            <AlipayCircleOutlined className={styles.icon}/>
            <TaobaoCircleOutlined className={styles.icon}/>
            <WeiboCircleOutlined className={styles.icon}/>
          </Space>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
