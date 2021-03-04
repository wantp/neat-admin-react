import React, {Key, useEffect, useState} from 'react';
import {Button, Drawer, Form, Tree} from 'antd';
import {useModel} from '@@/plugin-model/useModel';
import {Menu} from "@/pages/Neat/Menu/data";

interface FormProps {
  title?: string;
  visible: boolean;
  onFinish: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
  width?: number;
}

const MenusDrawerForm: React.FC<FormProps> = (props) => {
  const {title, visible, onFinish, onCancel, initialValues, width} = props;

  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [checkedKeys, setCheckedKeys] = useState<{ checked: Key[]; halfChecked: Key[] } | Key[]>(
    [],
  );
  const [checkedInfo, setCheckedInfo] = useState<any>();
  const {sortMenuTree, menuList} = useModel('Menu');

  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues && initialValues.menus) {
      const initCheckedKeys: Key[] = [];

      initialValues.menus.forEach((menu: Menu) => {
        if (menuList[menu.id]) {
          initCheckedKeys.push(menuList[menu.id].key);
        }
      });

      setCheckedKeys(initCheckedKeys);
    }

    setExpandedKeys([]);
    if (sortMenuTree) {
      const defaultExpandedKeys: string[] = [];
      sortMenuTree.forEach((permission: any) => {
        defaultExpandedKeys.push(permission.key);
      });
      setExpandedKeys(defaultExpandedKeys);
    }
  }, [initialValues, sortMenuTree]);

  const onExpand = (keys: Key[]) => {
    setExpandedKeys(keys);
    setAutoExpandParent(false);
  };

  const onCheck = (keys: { checked: Key[]; halfChecked: Key[] } | Key[], info: any) => {
    setCheckedKeys(keys);
    setCheckedInfo(info);
  };

  const onSubmit = () => {
    if (checkedInfo && checkedInfo.checkedNodes) {
      const checkedMenus: any[] = [];
      checkedInfo.checkedNodes.forEach((node: any) => {
        checkedMenus.push({id: node.id});
      });
      form.setFieldsValue({
        menus: checkedMenus,
      });
    }
    form.submit();
  };

  return (
    <Drawer
      title={title}
      destroyOnClose
      visible={visible}
      width={width}
      onClose={onCancel}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onCancel} style={{marginRight: 8}}>
            取消
          </Button>
          <Button onClick={onSubmit} type="primary">
            提交
          </Button>
        </div>
      }
    >
      <Form initialValues={initialValues} form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="menus">
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={sortMenuTree}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default MenusDrawerForm;
