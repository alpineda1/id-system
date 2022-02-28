import ItemComponent, { useStyles } from 'components/users/components/item';
import VirtualListComponent from 'components/virtual-list';
import React, { useEffect, useRef, useState } from 'react';
import { CellMeasurerCache } from 'react-virtualized';
import LoadingComponent from './components/loading';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 232,
});

const UsersComponent = () => {
  const [data] = useState([]);
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(true);

  const classes = useStyles();

  useEffect(() => {
    isMounted.current = true;

    const getUsersData = async () => {
      setLoading(true);

      try {
        if (!isMounted.current) return;

        setLoading(false);
      } catch (e) {
        if (!isMounted.current) return;

        setLoading(false);
      }

      return () => (isMounted.current = false);
    };

    getUsersData();
  }, []);

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
