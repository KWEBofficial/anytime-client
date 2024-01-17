import React, { createContext, useCallback, useContext, useState } from 'react';
import PromptModal from './Prompt/Team';
import { PromptProps } from './Prompt/Team';
import { OpenModal } from '../../types/modal';
import Alert from './Alert';
import { AlertProps } from './Alert';
import Confirm, { ConfirmProps } from './Confirm';
import SchedulePrompt, { SchedulePromptProps } from './Prompt/Schedule';

//IModalContext : context가 갖는 타입
interface IModalContext {
  openAlert: OpenModal<AlertProps>;
  openPrompt: OpenModal<PromptProps>;
  openConfirm: OpenModal<ConfirmProps>;
  openSchedulePrompt: OpenModal<SchedulePromptProps>;
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

  const {
    openModal: openSchedulePrompt,
    closeModal: closeSchedulePrompt,
    props: schedulePromptProps,
    visible: schedulePromptVisible,
  } = useDefaultModalLogic<SchedulePromptProps>();

  const modalContextValue: IModalContext = {
    openAlert,
    openPrompt,
    openConfirm,
    openSchedulePrompt,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {alertProps && <Alert {...alertProps} onClose={closeAlert} visible={alertVisible} />}
      {promptProps && <PromptModal {...promptProps} onClose={closePrompt} visible={promptVisible} />}
      {confirmProps && <Confirm {...confirmProps} onClose={closeConfirm} visible={confirmVisible} />}
      {schedulePromptProps && (
        <SchedulePrompt {...schedulePromptProps} onClose={closeSchedulePrompt} visible={schedulePromptVisible} />
      )}
      {children}
    </ModalContext.Provider>
  );
};
