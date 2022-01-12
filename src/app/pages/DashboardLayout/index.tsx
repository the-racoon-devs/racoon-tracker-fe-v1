/**
 *
 * DashboardLayout
 *
 */
import * as React from 'react';
import { Switch, Route, Redirect, NavLink, Link } from 'react-router-dom';
import { Home } from '../Home';
import { CreateProject } from '../Projects/CreateProject';
import { ViewProjects } from '../Projects/ViewProjects';
import { Settings } from '../Settings';
import { Fragment, useEffect } from 'react';
import { Disclosure, Menu, RadioGroup, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ViewBoardsIcon } from '@heroicons/react/outline';
import logo from 'app/images/logo.png';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from 'utils/PageLoader';
import { ViewProject } from '../Projects/ViewProject';
import Request from 'utils/Request';

const twuser = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const dashboardNavigation = [
  { name: 'Home', href: '/dashboard/home', current: false },
  { name: 'Projects', href: '/dashboard/projects', current: false },
  // { name: 'Profile', href: '/dashboard/profile', current: false },
];
const userNavigation = [
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

const team = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Bessie Richards',
    email: 'bessie.richards@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Black',
    email: 'floyd.black@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];
const settings = [
  {
    name: 'Public access',
    description: 'This project would be available to anyone who has the link',
  },
  {
    name: 'Private to Project Members',
    description: 'Only members of this project would be able to access',
  },
  {
    name: 'Private to you',
    description: 'You are the only one able to access this project',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {}

export function DashboardLayout(props: Props) {
  const {
    isLoading,
    isAuthenticated,
    error,
    logout,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const [OpenCreateProjectModal, setOpenCreateProjectModal] = useState(false);
  const cancelButtonRef = useRef(null);
  const [selected, setSelected] = useState(settings[0]);
  const projectNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      console.log('Upsert user' + user);
      getAccessTokenSilently().then(token => {
        Request('put', `users`, token, user).then(response => {
          console.log(response);
          localStorage.userData = JSON.stringify(response.data.data);
          // Get current user and store in localStorage
          // Request('get', `users/${user.email}`, token).then(response => {
          //   console.log(response.data.data);
          //   localStorage.userData = response.data.data;
          // });
        });
      });
    }
  }, [user]);

  // useEffect(() => {
  //   getAccessTokenSilently().then(token => {
  //     axios
  //       .put(`${process.env.REACT_APP_API_ROUTE}/users`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         data: JSON.stringify(Auth0User),
  //       })
  //       .then(function (response) {
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   });
  // }, []);

  // Functions
  // function getUser() {
  //   const email =
  //   getAccessTokenSilently().then(token => {
  //     console.log(token);
  //     // Axios
  //     axios
  //       .post(`${process.env.REACT_APP_API_ROUTE}/users/${email}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         // params: {
  //         //   name: projectNameRef.current?.value,
  //         //   owner: ,
  //         //   description: ,
  //         //   site_url: ,
  //         //   githubLink: ,
  //         //   logoUrl: ,
  //         // },
  //       })
  //       .then(function (response) {
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   });
  // }

  if (isLoading) {
    return <PageLoader />;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <>
        <div className="min-h-full">
          <div className="bg-gray-800 pb-32">
            <Disclosure as="nav" className="bg-gray-800">
              {({ open }) => (
                <>
                  <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="border-b border-gray-700">
                      <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img className="h-8 w-8" src={logo} alt="Racoon" />
                          </div>
                          <div className="hidden md:block">
                            <div className="ml-10 flex justify-between items-baseline space-x-4">
                              {dashboardNavigation.map(item => (
                                <NavLink
                                  key={item.name}
                                  to={item.href}
                                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                  activeClassName="bg-gray-900 text-white"
                                >
                                  {item.name}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-4 flex items-center md:ml-6">
                            <Link
                              to="/dashboard/projects/create"
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                            >
                              Create Project
                            </Link>

                            <button
                              type="button"
                              className="ml-4 bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            >
                              <span className="sr-only">
                                View notifications
                              </span>
                              <BellIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="ml-3 relative">
                              <div>
                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                  <span className="sr-only">
                                    Open user menu
                                  </span>
                                  <img
                                    className="h-8 w-8 rounded-full"
                                    src={user?.picture}
                                    alt=""
                                  />
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <Menu.Item>
                                    <div
                                      onClick={() =>
                                        logout({
                                          returnTo: window.location.origin,
                                        })
                                      }
                                      className="bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    >
                                      Sign Out
                                    </div>
                                  </Menu.Item>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                          {/* Mobile menu button */}
                          <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                              <XIcon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <MenuIcon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </Disclosure.Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                    <div className="px-2 py-3 space-y-1 sm:px-3">
                      {dashboardNavigation.map(item => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block px-3 py-2 rounded-md text-base font-medium',
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={twuser.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            {twuser.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {twuser.email}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        {userNavigation.map(item => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <header className="py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />
            </header>
          </div>

          <main className="-mt-40">
            <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
              {/* Layout children start */}
              {/* {user ? <pre>{user}</pre> : 'User loading'} */}
              <Switch>
                <Route exact path="/dashboard/home" component={Home} />
                <Route exact path="/dashboard/settings" component={Settings} />
                <Route
                  exact
                  path="/dashboard/projects"
                  component={ViewProjects}
                />
                <Route
                  exact
                  path="/dashboard/projects/:id"
                  component={ViewProject}
                />
                <Route
                  exact
                  path="/dashboard/projects/create"
                  component={CreateProject}
                />
                <Redirect exact from="/dashboard" to="/dashboard/home" />
              </Switch>
              {/* Layout children end */}
            </div>
          </main>
        </div>
        <Transition.Root show={OpenCreateProjectModal} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={setOpenCreateProjectModal}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ViewBoardsIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Create A New Project
                        </Dialog.Title>
                        <div className="mt-2">
                          <form>
                            <div className="space-y-6">
                              <div>
                                <p className="mt-1 text-sm text-gray-500">
                                  Let's get started by filling in the
                                  information below to create your new project.
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
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
                                      rows={3}
                                      className="block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border border-gray-300 rounded-md"
                                      defaultValue={''}
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <div className="space-y-1">
                                    <label
                                      htmlFor="add-team-members"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Add Team Members
                                    </label>
                                    <p
                                      id="add-team-members-helper"
                                      className="sr-only"
                                    >
                                      Search by email address
                                    </p>
                                    <div className="flex">
                                      <div className="flex-grow">
                                        <input
                                          type="text"
                                          name="add-team-members"
                                          id="add-team-members"
                                          className="block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                                          placeholder="Email address"
                                          aria-describedby="add-team-members-helper"
                                        />
                                      </div>
                                      <span className="ml-3">
                                        <button
                                          type="button"
                                          className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                        >
                                          <PlusIcon
                                            className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                          />
                                          <span>Add</span>
                                        </button>
                                      </span>
                                    </div>
                                  </div>

                                  <div className="border-b border-gray-200">
                                    <ul className="divide-y divide-gray-200">
                                      {team.map(person => (
                                        <li
                                          key={person.email}
                                          className="py-4 flex"
                                        >
                                          <img
                                            className="h-10 w-10 rounded-full"
                                            src={person.imageUrl}
                                            alt=""
                                          />
                                          <div className="ml-3 flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">
                                              {person.name}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                              {person.email}
                                            </span>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                <RadioGroup
                                  value={selected}
                                  onChange={setSelected}
                                >
                                  <RadioGroup.Label className="text-sm font-medium text-gray-900">
                                    Privacy
                                  </RadioGroup.Label>

                                  <div className="mt-1 bg-white rounded-md shadow-sm -space-y-px">
                                    {settings.map((setting, settingIdx) => (
                                      <RadioGroup.Option
                                        key={setting.name}
                                        value={setting}
                                        className={({ checked }) =>
                                          classNames(
                                            settingIdx === 0
                                              ? 'rounded-tl-md rounded-tr-md'
                                              : '',
                                            settingIdx === settings.length - 1
                                              ? 'rounded-bl-md rounded-br-md'
                                              : '',
                                            checked
                                              ? 'bg-primary-50 border-primary-200 z-10'
                                              : 'border-gray-200',
                                            'relative border p-4 flex cursor-pointer focus:outline-none',
                                          )
                                        }
                                      >
                                        {({ active, checked }) => (
                                          <>
                                            <span
                                              className={classNames(
                                                checked
                                                  ? 'bg-primary-600 border-transparent'
                                                  : 'bg-white border-gray-300',
                                                active
                                                  ? 'ring-2 ring-offset-2 ring-primary-500'
                                                  : '',
                                                'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center',
                                              )}
                                              aria-hidden="true"
                                            >
                                              <span className="rounded-full bg-white w-1.5 h-1.5" />
                                            </span>
                                            <div className="ml-3 flex flex-col">
                                              <RadioGroup.Label
                                                as="span"
                                                className={classNames(
                                                  checked
                                                    ? 'text-primary-900'
                                                    : 'text-gray-900',
                                                  'block text-sm font-medium',
                                                )}
                                              >
                                                {setting.name}
                                              </RadioGroup.Label>
                                              <RadioGroup.Description
                                                as="span"
                                                className={classNames(
                                                  checked
                                                    ? 'text-primary-700'
                                                    : 'text-gray-500',
                                                  'block text-sm',
                                                )}
                                              >
                                                {setting.description}
                                              </RadioGroup.Description>
                                            </div>
                                          </>
                                        )}
                                      </RadioGroup.Option>
                                    ))}
                                  </div>
                                </RadioGroup>

                                <div>
                                  <label
                                    htmlFor="tags"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Tags
                                  </label>
                                  <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenCreateProjectModal(false)}
                    >
                      Create Project
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenCreateProjectModal(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}
