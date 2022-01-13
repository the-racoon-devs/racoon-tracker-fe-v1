/**
 *
 * CreateTicket
 *
 */
import { Helmet } from 'react-helmet-async';

interface Props {}

export function CreateTicket(props: Props) {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-0">
          <h1 className="sr-only">Profile</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="profile-overview-title">
                <div className="rounded-lg bg-white overflow-hidden shadow">
                  <div className="bg-white p-6">Left Panel</div>
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="profile-overview-title">
                <div className="rounded-lg bg-white overflow-hidden shadow">
                  <div className="bg-white p-6">Right Panel</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
