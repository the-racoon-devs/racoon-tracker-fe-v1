/**
 *
 * ViewProject
 *
 */
import { Helmet } from 'react-helmet-async';
import { PaperClipIcon } from '@heroicons/react/solid';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Request from 'utils/Request';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from 'utils/PageLoader';

const attachments = [
  { name: 'resume_front_end_developer.pdf', href: '#' },
  { name: 'coverletter_front_end_developer.pdf', href: '#' },
];

interface Props {}

export function ViewProject(props: Props) {
  const { user, getAccessTokenSilently } = useAuth0();
  const { id } = useParams<{ id: string }>();
  const [ProjectInfoRequestStatus, setProjectInfoRequestStatus] =
    useState(false);

  useEffect(() => {
    if (user) {
      getAccessTokenSilently().then(token => {
        Request('get', `projects/${id}`, token).then(response => {
          console.log(response);
          localStorage.projectInfo = response.data.data;
          setProjectInfoRequestStatus(true);
        });
      });
    }
  }, [user]);

  if (ProjectInfoRequestStatus) {
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
                    <div className="bg-white p-6">
                      <div className="pb-5">
                        <h2
                          id="applicant-information-title"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          {localStorage.projectInfo.email}
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Personal details and application.
                        </p>
                      </div>
                      <div className="border-t border-gray-200 py-5">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Application for
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              Backend Developer
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              ricardocooper@example.com
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Salary expectation
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              $120,000
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Phone
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              +1 555-555-5555
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">
                              About
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              Fugiat ipsum ipsum deserunt culpa aute sint do
                              nostrud anim incididunt cillum culpa consequat.
                              Excepteur qui ipsum aliquip consequat sint. Sit id
                              mollit nulla mollit nostrud in ea officia
                              proident. Irure nostrud pariatur mollit ad
                              adipisicing reprehenderit deserunt qui eu.
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">
                              Attachments
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                {attachments.map(attachment => (
                                  <li
                                    key={attachment.name}
                                    className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                                  >
                                    <div className="w-0 flex-1 flex items-center">
                                      <PaperClipIcon
                                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-2 flex-1 w-0 truncate">
                                        {attachment.name}
                                      </span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                      <a
                                        href={attachment.href}
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                      >
                                        Download
                                      </a>
                                    </div>
                                  </li>
                                ))}
                              </ul>
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
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return <PageLoader />;
  }
}
