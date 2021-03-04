import React from 'react';
import {Form, Input} from 'antd';
import {useIntl} from "umi";

const RoleFormFields: React.FC<{}> = () => {
  const intl = useIntl();

  return (
    <>
      <Form.Item
        name="name"
        label={intl.formatMessage({id: "pages.neat.role.name"})}
        rules={[
          {
            required: true,
            message: intl.formatMessage({id: "pages.neat.role.name.required"})
          }
        ]}
      >
        <Input id="form.name"/>
      </Form.Item>

      <Form.Item
        name="slug"
        label={intl.formatMessage({id: "pages.neat.role.slug"})}
        rules={[
          {
            required: true,
            message: intl.formatMessage({id: "pages.neat.role.slug.required"})
          }
        ]}
      >
        <Input id="form.slug"/>
      </Form.Item>

      <Form.Item
        name="remarks"
        label={intl.formatMessage({id: "pages.neat.role.remarks"})}
      >
        <Input/>
      </Form.Item>
    </>
  );
};

export default RoleFormFields;
