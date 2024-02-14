import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import ErrorModal from "../../common/UIComponents/ErrorModal";
import LoadingSpinner from "../../common/UIComponents/LoadingSpinner";

import { useHttpClient } from "../../common/UIComponents/http-hook";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  useEffect(() => {
    const sendDataRequest = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/api/users"
        );
        // console.log(responseData);
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    sendDataRequest();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
