interface TelegramWebAppUser {
    id: number;
    is_bot?: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  }
  
  interface TelegramWebAppInitData {
    user?: TelegramWebAppUser;
    chat_instance?: string;
    chat_type?: string;
    start_param?: string;
  }
  
  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: TelegramWebAppInitData;
    ready(): void;
    expand(): void;
    close(): void;
  }
  
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }