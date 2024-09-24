import { createContext, useContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();
import React from "react";
import { clientAxios } from "../api/ClientAxios";
import AuthReducer from "../reducers/AuthReducer";
import { FormContext } from "./FormContext";
import { TYPES } from "../actions/AuthActions";

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

  const { formData } = useContext(FormContext);

  const [state, dispatch] = useReducer(AuthReducer, initialValues);

  const login = async (email, password) => {
    dispatch({
      type: TYPES.LOADING,
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
        let status = {};
        if (
          !dataUser.userFound.infoCompletedFlag &&
          dataUser.userFound.role === "transport"
        ) {
          const { data } = await clientAxios.get("user/verifyFields");
          status = data.transportInfoStatus;
        }
        dispatch({
          type: TYPES.LOGIN,
          payload: {
            user: {
              id: dataUser.userFound._id,
              email: dataUser.userFound.email,
              role: dataUser.userFound.role,
              infoCompletedFlag: dataUser.userFound.infoCompletedFlag,
              given_name: dataUser.userFound.given_name,
              family_name: dataUser.userFound.family_name,
              authorizedTransport: dataUser.userFound.authorizedTransport,
              accountSuspended: dataUser.userFound.accountSuspended,
              expoPushNotification: dataUser.userFound.expoPushNotification,
              validatedMail: dataUser.userFound.validatedMail,
              transportInfo: status,
            },
            isLogged: true,
            token: dataToken.token,
          },
        });
      }
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: TYPES.LOGOUT,
        payload: {
          message: error.response.data.message || "Login failed !",
          type: "Error",
        },
      });
    }
  };

  const checkToken = async () => {
    dispatch({
      type: TYPES.LOADING,
      payload: { isLoading: true },
    });
    const token = await AsyncStorage.getItem("jwtoken");
    if (!token) {
      dispatch({
        type: TYPES.LOGOUT,
      });
    } else {
      try {
        const { data: dataUser } = await clientAxios.get("/user/dataUser");
        if (dataUser) {
          let status = {};
          if (
            !dataUser.userFound.infoCompletedFlag &&
            dataUser.userFound.role === "transport"
          ) {
            const { data } = await clientAxios.get("user/verifyFields");
            status = data.transportInfoStatus;
          }
          dispatch({
            type: TYPES.LOGIN,
            payload: {
              user: {
                id: dataUser.userFound._id,
                email: dataUser.userFound.email,
                role: dataUser.userFound.role,
                infoCompletedFlag: dataUser.userFound.infoCompletedFlag,
                given_name: dataUser.userFound.given_name,
                family_name: dataUser.userFound.family_name,
                authorizedTransport: dataUser.userFound.authorizedTransport,
                accountSuspended: dataUser.userFound.accountSuspended,
                expoPushNotification: dataUser.userFound.expoPushNotification,
                validatedMail: dataUser.userFound.validatedMail,
                transportInfo: status,
              },
              isLogged: true,
              token: token,
            },
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: TYPES.LOGOUT,
          payload: {
            message: error.response.data.message || "Login failed !",
            type: "Error",
          },
        });
      }
    }
  };

  const logout = () => {
    AsyncStorage.removeItem("jwtoken");
    dispatch({
      type: TYPES.LOGOUT,
      payload: {
        message: "Logout success",
        type: "Success",
      },
    });
  };

  const register = async () => {
    dispatch({
      type: "LOADING",
      payload: { isLoading: true },
    });
    try {
      const { data } = await clientAxios.post("/user/register", formData);
      if (data.message === "User successfully created.") {
        login(formData.email, formData.password);
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: TYPES.LOGOUT,
        payload: {
          message: error.response.data.errors[0].msg || "Register failed !",
          type: "Error",
        },
      });
    }
  };

  const uploadFields = async () => {
    dispatch({
      type: TYPES.LOADING,
      payload: { isLoading: true },
    });
    try {
      const { data } = await clientAxios.patch(
        "/user/updateFields",
        formData.transportInfo
      );
      dispatch({
        type: TYPES.UPDATE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = (load) => {
    dispatch({
      type: TYPES.CHANGESTATUS,
      payload: load,
    });
  };

  const addCancellation = async (cancellationinfo) => {
    try {
      const { data } = await clientAxios.patch(
        "/user/addCancelation/" + state.user.id,
        cancellationinfo
      );
      if (data) {
        dispatch({
          type: TYPES.ADDCANCELATION,
          payload: { cancellationinfo, suspension: data.suspension },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateExpoPushToken = async (newExpoPushToken) => {
    if (newExpoPushToken && state?.user?.id) {
      try {
        const { data } = await clientAxios.patch(
          "/user/updateExpoPushToken/" + state.user.id,
          { newExpoPushToken }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const generateNewValidationCode = async (email) => {
    try {
      const userId = state?.user?.id;
      let url = "/user/generateNewValidationCode";
      if (userId) {
        url += `/${userId}`;
      }
      const payload = email ? { email } : {};

      const { data } = await clientAxios.patch(url, payload);
    } catch (error) {
      console.log(error);
    }
  };

  const validateMail = async (verificationCode) => {
    try {
      const { data: dataUser } = await clientAxios.patch(
        "/user/validateMail/" + state.user.id,
        { verificationCode }
      );
      if (dataUser) {
        checkToken();
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: TYPES.UPDATEMESSAGE,
        payload: {
          message: {
            message: error.response.data.message || "Invalid code !",
            type: "Error",
          },
        },
      });
    }
  };

  const updateMessage = (message, type) => {
    dispatch({
      type: TYPES.UPDATEMESSAGE,
      payload: {
        message: {
          message: message || null,
          type: type || null,
        },
      },
    });
  };

  const checkValidationCode = async (email, verificationCode) => {
    try {
      const userId = state?.user?.id;
      let url = "/user/checkValidationCode";
      if (userId) {
        url += `/${userId}`;
      }
      const payload = email
        ? { email, verificationCode }
        : { verificationCode };

      const { data } = await clientAxios.patch(url, payload);
      if (data?.message === "Code verified succesfully.") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: TYPES.UPDATEMESSAGE,
        payload: {
          message: {
            message: error.response.data.message || "Invalid code !",
            type: "Error",
          },
        },
      });
      return false;
    }
  };

  const updatePass = async (email, verificationCode, password) => {
    try {
      const userId = state?.user?.id;
      let url = "/user/updatePass";
      if (userId) {
        url += `/${userId}`;
      }
      const payload = email
        ? { email, verificationCode, password }
        : { verificationCode, password };

      const { data } = await clientAxios.patch(url, payload);
      if (data.message === "password updated successfully.") {
        login(email, password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        checkToken,
        register,
        uploadFields,
        changeStatus,
        addCancellation,
        updateExpoPushToken,
        validateMail,
        updateMessage,
        generateNewValidationCode,
        checkValidationCode,
        updatePass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
