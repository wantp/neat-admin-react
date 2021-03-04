import React, {useEffect} from 'react';
import {Form, Modal} from 'antd';
import {FormProps} from 'antd/lib/form';

interface Props {
  title?: string;
  visible: boolean;
  onFinish: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
  formProps?: FormProps;
}

const ModalForm: React.FC<Props> = props => {
  const {title, visible, onFinish, onCancel, initialValues, formProps} = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const onModalOk = () => {
    form.submit();
  };

  return <Modal
    title={title}
    visible={visible}
    onOk={onModalOk}
    onCancel={onCancel}
    destroyOnClose
    forceRender
  >
    <Form initialValues={initialValues} form={form} onFinish={onFinish} {...formProps}>
      {
        React.Children.map(props.children, (child: any) => {
          return React.cloneElement(child, {
            form: form,
            initialValues: initialValues,
          })
        })
      }
    </Form>
  </Modal>;
};

ModalForm.defaultProps = {
  title: '',
  formProps: {
    layout: 'horizontal',
    labelCol: {span: 4},
    wrapperCol: {span: 18},
  },
};

export default ModalForm;
