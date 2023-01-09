import React from 'react';
import { Contacts, Filter, FormAddContact } from './';
import { Circles } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { getLoading } from '../redux/selectors/selectors';

export const App = () => {
  const loading = useSelector(getLoading);
  return (
    <div>
      <FormAddContact />
      <Contacts>
        <Filter />
      </Contacts>
      {loading && (
        <Circles
          height="300"
          width="300"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="spinner"
          visible={true}
        />
      )}
    </div>
  );
};

export default App;
