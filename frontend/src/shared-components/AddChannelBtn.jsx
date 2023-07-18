// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UniversalModal from './UniversalModal';
import { actions as modalsActions } from '../slices/modalsSlices';

const AddChannelButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const modalState = useSelector((state) => state.modals);

  const addChannelModalConfig = {
    title: t('chat.modals.addChannel'),
    actionButton: t('chat.modals.send'),
    actionVariant: 'primary',
    fieldsShow: true,
    modalType: 'create',
  };

  const openAddChannelModal = () => {
    dispatch(modalsActions.showModal(addChannelModalConfig));
  };

  return (
    <>
      <button
        onClick={() => openAddChannelModal()}
        type="button"
        className="p-0 text-primary btn btn-group-vertical"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
          height="20"
          fillRule="currentColor"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        <span className="visually-hidden">+</span>
      </button>

      <UniversalModal
        show={modalState.isOpened}
        onHide={() => dispatch(modalsActions.closeModal(modalState))}
      />
    </>
  );
};

export default AddChannelButton;
