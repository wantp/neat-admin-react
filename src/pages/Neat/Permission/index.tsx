import {PlusOutlined, SortAscendingOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Popconfirm, Tag, Tree} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, {ActionType, ProColumns} from '@ant-design/pro-table';
import {add, remove, updateSort, update} from '@/services/neat_permission';
import PermissionFormFields from '@/pages/Neat/Permission/components/PermissionFormFields';
import {useModel} from '@@/plugin-model/useModel';
import ModalForm from '@/components/Form/ModalForm';
import {Permission, AddParams, UpdateParams} from './data.d';
import {useIntl, FormattedMessage} from "umi";

const List: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const {
    permissionTree,
    sortPermissionTree,
    setSortPermissionTree,
    reloadPermissionTree,
  } = useModel('Permission');
  const [sortDrawerVisible, setSortDrawerVisible] = useState<boolean>(false);
  const [dragNode, setDragNode] = useState<any>();
  const [currentTarget, setCurrentTarget] = useState<Permission>();
  const [modalFormVisible, setModalFormVisible] = useState<boolean>(false);
  const [modalFormType, setModalFormType] = useState<'add' | 'update'>('add');
  const intl = useIntl();

  useEffect(() => {
    reloadPermissionTree();
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

  const handleUpdate = async (permission: Permission, params: UpdateParams) => {
    const hide = message.loading(intl.formatMessage({id: "common.update.processing"}));
    try {
      await update(permission.id, params);
      hide();
      message.success(intl.formatMessage({id: "common.update.success"}));
      return true;
    } catch (error) {
      hide();
      message.error(intl.formatMessage({id: "common.update.fail"}));
      return false;
    }
  };

  const handleRemove = async (permission: Permission) => {
    const hide = message.loading(intl.formatMessage({id: "common.delete.processing"}));
    try {
      await remove(permission.id);
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
    add: intl.formatMessage({id: "pages.neat.permission.add"}),
    update: intl.formatMessage({id: "pages.neat.permission.edit"}),
  };

  const columns: ProColumns<Permission>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: intl.formatMessage({id: "pages.neat.permission.name"}),
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({id: "pages.neat.permission.slug"}),
      dataIndex: 'slug',
      render: (_, record) => (
          <Tag color="magenta" key={record.slug}>
            {record.slug}
          </Tag>
      ),
    },
    {
      title: intl.formatMessage({id: "pages.neat.permission.method"}),
      dataIndex: 'method',
      search: false,
      render: (_, record) => (
        <>
          {record.method.map((name:string) => (
            <Tag color="geekblue" key={name}>
              {name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: intl.formatMessage({id: "pages.neat.permission.http_path"}),
      dataIndex: 'http_path',
      search: false,
    },
    {
      title: intl.formatMessage({id: "common.operate"}),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
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
      ),
    },
  ];

  const allowDrop = (dropInfo: { dropNode: any; dropPosition: -1 | 0 | 1 }) => {
    if (dragNode) {
      const dropKey = dropInfo.dropNode.key.toString();
      const dragKey = dragNode.key.toString();
      const dropNodeLength = dropKey.split('-').length;
      const dragNodeLength = dragKey.split('-').length;

      if (
        dropNodeLength === dragNodeLength &&
        (dropInfo.dropPosition === 1 || dropInfo.dropPosition === -1)
      ) {
        return true;
      }

      if (
        dropNodeLength === dragNodeLength - 1 &&
        dropInfo.dropPosition === 0 &&
        dropKey === dragKey.substr(0, dragKey.lastIndexOf('-'))
      ) {
        return true;
      }
    }

    return false;
  };

  const onDrop = (info: any) => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: Permission[],
      key: string,
      callback: (item: Permission, index: number, arr: Permission[]) => void,
    ) => {
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          // @ts-ignore
          loop(data[i].children, key, callback);
        }
      }
      return true;
    };

    const data = [...sortPermissionTree];

    // Find dragObject
    let dragObj: any;
    loop(data, dragKey, (item: Permission, index: number, arr: Permission[]) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item: Permission) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item: Permission) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: Permission[] = [];
      let i: number = 0;
      loop(data, dropKey, (item: any, index: number, arr: any) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setSortPermissionTree(data);
  };

  const updatePermissionsSort = () => {
    updateSort(sortPermissionTree).then(() => {
      reloadPermissionTree();
      setSortDrawerVisible(false);
    });
  };

  const onDrawerClose = () => {
    setSortDrawerVisible(false);
  };

  const onDragStart = (info: any) => {
    setDragNode(info.node);
  };

  const onPermissionFormSubmit = async (values: any) => {
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
      reloadPermissionTree();
    }
  };

  return (
    <PageContainer>
      <ProTable<Permission>
        headerTitle=""
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            key="permission-update-button"
            type="primary"
            onClick={() => {
              setCurrentTarget(undefined);
              setModalFormType('add');
              setModalFormVisible(true);
            }}
          >
            <PlusOutlined/>
            <FormattedMessage id="pages.neat.permission.add"/>
          </Button>,
          <Button
            key="permission-sort-button"
            type="primary"
            onClick={() => {
              setSortDrawerVisible(true);
            }}
          >
            <SortAscendingOutlined/>
            <FormattedMessage id="pages.neat.permission.sort"/>
          </Button>,
        ]}
        dataSource={permissionTree}
        columns={columns}
        pagination={false}
      />

      <ModalForm
        title={modalFormTitle[modalFormType]}
        visible={modalFormVisible}
        onFinish={onPermissionFormSubmit}
        onCancel={() => {
          setModalFormVisible(false);
        }}
        initialValues={currentTarget}
      >
        <PermissionFormFields/>
      </ModalForm>

      <Drawer
        title={<FormattedMessage id="pages.neat.permission.sort"/>}
        width={720}
        onClose={onDrawerClose}
        visible={sortDrawerVisible}
        bodyStyle={{paddingBottom: 80}}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onDrawerClose} style={{marginRight: 8}}>
              <FormattedMessage id="common.cancel"/>
            </Button>
            <Button onClick={updatePermissionsSort} type="primary">
              <FormattedMessage id="common.save"/>
            </Button>
          </div>
        }
      >
        <Tree
          className="draggable-tree"
          draggable
          blockNode
          onDrop={onDrop}
          allowDrop={allowDrop}
          onDragStart={onDragStart}
          treeData={sortPermissionTree}
        />
      </Drawer>
    </PageContainer>
  );
};

export default List;
