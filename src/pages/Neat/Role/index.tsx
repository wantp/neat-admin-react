import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message, Popconfirm, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, {ActionType, ProColumns} from '@ant-design/pro-table';
import {add, queryList, remove, update} from '@/services/neat_role';
import RoleFormFields from '@/pages/Neat/Role/components/RoleFormFields';
import PermissionsDrawerForm from '@/pages/Neat/Role/components/PermissionsDrawerForm';
import ModalForm from '@/components/Form/ModalForm';
import {Role, AddParams, UpdateParams} from './data.d';
import {useModel} from "@@/plugin-model/useModel";
import MenusDrawerForm from "@/pages/Neat/Role/components/MenusDrawerForm";
import {useIntl, FormattedMessage} from "umi";

const List: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [permissionDrawerVisible, setPermissionDrawerVisible] = useState<boolean>(false);
  const [menuDrawerVisible, setMenuDrawerVisible] = useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<Role>();
  const [modalFormVisible, setModalFormVisible] = useState<boolean>(false);
  const [modalFormType, setModalFormType] = useState<'add' | 'update'>('add');
  const {reloadPermissionTree} = useModel('Permission');
  const {reloadMenuTree} = useModel('Menu');
  const intl = useIntl();

  useEffect(() => {
    reloadPermissionTree();
    reloadMenuTree();
  }, [])

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

  const handleUpdate = async (role: Role, params: UpdateParams) => {
    const hide = message.loading(intl.formatMessage({id: "common.update.processing"}));
    try {
      await update(role.id, params);
      hide();

      message.success(intl.formatMessage({id: "common.update.success"}));
      return true;
    } catch (error) {
      hide();
      message.error(intl.formatMessage({id: "common.update.fail"}));
      return false;
    }
  };

  const handleRemove = async (role: Role) => {
    const hide = message.loading(intl.formatMessage({id: "common.delete.processing"}));
    try {
      await remove(role.id);
      hide();
      message.success(intl.formatMessage({id: "common.delete.processing"}));
      return true;
    } catch (error) {
      hide();
      message.error(intl.formatMessage({id: "common.delete.processing"}));
      return false;
    }
  };

  const modalFormTitle = {
    add: intl.formatMessage({id: "pages.neat.role.add"}),
    update: intl.formatMessage({id: "pages.neat.role.edit"}),
  };

  const columns: ProColumns<Role>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
      sorter: true,
    },
    {
      title: intl.formatMessage({id: "pages.neat.role.name"}),
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({id: "pages.neat.role.slug"}),
      dataIndex: 'slug',
      render: (_, record) => (
        <Tag color="magenta" key={record.slug}>
          {record.slug}
        </Tag>
      ),
    },
    {
      title: intl.formatMessage({id: "pages.neat.role.remarks"}),
      dataIndex: 'remarks',
      search: false,
    },
    {
      title: intl.formatMessage({id: "common.operate"}),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (record.slug === 'Administrator') {
          return (<></>);
        }
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
            <a
              onClick={() => {
                setCurrentTarget(record);
                setPermissionDrawerVisible(true);
              }}
            >
              <FormattedMessage id="common.permissions"/>
            </a>
            <Divider type="vertical"/>
            <a
              onClick={() => {
                setCurrentTarget(record);
                setMenuDrawerVisible(true);
              }}
            >
              <FormattedMessage id="common.menus"/>
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
    const res = await queryList({...param, include: "permissions,menus", page: current, sorter, filter});

    return {
      data: res.data,
      success: true,
      total: res.meta.total,
    };
  };

  const onRoleFormSubmit = async (values: any) => {
    let res = false;
    switch (modalFormType) {
      case 'add':
        res = await handleAdd(values);
        break;
      case 'update':
        if (currentTarget) {
          res = await handleUpdate(currentTarget, values);
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

  const onPermissionFormSubmit = async (values: any) => {
    if (!currentTarget) {
      return;
    }
    const res = await handleUpdate(currentTarget, values);
    if (res) {
      setPermissionDrawerVisible(false);
      actionRef.current?.reload();
    }
  };

  const onMenuFormSubmit = async (values: any) => {
    if (!currentTarget) {
      return;
    }
    const res = await handleUpdate(currentTarget, values);
    if (res) {
      setMenuDrawerVisible(false);
      actionRef.current?.reload();
    }
  };

  return (
    <PageContainer>
      <ProTable<Role>
        headerTitle=""
        actionRef={actionRef}
        rowKey="id"
        search={{
          defaultCollapsed: false,
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="role-add-button"
            type="primary"
            onClick={() => {
              setCurrentTarget(undefined);
              setModalFormType('add');
              setModalFormVisible(true);
            }}
          >
            <PlusOutlined/>
            <FormattedMessage id="pages.neat.role.add"/>
          </Button>,
        ]}
        request={listRequest}
        columns={columns}
      />

      <ModalForm
        title={modalFormTitle[modalFormType]}
        visible={modalFormVisible}
        onFinish={onRoleFormSubmit}
        onCancel={() => {
          setModalFormVisible(false);
        }}
        initialValues={currentTarget}
      >
        <RoleFormFields/>
      </ModalForm>

      <PermissionsDrawerForm
        title={intl.formatMessage({id: "pages.neat.role.permissions_configure"})}
        visible={permissionDrawerVisible}
        onFinish={onPermissionFormSubmit}
        onCancel={() => {
          setPermissionDrawerVisible(false);
        }}
        initialValues={currentTarget}
        width={800}
      />

      <MenusDrawerForm
        title={intl.formatMessage({id: "pages.neat.role.menus_configure"})}
        visible={menuDrawerVisible}
        onFinish={onMenuFormSubmit}
        onCancel={() => {
          setMenuDrawerVisible(false);
        }}
        initialValues={currentTarget}
        width={800}
      />
    </PageContainer>
  );
};

export default List;
