import React, {useEffect} from 'react';
import {Button, Drawer, Form} from 'antd';
import {FormProps} from 'antd/lib/form';

interface Props {
  title?: string;
  width?: number;
  visible: boolean;
  onFinish: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
  formProps?: FormProps;
}

const DrawerForm: React.FC<Props> = (props) => {
  const {title, width, visible, onFinish, onCancel, initialValues, formProps} = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  const onDrawerOk = () => {
    form.submit();
  };

  return (
    <Drawer
      title={title}
      width={width}
      onClose={onCancel}
      visible={visible}
      bodyStyle={{paddingBottom: 80}}
      footer={
        <div
          style={{textAlign: 'right'}}
        >
          <Button onClick={onCancel} style={{marginRight: 8}}>
            取消
          </Button>
          <Button onClick={onDrawerOk} type="primary">
            保存
          </Button>
        </div>
      }
    >
      <Form initialValues={initialValues} form={form} onFinish={onFinish} {...formProps}>
        {props.children}
      </Form>
    </Drawer>
  );
};

DrawerForm.defaultProps = {
  title: '',
  width: 720,
  formProps: {
    layout: 'horizontal',
    labelCol: {span: 4},
    wrapperCol: {span: 18},
  },
};

export default DrawerForm;
