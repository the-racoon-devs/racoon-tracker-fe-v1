import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from 'app/components/tailwind/Button';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <div className="p-16">
        <Button>Test</Button>
      </div>
    </>
  );
}
