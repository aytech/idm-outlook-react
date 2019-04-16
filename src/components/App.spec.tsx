import * as React from 'react';
import { create, ReactTestRenderer } from 'react-test-renderer';
import App from './App';

describe('#App', () => {
  let renderer: ReactTestRenderer;

  describe('#render', () => {
    it('should render the component when "office environment" is not initialized', () => {
      renderer = create(<App isOfficeInitialized={false} />);
      expect(renderer).toMatchSnapshot();
    });

    it('should render the component when "office environment" is initialized', () => {
      renderer = create(<App isOfficeInitialized={true} />);
      expect(renderer).toMatchSnapshot();
    });
  });
});
