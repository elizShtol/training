import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { TrainingPage } from './pages/TrainingPage'
import { AuthPage } from './pages/AuthPage'


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/training" exact>
                    <TrainingPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id" >
                    <DetailPage />
                </Route>
                <Redirect to="/training" />
            </Switch>)
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>

    )

}