/**
 * Created by vijay on 2018/2/22.
 */
import React, {Component} from 'react';
import {Input, Form, Icon, Button} from 'antd';
import style from "./style.css";

const FormItem = Form.Item;

class RegisterFormCom extends Component {
    constructor(props) {
        super(props);
    }

    handleRegister = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.register(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleRegister} className={style.formStyle}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名！'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码！'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('passwordRe', {
                            rules: [{required: true, message: '请输入重复密码！'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}} />} type="password" placeholder="重复密码" />
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button className={style.loginButton} type="primary" htmlType="submit">
                        注册
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const RegisterForm = Form.create()(RegisterFormCom);

export default RegisterForm;
