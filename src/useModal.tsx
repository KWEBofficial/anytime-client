import React, { createContext, useCallback, useContext, useState } from 'react';
import PromptModal from './components/modals/Prompt';
import { PromptProps } from './components/modals/Prompt';
import { OpenModal } from './types/modal';
import Alert from './components/modals/Alert';
import { AlertProps } from './components/modals/Alert';
import Confirm, { ConfirmProps } from './components/modals/Confirm';

//IModalContext : context가 갖는 타입
interface IModalContext {
  openAlert: OpenModal<AlertProps>;
  openPrompt: OpenModal<PromptProps>;
  openConfirm: OpenModal<ConfirmProps>;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

//useDefaultModalLogic : 모달을 열고 닫는 기본적인 로직 제공
const useDefaultModalLogic = <T extends unknown>() => {
  const [visible, setVisible] = useState(false);
  const [props, setProps] = useState<T | undefined>();

  const openModal = useCallback((props?: T) => {
    setProps(props);
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setProps(undefined);
    setVisible(false);
  }, []);

  return {
    visible,
    props,
    openModal,
    closeModal,
  };
};

//useModal : 모달 커스텀 훅
export const useModal = () => useContext(ModalContext);

export const ModalContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const {
    openModal: openAlert,
    closeModal: closeAlert,
    props: alertProps,
    visible: alertVisible,
  } = useDefaultModalLogic<AlertProps>();

  const {
    openModal: openPrompt,
    closeModal: closePrompt,
    visible: promptVisible,
    props: promptProps,
  } = useDefaultModalLogic<PromptProps>();

  const {
    openModal: openConfirm,
    closeModal: closeConfirm,
    props: confirmProps,
    visible: confirmVisible,
  } = useDefaultModalLogic<ConfirmProps>();

  const modalContextValue: IModalContext = {
    openAlert,
    openPrompt,
    openConfirm,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {alertProps && <Alert {...alertProps} onClose={closeAlert} visible={alertVisible} />}
      {promptProps && <PromptModal {...promptProps} onClose={closePrompt} visible={promptVisible} />}
      {confirmProps && <Confirm {...confirmProps} onClose={closeConfirm} visible={confirmVisible} />}
      {children}
    </ModalContext.Provider>
  );
};
