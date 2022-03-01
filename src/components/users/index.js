import React, { useEffect, useRef } from 'react';

const UsersComponent = () => {
  // const [data, setData] = useState();

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const getUsersAccounts = async () => {
      // const
    };

    getUsersAccounts();

    return () => (isMounted.current = false);
  }, []);

  return <div>sdfsdsdf</div>;
};

export default UsersComponent;
