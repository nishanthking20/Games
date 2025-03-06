import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent(props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading time (you can adjust this or remove it if you want instant loading)
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // 1.5 seconds loading time

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <LoadingScreen />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoading; 