/**
 *
 * ViewProject
 *
 */
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Request from 'utils/Request';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from 'utils/PageLoader';

interface Props {}

export function ViewProject(props: Props) {
  const { user, getAccessTokenSilently } = useAuth0();
  const { id } = useParams<{ id: string }>();
  const [tickets, setTickets] = useState<any>([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [ProjectInfoRequestStatus, setProjectInfoRequestStatus] =
    useState(false);

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
                              {JSON.parse(localStorage.projectInfo).projectUrl}
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
                                        Name
                                      </th>
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
                                        Email
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Status
                                      </th>
                                      <th
                                        scope="col"
                                        className="relative px-6 py-3"
                                      >
                                        <span className="sr-only">Edit</span>
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
                                          {ticket.createdBy}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {ticket.statusLabel}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                          <a
                                            href="#"
                                            className="text-indigo-600 hover:text-indigo-900"
                                          >
                                            Edit
                                          </a>
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
                            You don't own any projects.
                          </p>
                        </div>
                      )}
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
