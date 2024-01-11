import React, { createContext, useCallback, useContext, useState } from 'react';
import PostUploadModal, { PostUploadModalProps } from './components/modals/PostUploadModal';
import { OpenModal } from './types/modal';
import Alert from './components/modals/Alert';
import { AlertProps } from './components/modals/Alert';

//IModalContext : context가 갖는 타입
interface IModalContext {
  openAlert: OpenModal<AlertProps>;
  openPostUploadModal: OpenModal<PostUploadModalProps>;
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
    openModal: openPostUploadModal,
    closeModal: closePostUploadModal,
    visible: postUploadModalVisible,
    props: postUploadModalProps,
  } = useDefaultModalLogic<PostUploadModalProps>();

  const modalContextValue: IModalContext = {
    openAlert,
    openPostUploadModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {alertProps && <Alert {...alertProps} onClose={closeAlert} visible={alertVisible} />}
      {postUploadModalProps && (
        <PostUploadModal {...postUploadModalProps} onClose={closePostUploadModal} visible={postUploadModalVisible} />
      )}
      {children}
    </ModalContext.Provider>
  );
};
