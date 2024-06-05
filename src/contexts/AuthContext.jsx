import { createContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();

import React from "react";
import { clientAxios } from "../api/ClientAxios";
import AuthReducer from "../reducers/AuthReducer";

const AuthProvider = ({ children }) => {
  const initialValues = {
    user: {},
    isLogged: false,
    token: "",
    isLoading: false,
    message: {
      message: null,
      type: null,
    },
  };

  const [state, dispatch] = useReducer(AuthReducer, initialValues);

  const login = async (email, password) => {
    dispatch({
      type: "LOADING",
      payload: { isLoading: true },
    });
    console.log(email, password);

    try {
      const { data: dataToken } = await clientAxios.post("/user/login", {
        email,
        password,
      });
      if (dataToken) {
        await AsyncStorage.setItem("jwtoken", dataToken.token);
      }
      const { data: dataUser } = await clientAxios.get("/user/dataUser");
      if (dataUser) {
        dispatch({
          type: "LOGIN",
          payload: {
            user: {
              id: dataUser.userFound._id,
              email: dataUser.userFound.email,
              role: dataUser.userFound.role,
            },
            isLogged: true,
            token: dataToken.token,
            message: "User Logged successfully",
          },
        });
      }
    } catch (error) {
      dispatch({
        type: "LOGOUT",
        payload: {
          message: "Logout",
        },
      });
      console.log("Este", error);
    }
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("jwtoken");
    if (!token) {
      dispatch({
        type: "LOGOUT",
        payload: {
          message: "Logout",
        },
      });
    } else {
      try {
        const { data: dataUser } = await clientAxios.get("/user/userData");
        console.log(dataUser);
        if (dataUser) {
          dispatch({
            type: "LOGIN",
            payload: {
              user: {
                id: dataUser.userFound._id,
                name: dataUser.userFound.email,
                role: dataUser.userFound.role,
              },
              isLogged: true,
              token: token,
              message: "User Logged successfully",
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtoken");
    dispatch({
      type: "LOGOUT",
      payload: {
        message: "Logout success",
      },
    });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
