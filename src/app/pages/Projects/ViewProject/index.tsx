/**
 *
 * ViewProject
 *
 */
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Request from 'utils/Request';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from 'utils/PageLoader';
import { PlusSmIcon } from '@heroicons/react/solid';
import { Switch } from '@headlessui/react';

interface Props {}

export function ViewProject(props: Props) {
  const { user, getAccessTokenSilently } = useAuth0();
  const { id } = useParams<{ id: string }>();
  const [tickets, setTickets] = useState<any>([]);
  const [, setTicketsLoading] = useState(true);
  const [ProjectInfoRequestStatus, setProjectInfoRequestStatus] =
    useState(false);
  const emailInput = useRef<HTMLInputElement>(null);
  const [SearchedResults, setSearchedResults] = useState<any>({});
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (user) {
      getAccessTokenSilently().then(token => {
        // Getting project info
        Request('get', `projects/${id}`, token).then(response => {
          console.log(response);
          localStorage.projectInfo = JSON.stringify(response.data.data);
          // Getting tickets

          Request('get', `projects/61df38778b56b4d805ea738c/tickets`, token)
            .then(response => {
              if (response.status !== 201) {
                setTickets(response.data.data);
                console.log('Tickets State, ', tickets);
              }
              setTicketsLoading(false);
              setProjectInfoRequestStatus(true);
            })
            .catch(error => {
              console.log(error);
            });
        });
      });
    }
  }, [user]);

  function searchUser(e) {
    e.preventDefault();
    getAccessTokenSilently().then(token => {
      // Getting project info
      Request('get', `users/${emailInput.current?.value}`, token).then(
        response => {
          console.log(response);
          setSearchedResults(response.data.data);
          console.log(SearchedResults);
        },
      );
    });
  }

  function addUserToProject() {
    var collabs: string[] = [];
    var superCollabs: string[] = [];

    if (enabled) {
      superCollabs.push(SearchedResults._id);
    } else {
      collabs.push(SearchedResults._id);
    }

    const data = {
      ...JSON.parse(localStorage.projectInfo),
      collabs,
      superCollabs,
    };

    getAccessTokenSilently().then(token => {
      // Getting project info
      Request('put', `projects/61def746aaa8a7f3e5d82a82`, token, data).then(
        response => {
          console.log(response);
        },
      );
    });
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  if (ProjectInfoRequestStatus) {
    return (
      <>
        <Helmet>
          <title>{JSON.parse(localStorage.projectInfo).name}</title>
        </Helmet>
        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-0">
            <h1 className="sr-only">Profile</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column - Project Info */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="profile-overview-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="bg-white p-6">
                      <div className="pb-5 flex">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={JSON.parse(localStorage.projectInfo).logoUrl}
                            alt="Project Logo"
                          />
                        </div>
                        <div className="ml-4">
                          <h2
                            id="applicant-information-title"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            {JSON.parse(localStorage.projectInfo).name}
                          </h2>
                          <p className="max-w-2xl text-sm text-gray-500">
                            Owner ID{' '}
                            {JSON.parse(localStorage.projectInfo).owner}
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 py-5">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Project URL
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {JSON.parse(localStorage.projectInfo).siteUrl}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              GitHub URL
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {JSON.parse(localStorage.projectInfo).githubUrl}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Members
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              <div className="flex -space-x-2 overflow-hidden">
                                <img
                                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                                <img
                                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                                <img
                                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                  alt=""
                                />
                                <img
                                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                              </div>
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Tickets
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                3 Open
                              </span>
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                5 Closed
                              </span>
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">
                              About
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {JSON.parse(localStorage.projectInfo).description}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
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

              {/* Left column - Tickets */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="profile-overview-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="bg-white p-6">
                      {tickets.length > 0 ? (
                        <div className="flex flex-col">
                          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Title
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Description
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Assigned To
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Status
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tickets.map((ticket, index) => (
                                      <tr
                                        key={index}
                                        className={
                                          index % 2 === 0
                                            ? 'bg-white'
                                            : 'bg-gray-50'
                                        }
                                      >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          {ticket.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {ticket.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {ticket.assignedTo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {ticket.statusLabel === 'closed' ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              Closed
                                            </span>
                                          ) : ticket.statusLabel ===
                                            'in-progress' ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-green-800">
                                              In Progress
                                            </span>
                                          ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-green-800">
                                              Open
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            This project does not have any tickets.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>

              {/* Left column - Add People */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="profile-overview-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="bg-white p-6">
                      <div className="px-8 mx-auto">
                        <div>
                          <div className="text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                            <h2 className="mt-2 text-lg font-medium text-gray-900">
                              Add team members
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                              You haven't added any team members to your project
                              yet. As the owner of this project, you can manage
                              team member permissions.
                            </p>
                          </div>
                          <form onSubmit={searchUser} className="mt-6 flex">
                            <label htmlFor="email" className="sr-only">
                              Email address
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              ref={emailInput}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Enter an email"
                            />
                            <button
                              type="submit"
                              className="ml-4 flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Search
                            </button>
                          </form>
                        </div>
                        {Object.keys(SearchedResults).length > 0 && (
                          <div className="mt-10">
                            <ul className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
                              <li className="py-4 flex items-center justify-between space-x-3">
                                <div className="min-w-0 flex-1 flex items-center space-x-3">
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {SearchedResults.name}
                                    </p>
                                    <p className="text-sm font-medium text-gray-500 truncate">
                                      {SearchedResults.email}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-shrink-0">
                                  <Switch.Group
                                    as="div"
                                    className="flex items-center"
                                  >
                                    <Switch
                                      checked={enabled}
                                      onChange={setEnabled}
                                      className={classNames(
                                        enabled
                                          ? 'bg-indigo-600'
                                          : 'bg-gray-200',
                                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                                      )}
                                    >
                                      <span
                                        aria-hidden="true"
                                        className={classNames(
                                          enabled
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                                        )}
                                      />
                                    </Switch>
                                    <Switch.Label as="span" className="ml-3">
                                      <span className="text-sm font-medium text-gray-900">
                                        Make Super-Collaborator
                                      </span>
                                    </Switch.Label>
                                  </Switch.Group>
                                  <button
                                    type="button"
                                    onClick={addUserToProject}
                                    className="ml-3 inline-flex items-center py-2 px-3 border border-transparent rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    <span className="text-sm font-medium text-gray-900">
                                      {' '}
                                      Add{' '}
                                      <span className="sr-only">
                                        {SearchedResults.name}
                                      </span>{' '}
                                    </span>
                                    <PlusSmIcon
                                      className="ml-1 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return <PageLoader />;
  }
}
