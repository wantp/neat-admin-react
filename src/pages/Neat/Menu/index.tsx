import {PlusOutlined, SortAscendingOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Popconfirm, Tree} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, {ActionType, ProColumns} from '@ant-design/pro-table';
import {add, remove, update, updateSort, queryOne} from '@/services/neat_menu';
import {useModel} from '@@/plugin-model/useModel';
import MenuForm from '@/pages/Neat/Menu/components/MenuForm';
import {Menu, AddParams, UpdateParams} from './data.d';
import {FormattedMessage, useIntl} from "umi";

const List: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [sortDrawerVisible, setSortDrawerVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<Menu>();
  const [modalFormType, setModalFormType] = useState<'add' | 'update'>('add');
  const [dragNode, setDragNode] = useState<any>();
  const {menuTree, sortMenuTree, setSortMenuTree, reloadMenuTree} = useModel('Menu');
  const {reloadAllRoles} = useModel('Role');
  const intl = useIntl();

  useEffect(() => {
    reloadMenuTree();
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

  const handleUpdate = async (menu: Menu, params: UpdateParams) => {
    const hide = message.loading(intl.formatMessage({id: "common.update.processing"}));
    try {
      await update(menu.id, params);
      hide();
      message.success(intl.formatMessage({id: "common.update.success"}));
      return true;
    } catch (error) {
      hide();
      message.error(intl.formatMessage({id: "common.update.fail"}));
      return false;
    }
  };

  const handleRemove = async (menu: Menu) => {
    const hide = message.loading(intl.formatMessage({id: "common.delete.processing"}));
    try {
      await remove(menu.id);
      hide();
      message.success(intl.formatMessage({id: "common.delete.success"}));
      return true;
    } catch (error) {
      hide();
      message.error(intl.formatMessage({id: "common.delete.fail"}));
      return false;
    }
  };

  const columns: ProColumns<Menu>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: intl.formatMessage({id: "pages.neat.menu.name"}),
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({id: "pages.neat.menu.path"}),
      dataIndex: 'path',
      search: false,
    },
    {
      title: intl.formatMessage({id: "common.operate"}),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              const currentMenu = await queryOne(record.id);
              const formatMenu = {
                ...currentMenu,
                roles_id: currentMenu.roles.map((role: any) => {
                  return role.id;
                }),
              };
              setCurrentTarget(formatMenu);
              setModalVisible(true);
              setModalFormType('update');
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
              reloadMenuTree();
            }}
          >
            <a><FormattedMessage id="common.delete"/></a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const onDrop = (info: any) => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: Menu[],
      key: string,
      callback: (item: Menu, index: number, arr: Menu[]) => void,
    ) => {
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
      return true;
    };

    const data = [...sortMenuTree];

    // Find dragObject
    let dragObj: any;
    loop(data, dragKey, (item: Menu, index: number, arr: Menu[]) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item: Menu) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item: Menu) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: Menu[] = [];
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
    setSortMenuTree(data);
  };

  const updateMenusSort = () => {
    updateSort(sortMenuTree).then(() => {
      reloadMenuTree();
      setSortDrawerVisible(false);
    });
  };

  const allowDrop = (dropInfo: { dropNode: any; dropPosition: -1 | 0 | 1 }) => {
    if (dropInfo.dropNode.level) {
      const getNodeDepth = (node: any) => {
        const depths: any = {};
        const loop = (item: any) => {
          depths[item.level] = 1;
          if (item.children) {
            item.children.forEach((childItem: any) => {
              loop(childItem);
            });
          }
        };
        loop(node);

        const currentLevel = node.level;

        const maxDepth = Object.keys(depths).reduce((a: string, b: string) => {
          return b > a ? b : a;
        });

        return Number(maxDepth) - currentLevel + 1;
      };

      const dragNodeDepth = getNodeDepth(dragNode);

      return dropInfo.dropNode.level + dragNodeDepth <= 3;
    }
    return false;
  };

  const onDragStart = (info: any) => {
    setDragNode(info.node);
  };

  const onDrawerClose = () => {
    setSortDrawerVisible(false);
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
      setModalVisible(false);
      actionRef.current?.reload();
      console.log(123);
      reloadMenuTree();
    }
  };

  return (
    <PageContainer>
      <ProTable<Menu>
        headerTitle=""
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            key="menu-sort-button"
            type="primary"
            onClick={() => {
              setCurrentTarget(undefined);
              setModalVisible(true);
              setModalFormType('add');
            }}
          >
            <PlusOutlined/>
            <FormattedMessage id="pages.neat.menu.add"/>
          </Button>,
          <Button
            key="menu-sort-button"
            type="primary"
            onClick={() => {
              setSortDrawerVisible(true);
            }}
          >
            <SortAscendingOutlined/>
            <FormattedMessage id="pages.neat.menu.sort"/>
          </Button>,
        ]}
        columns={columns}
        dataSource={menuTree}
        defaultExpandAllRows
        pagination={false}
      />

      <MenuForm
        title={intl.formatMessage({id: "pages.neat.menu.edit"})}
        onFinish={onSubmit}
        onCancel={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
        initialValues={currentTarget}
      />

      <Drawer
        title={intl.formatMessage({id: "pages.neat.menu.sort"})}
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
            <Button onClick={updateMenusSort} type="primary">
              <FormattedMessage id="common.save"/>
            </Button>
          </div>
        }
      >
        <Tree
          className="draggable-tree"
          defaultExpandAll
          draggable
          blockNode
          onDragStart={onDragStart}
          onDrop={onDrop}
          allowDrop={allowDrop}
          treeData={sortMenuTree}
        />
      </Drawer>
    </PageContainer>
  );
}

export default List;
