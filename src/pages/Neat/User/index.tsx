import {PlusOutlined} from '@ant-design/icons';
import {Avatar, Button, Divider, message, Popconfirm, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, {ActionType, ProColumns} from '@ant-design/pro-table';
import {add, queryList, remove, update} from '@/services/neat_user';
import ModalForm from '@/components/Form/ModalForm';
import UserFormFields from '@/pages/Neat/User/components/UserFormFields';
import {useModel} from '@@/plugin-model/useModel';
import {User, AddParams, UpdateParams} from './data.d';
import {useIntl, FormattedMessage} from "umi";

const List: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modalFormVisible, setModalFormVisible] = useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<User>();
  const [modalFormType, setModalFormType] = useState<'add' | 'update'>('add');
  const {reloadAllRoles} = useModel('Role');
  const intl = useIntl();

  useEffect(() => {
    reloadAllRoles();
  }, []);

  const handleAdd = async (params: AddParams) => {
    const hide = message.loading(intl.formatMessage({id: "common.add.processing"}));
    try {
      await add({...params});
      hide();
      message.success(intl.formatMessage({id: "common.add.success"}));
      return true;
    } catch (error) {
      hide();
      message.error(intl.formatMessage({id: "common.add.fail"}));
      return false;
    }
  };

  const handleUpdate = async (user: User, params: UpdateParams) => {
    const hide = message.loading(intl.formatMessage({id: "common.update.processing"}));
    try {
      await update(user.id, params);
      hide();
      message.success(intl.formatMessage({id: "common.update.success"}));
      return true;
    } catch (error) {
      hide();
      message.error(intl.formatMessage({id: "common.update.fail"}));
      return false;
    }
  };

  const handleRemove = async (user: User) => {
    const hide = message.loading(intl.formatMessage({id: "common.delete.processing"}));
    try {
      await remove(user.id);
      hide();
      message.success(intl.formatMessage({id: "common.delete.success"}));
      return true;
    } catch (error) {
      hide();
      message.error(intl.formatMessage({id: "common.delete.fail"}));
      return false;
    }
  };

  const modalFormTitle = {
    add: intl.formatMessage({id: "pages.neat.user.add"}),
    update: intl.formatMessage({id: "pages.neat.user.edit"}),
  };

  const columns: ProColumns<User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: intl.formatMessage({id: "pages.neat.user.username"}),
      dataIndex: 'username',
    },
    {
      title: intl.formatMessage({id: "pages.neat.user.nickname"}),
      dataIndex: 'nickname',
    },
    {
      title: intl.formatMessage({id: "pages.neat.user.avatar"}),
      dataIndex: 'avatar',
      search: false,
      render: (_, record) => {
        return <Avatar src={record.avatar}/>;
      },
    },
    {
      title: intl.formatMessage({id: "pages.neat.user.role"}),
      dataIndex: 'roles',
      search: false,
      render: (_, record) => (
        <>
          {record.roles.map(({name}) => (
            <Tag color="cyan" key={name}>
              {name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: intl.formatMessage({id: "common.operate"}),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <>
            <a
              onClick={() => {
                setCurrentTarget(record);
                setModalFormType('update');
                setModalFormVisible(true);
              }}
            >
              <FormattedMessage id="common.edit"/>
            </a>
            <Divider type="vertical"/>
            <Popconfirm
              title={<FormattedMessage id="common.delete.confirm"/>}
              onConfirm={async () => {
                await handleRemove(record);
                actionRef?.current?.reload();
              }}
            >
              <a><FormattedMessage id="common.delete"/></a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const listRequest = async (params: any, sorter: any, filter: any) => {
    const {current, ...param} = params;
    const res = await queryList({...param, page: current, sorter, filter});

    let {data} = res;

    data = data.map((user: User) => {
      return {
        ...user,
        // avatar: [{ url: user.avatar }],
        roles_id: user.roles.map((role: any) => {
          return role.id;
        }),
      };
    });

    return {
      data,
      total: res.meta.total,
      success: true,
    };
  };

  const onSubmit = async (values: any) => {
    let formatValues = {...values};

    if (values.roles_id) {
      const {roles_id, ...value} = formatValues;
      value.roles = roles_id.map((roleId: number) => {
        return {id: roleId};
      })
      formatValues = value;
    }

    if (currentTarget && currentTarget.avatar === values.avatar) {
      const {avatar, ...formValues} = formatValues;
      formatValues = {...formValues};
    }

    let res = false;
    switch (modalFormType) {
      case 'add':
        res = await handleAdd(formatValues);
        break;
      case 'update':
        if (currentTarget) {
          res = await handleUpdate(currentTarget, formatValues);
        }
        break;
      default:
        break;
    }
    if (res) {
      setModalFormVisible(false);
      actionRef.current?.reload();
    }
  };

  return (
    <PageContainer>
      <ProTable<User>
        headerTitle=""
        actionRef={actionRef}
        rowKey="id"
        search={{
          defaultCollapsed: false,
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="user-add-button"
            onClick={() => {
              setCurrentTarget(undefined);
              setModalFormType('add');
              setModalFormVisible(true);
            }}
            type="primary"
          >
            <PlusOutlined/>
            <FormattedMessage id="pages.neat.user.add"/>
          </Button>,
        ]}
        request={listRequest}
        columns={columns}
      />

      <ModalForm
        title={modalFormTitle[modalFormType]}
        visible={modalFormVisible}
        onFinish={onSubmit}
        onCancel={() => {
          setModalFormVisible(false);
        }}
        initialValues={currentTarget}
        formProps={
          {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
          }
        }
      >
        <UserFormFields/>
      </ModalForm>
    </PageContainer>
  );
};

export default List;
