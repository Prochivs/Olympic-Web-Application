import React, { lazy, Suspense, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import { UserContext } from '../../provider/UserProvider'


export const AppViews = () => {
  const { currentUser, userDetails } = useContext(UserContext)

  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>

        {!!currentUser ? (
          <Route
            path={`${APP_PREFIX_PATH}/`}
            component={lazy(() => import(`./super-admins`))}
            exact
          />
        ) : (
          <Redirect to="/auth/login" />
        )}


        <Route path={`${APP_PREFIX_PATH}/add-admins`} component={lazy(() => import(`./super-admins/user-management`))} />
        <Route path={`${APP_PREFIX_PATH}/add-event`} component={lazy(() => import(`./admins/admins_addevent`))} />
        <Route path={`${APP_PREFIX_PATH}/subscribers`} component={lazy(() => import(`./subscribers`))} />
        <Route path={`${APP_PREFIX_PATH}/stream-event`} component={lazy(() => import(`./subscribers/stream_game`))} />
        
        <Route path={`${APP_PREFIX_PATH}/event-edit`} component={lazy(() => import(`./super-admins/edit_event`))} />
    
        <Route
          path={`${APP_PREFIX_PATH}/edit_details/:id`}
          component={lazy(() => import(`./super-admins/edit_details`))}
        />
        <Route path={`${APP_PREFIX_PATH}/stream-event`} component={lazy(() => import(`./subscribers/stream_game`))} />
        <Route path={`${APP_PREFIX_PATH}/reset-password`} component={lazy(() => import(`../auth-views/authentication/reset-password`))} />
        <Route path={`${APP_PREFIX_PATH}/watch/:id`} component={lazy(() => import(`./subscribers/stream_game/watch`))} />




        <Route
          path={`${APP_PREFIX_PATH}/jobs`}
          component={lazy(() => import(`./jobs`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/job-details/:id`}
          component={lazy(() => import(`./jobs/job-details`))}
        />
         <Route
          path={`${APP_PREFIX_PATH}/add-job`}
          component={lazy(() => import(`./jobs/add-job`))}
        />


        {/* logs */}
        <Route
          path={`${APP_PREFIX_PATH}/logs`}
          component={lazy(() => import(`./logs`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/log-details/:id`}
          component={lazy(() => import(`./logs/log-details`))}
        />
         <Route
          path={`${APP_PREFIX_PATH}/add-log`}
          component={lazy(() => import(`./logs/add-log`))}
        />




         <Route path={`${APP_PREFIX_PATH}/subscriberList`} component={lazy(() => import(`./subscriberList`))} />

        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);