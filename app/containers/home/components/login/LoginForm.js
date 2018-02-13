/**
 * Created by vijay on 2018/2/13.
 */
import React, {Component} from 'react';
import {Input, Form, Icon, Button} from 'antd';
import style from './style.css';

const FormItem = Form.Item;

class LoginFormCom extends Component {
    constructor(props) {
        super(props);
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.username, values.password);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        console.log('LoginForm, this.props: ', this.props);
        return (
            <Form onSubmit={this.handleLogin} className={style.formStyle}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required:true, message: '请输入密码！'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button className={style.loginButton} type="primary" htmlType="submit" >
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }

}

const LoginForm = Form.create()(LoginFormCom);

export default LoginForm;