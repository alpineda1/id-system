import { Stack, Typography } from '@mui/material';
import ItemComponent, { useStyles } from 'components/history/components/item';
import VirtualListComponent from 'components/virtual-list';
import { db } from 'firebase.app';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import normalizeText from 'modules/functions/normalizeText';
import React, { useEffect, useRef, useState } from 'react';
import { CellMeasurerCache } from 'react-virtualized';
import FilterComponent from './components/filter';
import LoadingComponent from './components/loading';

const cache = new CellMeasurerCache({
  defaultHeight: 133,
});

const HistoryComponent = () => {
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
    .sort((a, b) =>
      a.createdAt.toDate() > b.createdAt.toDate()
        ? -1
        : a.createdAt.toDate() < b.createdAt.toDate()
        ? 1
        : 0,
    )
    .filter((d) => (filterDateFrom ? d.createdAt.toDate() > filterDateFrom : d))
    .filter((d) => (filterDateTo ? d.createdAt.toDate() < filterDateTo : d));

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
        <Typography variant='h6'>History List</Typography>

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

export default HistoryComponent;
