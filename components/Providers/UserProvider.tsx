import React, {useEffect, useState} from "react";
import {getUserData, initialUserData, setUserData} from "../../utils/localStorage/UserData"
import * as api from "../../utils/User"
import {defaultValueFailure} from "../../types/Result";

export type AnonymousUser = {
  status: "Anonymous"
}
export type NormalUser = {
  status: "Authenticated",
  username: string,
}
export type AdminUser = {
  status: "Admin",
  username: string
}
export type StaffUser = {
  status: "Staff",
  username: string
}

export type AuthenticatedUser = NormalUser | AdminUser | StaffUser
export type User = AnonymousUser | AuthenticatedUser

type UserContextValue = {
  user: User,
  login: (username: string, password: string) => Promise<api.LoginResult>,
  logout: () => Promise<api.LogoutResult>,
  signUp: (username: string, password1: string, password2: string) => Promise<api.SignUpResult>,
  resetPassword: (username: string, oldPassword: string, newPassword1: string, newPassword2: string) => Promise<api.ResetPasswordResult>
}

const defaultUserContextValue = {
  user: {status: "Anonymous"} as AnonymousUser,
  login: async () => {
    return defaultValueFailure
  },
  logout: async () => {
    return defaultValueFailure
  },
  signUp: async () => {
    return defaultValueFailure
  },
  resetPassword: async () => {
    return defaultValueFailure
  }
}

export const UserContext = React.createContext<UserContextValue>(defaultUserContextValue)

export const UserProvider: React.FC = (props) => {
  const [user, setUser] = useState<User>({status: "Anonymous"})

  const verifyStatus = async () => {
    const username = getUserData(initialUserData).username
    const result = await api.isLoggedIn()
    if (result.status === "success" && result.isLoggedIn) {
      let user: User
      if (result.isAdmin) user = {status: "Admin", username}
      else if (result.isStaff) user = {status: "Staff", username}
      else user = {status: "Authenticated", username}
      setUser(user)
    }
  }
  useEffect(() => {
    verifyStatus()
  }, [])

  const login = async (username: string, password: string) => {
    const result = await api.login(username, password)
    if (result.status === "success") {
      let user: User
      if (result.isAdmin) user = {status: "Admin", username}
      else if (result.isStaff) user = {status: "Staff", username}
      else user = {status: "Authenticated", username}

      setUser(user)
      setUserData({username: username})
    }
    return result
  }

  const logout = async () => {
    return api.logout()
      .then(result => {
        setUser({
          status: "Anonymous"
        })
        setUserData(initialUserData)
        return result
      })
      .catch(err => {
        setUser({
          status: "Anonymous"
        })
        setUserData(initialUserData)
        console.log(err)
        return {
          status: "failure",
          reason: "unknown reason",
        } as api.LogoutResult
      })
  }
  const signUp = async (username: string, password1: string, password2: string) => {
    return api.signUp(username, password1, password2)
      .then(result => {
        if (result.status === "success"){
          setUser({
            status: "Authenticated",
            username: username
          })
          setUserData({username: username})
        }
        return result
      })
  }
  const resetPassword = async (username: string, oldPassword: string, newPassword1: string, newPassword2: string) => {
    return api.resetPassword(username, oldPassword, newPassword1, newPassword2)
      .then(result => {
        return result
      })
  }
  return <UserContext.Provider value={{user, login, logout, signUp, resetPassword}}>
    {props.children}
  </UserContext.Provider>
}
