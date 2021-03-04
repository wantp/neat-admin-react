import React, {ReactNode, useEffect, useState} from "react";
import {Form, Input, Modal, Popover, Select, TreeSelect} from "antd";
import styles from "@/pages/Neat/Menu/components/index.less";
import {IconMap, IconsList} from "@/components/Icons";
import {useModel} from "@@/plugin-model/useModel";
import {FormattedMessage, useIntl} from "umi";

const {Option} = Select;

export interface MenuFormProps {
  title: string;
  visible: boolean;
  onFinish: (values: any) => void,
  onCancel: () => void,
  initialValues?: any;
}

const formItemStyle = {width: 440};

const MenuForm: React.FC<MenuFormProps> = (props) => {
  const {title, onFinish, onCancel, visible, initialValues} = props;

  const {selectMenuTree} = useModel("Menu");
  const {allRoles} = useModel("Role");
  const [iconNode, setIconNode] = useState<ReactNode>();
  const intl = useIntl();

  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
    const iconNodeElement = form.getFieldValue('icon') ? IconMap[form.getFieldValue('icon')] : IconMap.MenuOutlined;
    setIconNode(iconNodeElement);
  }, [initialValues]);

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const iconValue = e.currentTarget.getAttribute('data-key');
    if (iconValue) {
      form.setFieldsValue({icon: iconValue});
      setIconNode(IconMap[iconValue]);
    }
  }

  const onOk = () => {
    form.submit();
  }

  const roleSelectOptions = (roles: any[]) => {
    const options: any[] = [];
    roles.forEach((role: any) => {
      options.push(<Option key={role.id} value={role.id}>{role.name}</Option>);
    })

    return options;
  }

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      destroyOnClose
      title={title}
      forceRender
      keyboard={false}
    >
      <Form
        initialValues={initialValues}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <div className={styles.main}>
          <Form.Item
            style={formItemStyle}
            name="parent_id"
            label={<FormattedMessage id="pages.neat.menu.parent"/>}
            rules={[
              {
                required: true,
                message: intl.formatMessage({id: "pages.neat.menu.parent_id.required"})
              }
            ]}
          >
            <TreeSelect treeData={selectMenuTree} treeDefaultExpandAll/>
          </Form.Item>
          <Form.Item
            style={formItemStyle}
            name="name"
            label={<FormattedMessage id="pages.neat.menu.name"/>}
            rules={[
              {
                required: true,
                message: intl.formatMessage({id: "pages.neat.menu.name.required"})
              }
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            style={formItemStyle}
            name="path"
            label={<FormattedMessage id="pages.neat.menu.path"/>}
            rules={[
              {
                required: true,
                message: intl.formatMessage({id: "pages.neat.menu.path.required"})
              }
            ]}
          >
            <Input/>
          </Form.Item>
          <Popover
            placement="bottomLeft"
            content={() => (<IconsList onClick={onClick}/>)}
            title=""
            trigger="click"
          >
            <Form.Item
              style={formItemStyle}
              name="icon"
              label={<FormattedMessage id="pages.neat.menu.icon"/>}
            >
              <Input addonBefore={iconNode}/>
            </Form.Item>
          </Popover>
          <Form.Item
            style={formItemStyle}
            name="roles_id"
            label={<FormattedMessage id="pages.neat.menu.role"/>}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder={intl.formatMessage({id: "pages.neat.menu.select_roles"})}
            >
              {roleSelectOptions(allRoles)}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

export default MenuForm;
