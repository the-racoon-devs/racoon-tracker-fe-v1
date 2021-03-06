/**
 *
 * CreateProject
 *
 */
import { Helmet } from 'react-helmet-async';
import { useAuth0 } from '@auth0/auth0-react';
import { useRef } from 'react';
import Request from 'utils/Request';

interface Props {}

export function CreateProject(props: Props) {
  const { getAccessTokenSilently } = useAuth0();

  const projectNameRef = useRef<HTMLInputElement>(null);
  const projectDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const projectSiteURLRef = useRef<HTMLInputElement>(null);
  const projectGitHubURLRef = useRef<HTMLInputElement>(null);
  const projectLogoURLRef = useRef<HTMLInputElement>(null);

  function createProject(e) {
    e.preventDefault();
    console.log('Called func');

    const data = {
      name: projectNameRef.current?.value,
      owner: JSON.parse(localStorage.userData)._id,
      description: projectDescriptionRef.current?.value,
      siteUrl: projectSiteURLRef.current?.value,
      githubUrl: projectGitHubURLRef.current?.value,
      logoUrl: projectLogoURLRef.current?.value,
    };

    getAccessTokenSilently().then(token => {
      Request('post', `projects/create`, token, data).then(response => {
        console.log(response);
      });
    });
  }

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
                <form onSubmit={createProject}>
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="bg-white p-6">
                      <h2 className="text-lg font-medium text-gray-900">
                        Create A Project
                      </h2>
                      <div className="mt-2">
                        <div className="space-y-6">
                          <div>
                            <p className="mt-1 text-sm text-gray-500">
                              Let's get started by filling in the information
                              below to create your new project.
                            </p>
                          </div>

                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Project Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="project-name"
                                ref={projectNameRef}
                                id="projectName"
                                className="block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Description
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="description"
                                name="description"
                                ref={projectDescriptionRef}
                                rows={3}
                                className="block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border border-gray-300 rounded-md"
                                defaultValue={''}
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="tags"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Project URL
                            </label>
                            <input
                              type="text"
                              name="tags"
                              id="projectURL"
                              ref={projectSiteURLRef}
                              className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="tags"
                              className="block text-sm font-medium text-gray-700"
                            >
                              GitHub URL
                            </label>
                            <input
                              type="text"
                              name="tags"
                              id="GitHubURL"
                              ref={projectGitHubURLRef}
                              className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="tags"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Logo URL
                            </label>
                            <input
                              type="text"
                              name="tags"
                              id="logoURL"
                              ref={projectLogoURLRef}
                              className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                      >
                        Create Project
                      </button>
                    </div>
                  </div>
                </form>
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
