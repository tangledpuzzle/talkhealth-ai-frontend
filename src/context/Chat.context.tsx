import React from "react";
import config from "../config/config.json";
interface ChatState {
  isAiTyping: boolean;
  messageLoading: boolean;
  data: ChatType[];
  prompts: string[];
}

interface ChatAction {
  type:
  | "ADD_USER_MESSAGE"
  | "ADD_AI_MESSAGE"
  | "UPDATE_USER_MESSAGE"
  | "STOP_AI_TYPING"
  | "START_AI_TYPING"
  | "ADD_PROMPTS"
  | "SET_INITIAL_MESSAGE";
  payload: ChatType | ChatType[];
  threadId: string;
}

interface ChatProviderProps {
  children: React.ReactNode;
}

interface ChatType {
  type: "user" | "ai" | "prompts";
  message: string;
  image: string | null;
  file: string | null;
}

const initialState: ChatState = {
  isAiTyping: false,
  messageLoading: false,
  data: [
    {
      type: "ai",
      message: config.initChat,
      image: null,
      file: null,
    },
  ],
  prompts: config.initprompts.split("; "),
};

const reducer = (state: ChatState, action: ChatAction): ChatState => {
  let thread = localStorage.getItem('threadId') || undefined;
  try {
    switch (action.type) {
      case "STOP_AI_TYPING":
        if (action.threadId === thread) {
          return {
            ...state,
            isAiTyping: false,
            messageLoading: false,
          };
        } else {
          return state;
        }
      case "START_AI_TYPING":
        if (action.threadId === thread) {
          return {
            ...state,
            isAiTyping: true,
            messageLoading: true,
            data: [
              ...state.data,
              { type: "ai", message: "", image: null, file: null },
            ],
          };
        } else {
          return state;
        }
      case "ADD_PROMPTS":
        if (action.threadId === thread) {
          if (Array.isArray(action.payload)) {
            // handle the array case
          } else {
            return {
              ...state,
              prompts: action.payload.message
                .split("; ").slice(0, 4)
                .map((prompt) => prompt.trim().replaceAll('"', "")),
            };
          }
        } else {
          return state;
        }
      case "ADD_AI_MESSAGE":
        if (action.threadId === thread) {
          const lastMessage = state.data[state.data.length - 1];
          if (lastMessage.type === "ai") {
            const arrWithouthLastMessage = state.data?.slice(0, -1);
            return {
              ...state,
              data: [
                ...arrWithouthLastMessage,
                {
                  ...lastMessage,
                  message: lastMessage.message + (Array.isArray(action.payload) ? "" : action.payload.message),
                },
              ],
              isAiTyping: true,
              messageLoading: false,
            };
          }
        } else {
          return state;
        }
      case "ADD_USER_MESSAGE":
          return {
            ...state,
            isAiTyping: true,
            data: Array.isArray(action.payload) ? [...state.data, ...action.payload] : [...state.data, action.payload],
          };
      case "SET_INITIAL_MESSAGE":
        localStorage.setItem("threadId", action.threadId)
        return {
          ...state,
          isAiTyping: false,
          messageLoading: false,
          data: action.payload as ChatType[],    // action.payload would be an array of ChatType
        };
      default:
        return state;
    }
  } catch (error) {
    return state;
  }
};

export const ChatContext = React.createContext<{
  state: ChatState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: (action: ChatAction) => null,
});

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => React.useContext(ChatContext);
