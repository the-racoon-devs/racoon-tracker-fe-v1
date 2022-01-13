/**
 *
 * ViewProjects
 *
 */
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Request from 'utils/Request';

interface Props {}

export function ViewProjects(props: Props) {
  const [projects, setProjects] = useState<any>({ owned: [], assigned: [] });
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then(token => {
      console.log(JSON.parse(localStorage.userData)._id);
      Request(
        'get',
        `users/${JSON.parse(localStorage.userData)._id}/projects`,
        token,
      )
        .then(response => {
          console.log(response.data.data);
          setProjects(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }, [getAccessTokenSilently]);

  return (
    <>
      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-0">
          <h1 className="sr-only">Projects</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Projects
                  </h2>
                  <p className="text-sm text-gray-500">
                    Here's a list of projects that you own.
                  </p>
                  <div className="hidden mt-4 sm:block">
                    <div className="align-middle inline-block min-w-full pb-8 border-b border-gray-200">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {projects.owned.length > 0 ? (
                          projects.owned.map(item => (
                            <div
                              key={item._id}
                              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={item.logoUrl}
                                  alt=""
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <Link
                                  to={`/view-project/${item._id}`}
                                  className="focus:outline-none"
                                >
                                  <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                  />
                                  <p className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="text-sm  text-gray-500 truncate">
                                    {item.description}
                                  </p>
                                </Link>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              You don't own any projects.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    Here's a list of projects that you're a member of.
                  </p>
                  <div className="hidden mt-4 sm:block">
                    <div className="align-middle inline-block min-w-full pb-4 border-b border-gray-200">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {projects.assigned.length > 0 ? (
                          projects.assigned.map(item => (
                            <div
                              key={item._id}
                              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={item.logoUrl}
                                  alt=""
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <a href="#" className="focus:outline-none">
                                  <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                  />
                                  <p className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="text-sm  text-gray-500 truncate">
                                    {item.description}
                                  </p>
                                </a>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              You haven't been added to any projects.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex">
                    <a
                      href="/create-project"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Start a new project
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              {/* Announcements */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Projects
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Here's a list of projects you're a member of.
                  </p>

                  <div className="mt-4 flex">
                    <Link
                      to="/create-project"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Or start a new project
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
