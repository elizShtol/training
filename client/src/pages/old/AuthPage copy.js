import React, { useState, useEffect, useContext } from 'react'
import './style.css'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth=useContext(AuthContext)
    const { loading, error, clearError, request } = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        // console.log(error)
        message(error)
        clearError()

    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (error) { }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token,data.userId)
        } catch (error) { }
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card teal lighten-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>

                        <div className="input-field">
                            <input
                                className='yellow-input'
                                placeholder="Введите email"
                                name="email" type="email" autoComplete="off"
                                onChange={changeHandler} />

                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field">
                            <input
                                className='yellow-input'
                                placeholder="Введите пароль"
                                name="password" type="password"
                                onChange={changeHandler} />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn blue-grey darken-2 enter"
                            disabled={loading}
                            onClick={loginHandler}>
                            Войти
                        </button>
                        <button className="btn blue-grey darken-2"
                            onClick={registerHandler}
                            disabled={loading}>
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}