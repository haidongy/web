import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

class CustomizedForm extends Component{
    constructor(props){
        super(props);
        this.state={ };
    }
    render(){
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="horizontal">
                    <FormItem label="来源" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('loanName', {
                            rules: [{ required: true, message: '请输入来源！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="总期数" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('total', {
                            rules: [{ required: true, message: '请输入总期数！' }],
                        })(
                            <InputNumber min={0} max={100} step={1} />
                        )}
                    </FormItem>
                    <FormItem label="结清期数" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('current', {
                            rules: [{ required: true, message: '请输入总期数！' }],
                        })(
                            <InputNumber min={0} max={100} step={1} />
                        )}
                    </FormItem>
                    <FormItem label="剩余期数" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('remainder', {
                            rules: [{ required: true, message: '请输入总期数！' }],
                        })(
                            <InputNumber min={0} max={100} step={1} />
                        )}
                    </FormItem>
                    <FormItem label="总金额" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('totalSum', {
                            rules: [{ required: true, message: '请输入总期数！' }],
                        })(
                            <InputNumber min={0} max={500000} step={1} />
                        )}
                    </FormItem>
                    <FormItem label="结清金额" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('currentSum', {
                            rules: [{ required: true, message: '请输入总期数！' }],
                        })(
                            <InputNumber min={0} max={500000} step={1} />
                        )}
                    </FormItem>
                    <FormItem label="剩余金额" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('remainderSum', {
                            rules: [{ required: true, message: '请输入总期数！' }],
                        })(
                            <InputNumber min={0} max={500000} step={1} />
                        )}
                    </FormItem>
                    
                </Form>
            </Modal>
        );
    }
}

const CollectionCreateForm = Form.create()(CustomizedForm);
export default CollectionCreateForm;