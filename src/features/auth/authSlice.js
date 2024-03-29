import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  authChecked: false,
  user: undefined,
  loginFormError: undefined,
  registerFormError: undefined,
};

export const getUser = createAsyncThunk('/user', () =>
  fetch('/api/auth/user').then((result) => result.json())
);

export const login = createAsyncThunk('/auth/login', async (credentials) => {
  if (!credentials.email.trim() || !credentials.password.trim()) {
    throw new Error('Не все поля заполнены');
  }

  const data = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  });


  if (data.status >= 400) {
    const { error } = await data.json();
    throw error;
  } else {
    return data.json();
  }
});

export const register = createAsyncThunk('/auth/register', async (credentials) => {
  if (credentials.password !== credentials.passwordRepeat) {
    throw new Error('Пароли не совпадают');
  }

  if (!credentials.firstName.trim() 
  || !credentials.lastName.trim()
  || !credentials.genderId
  || !credentials.birthday.trim()
  || !credentials.countryId
  || !credentials.email.trim()
  || !credentials.password.trim()
  || !credentials.passwordRepeat.trim()
   ) {
    throw new Error('Не все поля заполнены');
  }

  const data = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (data.status >= 400) {
    const { error } = await data.json();
    throw error;
  } else {
    return data.json();
  }
});

export const logout = createAsyncThunk('/logout', async () =>
  await fetch('/api/auth/logout').then((result) => result.json())
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetLoginFormError: (state) => {
      state.loginFormError = undefined;
    },
    resetRegisterFormError: (state) => {
      state.registerFormError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // проверяю есть ли залогиненный юзер
      .addCase(getUser.fulfilled, (state, action) => {
        state.authChecked = action.payload.isLoggedIn; // тут ключ для проверки есть ли на бэке залогиненный юзер
        state.user = action.payload.isLoggedIn ? action.payload.user : undefined; // тут если есть залогиненный юзер,
        // то я записываю в стейт объект user который прислано из бэка, если нету, то пишу в стейте undefined
      })

      .addCase(login.fulfilled, (state, action) => {
        state.authChecked = true;
        state.user = action.payload;
        state.loginFormError = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginFormError = action.error.message;
      })

      .addCase(logout.fulfilled, (state) => {
        state.authChecked = false;
        state.user = undefined;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.authChecked = true;
        state.user = action.payload;
        state.registerFormError = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerFormError = action.error.message;
      });
  },
});

export const { resetLoginFormError, resetRegisterFormError } = authSlice.actions;

export const selectAuthChecked = (state) => state.auth.authChecked;
export const selectUser = (state) => state.auth.user;
export const selectLoginFormError = (state) => state.auth.loginFormError;
export const selectRegisterFormError = (state) => state.auth.registerFormError;

export default authSlice.reducer;
