import ItemComponent, { useStyles } from 'components/users/components/item';
import VirtualListComponent from 'components/virtual-list';
import { db } from 'firebase.app';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { CellMeasurerCache } from 'react-virtualized';
import LoadingComponent from './components/loading';

const cache = new CellMeasurerCache({
  // fixedWidth: false,
  defaultHeight: 133,
});

const UsersComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(true);

  const classes = useStyles();

  useEffect(() => {
    isMounted.current = true;

    const getUsersData = async () => {
      setLoading(true);

      try {
        const queryRef = query(collection(db, 'history'), orderBy('createdAt'));
        const querySnapshot = await getDocs(queryRef);

        if (!isMounted.current) return;

        setLoading(false);
        setData(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
      } catch (e) {
        if (!isMounted.current) return;

        setLoading(false);
      }

      return () => (isMounted.current = false);
    };

    getUsersData();
  }, []);

  console.log(cache);

  return (
    <div className={classes.itemMainContainer}>
      <VirtualListComponent
        cache={cache}
        data={data}
        loading={loading}
        Component={ItemComponent}
        LoadingComponent={LoadingComponent}
        classes={classes}
      />
    </div>
  );
};

export default UsersComponent;
