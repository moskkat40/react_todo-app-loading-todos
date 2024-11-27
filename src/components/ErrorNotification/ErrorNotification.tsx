import classNames from 'classnames';
import React from 'react';

type Props = {
  errorMessage: string;
  setErrorMessage: (a: string) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  {
    /* DON'T use conditional rendering to hide the notification */
  }

  {
    /* Add the 'hidden'  to hide the message smoothly */
  }

  function handleCloseNotification() {
    setErrorMessage('');
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        // eslint-disable-next-line prettier/prettier
        { hidden: !errorMessage },
      )}
    >
      <button
        onClick={handleCloseNotification}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {errorMessage}
      {/* show only one message at a time */}
      {/* Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
    </div>
  );
};
