import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef } from 'react';
import { AutoSizer, List, WindowScroller } from 'react-virtualized';
import CacheMeasurerComponent from './components/cache-measurer';

const useStyles = makeStyles((theme) => ({
  windowScroller: {
    width: '100%',
  },
}));

const refreshCache = (cache) => {
  if (cache) cache.clearAll();
};

const VirtualListComponent = ({
  cache,
  data,
  classes,
  loading,
  Component,
  LoadingComponent,
}) => {
  const listRef = useRef(null);

  const localClasses = useStyles();

  useEffect(() => {
    window.addEventListener('resize', () => refreshCache(cache));

    return () => {
      window.removeEventListener('resize', () => refreshCache(cache));
    };
  }, [cache]);

  return loading || (data && data.length <= 0) ? (
    <LoadingComponent />
  ) : (
    <WindowScroller className={localClasses.windowScroller}>
      {({ height, registerChild, isScrolling, scrollTop }) => (
        <AutoSizer>
          {({ width }) => (
            <div ref={registerChild}>
              <List
                classes={classes}
                Item={Component}
                autoHeight
                cache={cache}
                data={data}
                deferredMeasurementCache={cache}
                height={height}
                isScrolling={isScrolling}
                ref={listRef}
                scrollTop={scrollTop}
                width={width}
                rowCount={data.length}
                rowHeight={cache.rowHeight}
                overscanRowCount={5}
                rowRenderer={CacheMeasurerComponent}
              />
            </div>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export default VirtualListComponent;
