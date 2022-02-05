import { Fragment } from 'react';

const LayoutComponent = ({ children }) => {
  return (
    <Fragment>
      <div>Layout Header</div>
      <div>{children}</div>
    </Fragment>
  );
};

export default LayoutComponent;
