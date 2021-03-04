import React, {Key, useEffect, useState} from 'react';
import {Button, Drawer, Form, Tree} from 'antd';
import {Permission} from '@/pages/Neat/Permission/data';
import {useModel} from '@@/plugin-model/useModel';
import {FormattedMessage} from "umi";

interface FormProps {
  title?: string;
  visible: boolean;
  onFinish: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
  width?: number;
}

const PermissionsDrawerForm: React.FC<FormProps> = (props) => {
  const {title, visible, onFinish, onCancel, initialValues, width} = props;

  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [checkedKeys, setCheckedKeys] = useState<{ checked: Key[]; halfChecked: Key[] } | Key[]>(
    [],
  );
  const [checkedInfo, setCheckedInfo] = useState<any>();
  const {sortPermissionTree, permissionList} = useModel('Permission');

  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues && initialValues.permissions) {
      const initCheckedKeys: Key[] = [];

      initialValues.permissions.forEach((permission: Permission) => {
        if (permissionList[permission.id]) {
          initCheckedKeys.push(permissionList[permission.id].key);
        }
      });

      setCheckedKeys(initCheckedKeys);
    }

    setExpandedKeys([]);
    if (sortPermissionTree) {
      const defaultExpandedKeys: string[] = [];
      sortPermissionTree.forEach((permission: any) => {
        defaultExpandedKeys.push(permission.key);
      });
      setExpandedKeys(defaultExpandedKeys);
    }
  }, [initialValues, sortPermissionTree]);

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
      const checkedPermissions: any[] = [];
      checkedInfo.checkedNodes.forEach((node: any) => {
        checkedPermissions.push({id: node.id});
      });
      form.setFieldsValue({
        permissions: checkedPermissions,
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
            <FormattedMessage id="common.cancel"/>
          </Button>
          <Button onClick={onSubmit} type="primary">
            <FormattedMessage id="common.save"/>
          </Button>
        </div>
      }
    >
      <Form initialValues={initialValues} form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="permissions">
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={sortPermissionTree}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default PermissionsDrawerForm;
