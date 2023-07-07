const ru = {
  translation: {
    page404: {
      pageNotFound: 'Страница не найдена',
      goTo: 'Но вы можете перейти на ',
      mainPage: 'Главную страницу',
    },

    signup: {
      header: 'Регистрация',
      nickname: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      alreadySignedUp: 'Уже есть аккаунт?',
      signup: 'Зарегистрироваться',
      signin: 'Войти',
      errors: {
        pswrdsMustMatch: 'Пароли должны совпадать',
        from3to20symbls: 'От 3 до 20 символов',
        noLessThan6symbls: 'Не менее 6 символов',
        userExists: 'Такой пользователь уже существует',
      },
    },

    login: {
      header: 'Войти',
      nickname: 'Ваш ник',
      password: 'Пароль',
      noAcc: 'Нет аккаунта?',
      signup: 'Регистрация',
      signin: 'Войти',
      errors: {
        wrongCredentials: 'Неверные имя пользователя или пароль',
      },
    },

    chat: {
      renameChannel: 'Переименовать',
      deleteChannel: 'Удалить',
      sendMsg: 'Отправить',
      modals: {
        renameChannel: 'Переименовать канал',
        deleteChannel: 'Удалить канал',
        areYouSure: 'Уверены?',
        channelName: 'Название канала',
        addChannel: 'Добавить канал',
        cancel: 'Отменить',
        delete: 'Удалить',
        send: 'Отправить',
      },
      toast: {
        channelDeleted: 'Канал удалён',
        channelCreated: 'Канал создан',
        channelRenamed: 'Канал переименован',
        loadError: 'Ошибка соединения',
      },
      messages_other: 'сообщений',
      messages_one: 'сообщение',
      messages_few: 'сообщения',
      messages_many: 'сообщений',
      enterMessage: 'Введите сообщение...',
      channelsHeader: 'Каналы',
      errors: {
        from3to20symbls: 'От 3 до 20 символов',
        uniqueChannel: 'Должно быть уникальным',
        socketError: 'Ошибка соединения'
      },

    },

    general: {
      appNameLogo: 'Hexlet Chat',
      logout: 'Выйти',
      errors: {
        requiredField: 'Обязательное поле',
        badNetwork: 'Ошибка сети, попробуйте еще раз',
      }
    },
    
  },
};

export default ru;
