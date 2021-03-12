import React, {useEffect, useState} from 'react';
import {Form, Input, message, Select, Upload} from 'antd';
import {Role} from '@/pages/Neat/Role/data';
import {useModel} from '@@/plugin-model/useModel';
import {LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import {getAccessToken} from "@/utils/acessToken";
import {RcFile, UploadChangeParam} from "antd/lib/upload/interface";
import {FormattedMessage, useIntl} from "umi";
import {FormInstance} from "antd/lib/form/hooks/useForm";

const {Option} = Select;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList[0].response && e.fileList[0].response.path;
};

function getBase64(img: Blob, callback: (imgUrl: string | ArrayBuffer | null) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

interface FormProps {
  initialValues?: any
  form?: FormInstance;
}

const UserFormFields: React.FC<FormProps> = (props) => {
  const {allRoles} = useModel('Role');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>('');
  const [fileList, setFileList] = useState<any[]>([]);
  const intl = useIntl();
  const {form} = props;

  useEffect(() => {
    setImageUrl(props?.initialValues?.avatar);
  }, [props])


  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <UploadOutlined/>}
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error(intl.formatMessage({id: "pages.neat.user.avatar.illegal_type"}));
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(intl.formatMessage({id: "pages.neat.user.avatar.illegal_size"}));
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done' && info.file.originFileObj) {
      getBase64(info.file.originFileObj, (url: string | ArrayBuffer | null) => {
          setImageUrl(url);
          setLoading(false);
        }
      );
    }
    setFileList(info.fileList);
  };

  return (
    <>
      <Form.Item
        name="username"
        label={<FormattedMessage id="pages.neat.user.username"/>}
        rules={[
          {
            required: true,
            message: intl.formatMessage({id: "pages.neat.user.username.required"})
          }
        ]}
      >
        <Input id="form.username"/>
      </Form.Item>
      <Form.Item
        name="nickname"
        label={<FormattedMessage id="pages.neat.user.nickname"/>}
      >
        <Input id="form.nickname"/>
      </Form.Item>

      {props.initialValues ?
        <>
          <Form.Item
            name="password"
            label={<FormattedMessage id="pages.neat.user.password"/>}
            rules={[]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            label={<FormattedMessage id="pages.neat.user.password_confirmation"/>}
            rules={[
              {
                validator: (rules, value, callback) => {
                  let password = form.getFieldValue('password');
                  if (password && password !== value) {
                    callback(intl.formatMessage({id: "pages.neat.user.password_confirmation.same"}));
                  } else {
                    callback();
                  }
                }
              }
            ]}
          >
            <Input.Password/>
          </Form.Item>
        </>
        :
        <>
          <Form.Item
            name="password"
            label={<FormattedMessage id="pages.neat.user.password"/>}
            rules={[
              {
                required: true,
                message: intl.formatMessage({id: "pages.neat.user.password.required"})
              }
            ]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            label={<FormattedMessage id="pages.neat.user.password_confirmation"/>}
            rules={[
              {
                required: true,
                message: intl.formatMessage({id: "pages.neat.user.password_confirmation.required"})
              }, {
                validator: (rules, value, callback) => {
                  let password = form.getFieldValue('password');
                  if (password && password !== value) {
                    callback(intl.formatMessage({id: "pages.neat.user.password_confirmation.same"}));
                  } else {
                    callback();
                  }
                }
              }
            ]}
          >
            <Input.Password/>
          </Form.Item>
        </>
      }

      <Form.Item
        name="roles_id"
        label={<FormattedMessage id="pages.neat.user.role"/>}
      >
        <Select mode="multiple" allowClear placeholder="Please select roles">
          {allRoles.map((role: Role) => {
            return (
              <Option key={role.id} value={role.id}>
                {role.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="avatar"
        label={<FormattedMessage id="pages.neat.user.avatar"/>}
        getValueFromEvent={normFile}
      >
        <Upload
          name="file"
          fileList={fileList}
          headers={{
            'Accept': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`,
          }}
          action="/api/admin/files"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          maxCount={1}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
        </Upload>
      </Form.Item>
    </>
  );
}

export default UserFormFields;
