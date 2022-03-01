import React from 'react';
import { CellMeasurer } from 'react-virtualized';

const CacheMeasurerComponent = ({ index, key, style, parent }) => {
  const { Item, cache, data, functions, classes } = parent.props;

  const itemData = data[index] || {};

  return (
    <CellMeasurer
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
      {({ registerChild }) => (
        <Item
          data={itemData}
          functions={functions}
          index={index}
          ref={registerChild}
          style={style}
          classes={classes}
        />
      )}
    </CellMeasurer>
  );
};

export default CacheMeasurerComponent;
