import React from 'react'
import { useAuth } from './useAuth';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Auth: React.FC = () => {
    const { loading, handleLogin } = useAuth();

    return (
        <div className="login-container">
            <Card className="login-card">
                <div className="login-header">
                    <h1>SPLOSE Clone</h1>
                    <h2>You are logging into</h2>
                    <h2>wcp-1.splose.com</h2>
                </div>

                <Form
                    name="login"
                    onFinish={handleLogin}
                    autoComplete="off"
                    layout="vertical"
                    className="login-form"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            block
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Auth;