/**
 *
 * DashboardLayout
 *
 */
import * as React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Home } from '../Home';
import { CreateProject } from '../Projects/CreateProject';
import { ViewProjects } from '../Projects/ViewProjects';
import { Settings } from '../Settings';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import logo from 'app/images/logo.png';
import { useAuth0 } from '@auth0/auth0-react';

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {}

export function DashboardLayout(props: Props) {
  const { isLoading, isAuthenticated, error, user, logout } = useAuth0();
  const [OpenCreateProjectModal, setOpenCreateProjectModal] = useState(false);
  const cancelButtonRef = useRef(null);

  if (isLoading) {
    return <div>Loading...</div>;
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
                            <NavLink
                              to="/dashboard/projects/create"
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                            >
                              Create Project
                            </NavLink>

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
                                    src={twuser.imageUrl}
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
                                    <button
                                      onClick={() =>
                                        logout({
                                          returnTo: window.location.origin,
                                        })
                                      }
                                      className="bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                    >
                                      Sign Out
                                    </button>
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
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Deactivate account
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
                            action cannot be undone.
                          </p>
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
                      Deactivate
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
