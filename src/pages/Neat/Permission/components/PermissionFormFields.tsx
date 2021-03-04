import React from "react";
import {Form, Input, Select, TreeSelect} from "antd";
import {useModel} from "@@/plugin-model/useModel";
import {useIntl} from "umi";

const methods = [
  {label: "HEAD", value: "HEAD"},
  {label: "GET", value: "GET"},
  {label: "POST", value: "POST"},
  {label: "PUT", value: "PUT"},
  {label: "PATCH", value: "PATCH"},
  {label: "DELETE", value: "DELETE"},
  {label: "OPTIONS", value: "OPTIONS"},
];

const PermissionFormFields: React.FC<{}> = () => {
  const intl = useIntl();
  const {selectPermissionTree} = useModel("Permission");

  return (
    <>
      <Form.Item
        name="parent_id"
        label={intl.formatMessage({id: "pages.neat.permission.parent"})}
        rules={[
          {
            required: true,
            message: intl.formatMessage({id: "pages.neat.permission.parent.required"})
          }
        ]}
      >
        <TreeSelect treeData={selectPermissionTree} treeDefaultExpandAll/>
      </Form.Item>
      <Form.Item
        name="name"
        label={intl.formatMessage({id: "pages.neat.permission.name"})}
        rules={[
          {
            required: true,
            message: intl.formatMessage({id: "pages.neat.permission.name.required"})
          }
        ]}
      >
        <Input id="form.name"/>
      </Form.Item>
      <Form.Item
        name="slug"
        label={intl.formatMessage({id: "pages.neat.permission.slug"})}
        rules={[
          {
            required: true,
            message: intl.formatMessage({id: "pages.neat.permission.slug.required"})
          }
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name="method"
        label={intl.formatMessage({id: "pages.neat.permission.method"})}
      >
        <Select mode="multiple">
          {methods.map((method) => {
            return (<Select.Option key={method.value} value={method.value}>{method.label}</Select.Option>);
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="http_path"
        label={intl.formatMessage({id: "pages.neat.permission.http_path"})}
      >
        <Input/>
      </Form.Item>
    </>
  );
};

export default PermissionFormFields;
