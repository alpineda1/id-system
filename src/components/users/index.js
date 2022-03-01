import { Stack, Typography } from '@mui/material';
import VirtualListComponent from 'components/virtual-list';
import { db } from 'firebase.app';
import { collection, doc, getDocs, orderBy, query } from 'firebase/firestore';
import normalizeText from 'modules/functions/normalizeText';
import React, { useEffect, useRef, useState } from 'react';
import { CellMeasurerCache } from 'react-virtualized';
import FilterComponent from './components/filter';
import ItemComponent, { useStyles } from './components/item';
import LoadingComponent from './components/loading';

const cache = new CellMeasurerCache({
  defaultHeight: 133,
});

const UsersComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterString, setFilterString] = useState('');
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterYear, setFilterYear] = useState([]);
  const [filterLevel, setFilterLevel] = useState([
    'College',
    'Senior High School',
  ]);
  const [filterDateFrom, setFilterDateFrom] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  );
  const [filterDateTo, setFilterDateTo] = useState(new Date());

  const isMounted = useRef(true);
  const filterTimeout = useRef(0);

  const classes = useStyles();

  useEffect(() => {
    isMounted.current = true;

    const getUsersAccounts = async () => {
      try {
        setLoading(true);
        setData([]);

        const queryRef = query(collection(db, 'users'));
        const querySnapshot = await getDocs(queryRef);

        querySnapshot.docs.forEach(async (d) => {
          const userDocumentRef = doc(db, 'users', d.id);
          const userQueryRef = query(
            collection(userDocumentRef, 'accounts'),
            orderBy('createdAt'),
          );
          const userQuerySnapshot = await getDocs(userQueryRef);

          setData((prevData) => [
            ...prevData,
            ...userQuerySnapshot.docs.map((dd) => ({
              id: dd.id,
              uid: d.id,
              ...dd.data(),
              ...d.data(),
            })),
          ]);
        });

        setLoading(false);
      } catch (e) {
        if (!isMounted.current) return;

        setLoading(false);
      }
    };

    getUsersAccounts();

    return () => (isMounted.current = false);
  }, []);

  const handleFilterChange = (e) => {
    if (filterTimeout.current) {
      clearTimeout(filterTimeout.current);
      setFilterLoading(true);
    }

    filterTimeout.current = setTimeout(() => {
      setFilterString(e.target.value);
      setFilterLoading(false);
    }, 350);
  };

  const handleYearChange = (e) => {
    const { value } = e?.target;
    setFilterYear(typeof value === 'string' ? value.split(',') : value);
  };

  const handleLevelChange = (e) => {
    const { value } = e?.target;
    setFilterLevel(typeof value === 'string' ? value.split(',') : value);
  };

  const handleDateFromChange = (e) => {
    setFilterDateFrom(e);
  };

  const handleDateToChange = (e) => {
    setFilterDateTo(e);
  };

  const filteredData = data
    .filter((d) => !d.roles.includes('admin'))
    .filter((d) =>
      filterString
        ? normalizeText(d?.name?.first).includes(normalizeText(filterString)) ||
          normalizeText(d?.name?.last).includes(normalizeText(filterString)) ||
          normalizeText(d?.idNumber).includes(normalizeText(filterString))
        : d,
    )
    .filter((d) =>
      filterYear.length > 0 ? filterYear.includes(d.idNumber.split('-')[0]) : d,
    )
    .filter((d) => filterLevel.includes(d?.level))
    .filter((d) => (filterDateFrom ? d.createdAt.toDate() > filterDateFrom : d))
    .filter((d) => (filterDateTo ? d.createdAt.toDate() < filterDateTo : d))
    .sort((a, b) =>
      a?.name?.last > b?.name?.last
        ? 1
        : a?.name?.last < b?.name?.last
        ? -1
        : 0,
    );

  return (
    <Stack spacing={4} sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Typography variant='h6'>Filter Options</Typography>

        <FilterComponent
          functions={{
            handleFilterChange,
            handleYearChange,
            handleLevelChange,
            handleDateFromChange,
            handleDateToChange,
          }}
          variables={{
            filterLoading,
            filterYear,
            filterLevel,
            filterDateFrom,
            filterDateTo,
          }}
        />
      </Stack>

      <Stack spacing={2}>
        <Typography variant='h6'>Students Account List</Typography>

        <div className={classes.itemMainContainer}>
          <VirtualListComponent
            cache={cache}
            data={filteredData}
            loading={loading}
            Component={ItemComponent}
            LoadingComponent={LoadingComponent}
            classes={classes}
          />
        </div>
      </Stack>
    </Stack>
  );
};

export default UsersComponent;
