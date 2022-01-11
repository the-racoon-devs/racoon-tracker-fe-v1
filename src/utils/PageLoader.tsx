/**
 *
 * Page Loader
 *
 */
import * as React from 'react';
import './PageLoader.css';

interface Props {}

export function PageLoader(props: Props) {
  return (
    <div className="loader-body h-screen w-screen">
      <div className="loader-container">
        <div className="box1"></div>
        <div className="box2"></div>
        <div className="box3"></div>
      </div>
    </div>
  );
}
